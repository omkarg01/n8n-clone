import { Router } from 'express';
import { prisma } from '@repo/prisma';
import { SignInSchema } from '../types';
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const router = Router();

router.post('/signup', async (req, res) => {

    try {
        const data = req.body;
        const parseData = SignInSchema.parse(data);

        const userExist = await prisma.user.findFirst({
            where: {
                email: parseData.email
            }
        })

        if (userExist) {
            return res.status(409).json({
                message: "User with this email already exist."
            })
        }
        
        const user = await prisma.user.create({
            data: parseData
        })

        const token = jwt.sign({id: user.id, email: parseData.email}, process.env.JWT_PRIVATE_KEY || '')

        return res.status(200).json({ message: "User created successfully!", token })

    } catch (err) {
        if (err instanceof z.ZodError) {
            return res.status(422).json({ error: err.issues });
        }
        
        return res.status(500).json({ error: err })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const data = req.body;
        const parseData = SignInSchema.parse(data);

        const user = await prisma.user.findFirst({
            where: {
                email: parseData.email,
                password: parseData.password
            }
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid Credentials!"
            })
        } 

        const token = jwt.sign({id: user.id, email: user.email}, process.env.JWT_PRIVATE_KEY || '')

        return res.status(200).json({ message: "User logged in successfully!", token })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(422).json({ error: error.issues });
        }

        return res.status(500).json({ error })
    }
})

export const userRouter = router;