import express from 'express';
import { userRouter } from './router/userRouter';
import { workflowRouter } from './router/workflowRouter';
import dotenv from 'dotenv';
import path from 'path'
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());

const envPath =  path.resolve(__dirname, '../../../.env');
// const envPath = path.resolve(process.cwd(), '.env');
dotenv.config({ path: envPath})

app.use('/api/v1/user', userRouter)
app.use('/api/v1/workflow', workflowRouter)

app.listen(3000)