import express from 'express';
import { userRouter } from './router/userRouter';
import { workflowRouter } from './router/workflowRouter';
import dotenv from 'dotenv';
import path from 'path'
import cors from 'cors';
import { GoogleGenAI, type FunctionDeclaration } from "@google/genai"

const ai = new GoogleGenAI({
    apiKey: "AIzaSyCd3AJbvJAz8UaloZUz2ytRyE4DNCaz5Mg", // keep your key in .env
});

const app = express();
app.use(cors())
app.use(express.json());

const envPath = path.resolve(__dirname, '../../../.env');
dotenv.config({ path: envPath })

function calculateSum(a: number, b: number) {
    return `Sum is ${a + b}`;
}

const sumFunctionCall: FunctionDeclaration = {
    name: "sum",
    description: "This tool is used to find the sum of 2 numbers",
    parametersJsonSchema: {
        type: "object",
        properties: {
            a: { type: "number" },
            b: { type: "number" },
        },
        required: ["a", "b"],
    },
};

app.post("/ask", async (req, res) => {
    try {
        const { query } = req.body;

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: query,
            config: {
                tools: [{ functionDeclarations: [sumFunctionCall] }],
            },
        });

        const functionCalls = response.functionCalls;

        if (functionCalls && functionCalls.length > 0) {
            const functionResponses: any[] = [];

            for (const call of functionCalls) {
                let functionResult: string;

                switch (call.name) {
                    case "sum":
                        functionResult = calculateSum(call?.args?.a as number, call?.args?.b as number);
                        break;
                    default:
                        functionResult = "Unknown function";
                }

                functionResponses.push({
                    role: "function",
                    parts: [
                        {
                            functionResponse: {
                                name: call.name,
                                response: { result: functionResult },
                            },
                        },
                    ],
                });
            }

            // ✅ safe access with null check
            const candidate = response.candidates?.[0];
            if (!candidate) {
                return res.status(500).json({ error: "No candidate returned" });
            }

            const finalResult = await ai.models.generateContent({
                model: "gemini-2.0-flash",
                contents: [
                    { role: "user", parts: [{ text: query }] },
                    candidate.content, // this is a `Content`
                    ...functionResponses,
                ],
            });

            return res.json({ answer: finalResult.text });
        }

        return res.json({ answer: response.text });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.use('/api/v1/user', userRouter)
app.use('/api/v1/workflow', workflowRouter)

app.listen(3000)