import { Router } from 'express';
import { prisma } from '@repo/prisma';
import { WorkFlowSchema } from '../types';
import z from 'zod';
import { authMiddleware } from '../authMiddleware';


const router = Router();

// get all workflows of user
router.get("/", authMiddleware, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId

        const workflows = await prisma.workflow.findMany({
            where: {
                userId
            }
        })

        return res.status(200).json({ workflows })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})


// get workflow by workflowId
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const workflowId = Number(req.params?.id);

        if (isNaN(workflowId)) {
            return res.status(400).json({ error: "Invalid workflow ID" });
        }

        const workflow = await prisma.workflow.findMany({
            where: {
                id: workflowId
            }
        })

        if (!workflow) {
            return res.status(400).json({ message: "Workflow does not exist!" })
        }

        return res.status(200).json({ workflow })

    } catch (error) {
        return res.status(500).json({
            error
        })
    }
})

// create new workflow
router.post("/", authMiddleware, async (req, res) => {
    try {
        const data = req.body;
        // @ts-ignore
        const userId = req.userId;
        const parsedData = WorkFlowSchema.parse(data)

        const workflow = await prisma.workflow.create({
            data: {
                nodes: parsedData.nodes,
                connections: parsedData.connections,
                userId
            }
        })

        return res.status(200).json({
            message: "Workflow created successfully!",
            workflow
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({ error: error.message })
        }
        return res.status(500).json({
            error
        })
    }
})

// update workflow 
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const workflowId = Number(req.params.id);
        if (isNaN(workflowId)) {
            return res.status(400).json({ error: "Invalid workflow ID" });
        }

        const data = req.body;
        // @ts-ignore
        const userId = req.userId;

        const parsedData = WorkFlowSchema.parse(data);

        // ✅ Check if workflow belongs to user
        const existing = await prisma.workflow.findUnique({
            where: { id: workflowId },
        });

        if (!existing || existing.userId !== userId) {
            return res.status(404).json({ error: "Workflow not found" });
        }

        // ✅ Update workflow
        const updatedWorkflow = await prisma.workflow.update({
            where: { id: workflowId },
            data: {
                nodes: parsedData.nodes,
                connections: parsedData.connections,
            },
        });

        return res.status(200).json({
            message: "Workflow updated successfully!",
            workflow: updatedWorkflow,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({ error: error.message });
        }
        return res.status(500).json({ error: "Internal server error" });
    }
});

export default router;


export const workflowRouter = router;