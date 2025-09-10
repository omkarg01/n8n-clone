import { z } from 'zod';

export const SignInSchema = z.object({
    email : z.string(),
    password : z.string()
}).strict()

export const WorkFlowSchema = z.object({
    nodes: z.array(z.number()),
    connections : z.array(z.object({
        from: z.number(),
        to: z.number(),
        index: z.number()
    }))
})