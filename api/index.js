// api/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';
import authRouter from './routes/authRouter.js'
import carRouter from "./routes/carRouter.js";


dotenv.config();
const port = process.env.PORT || 8000
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/car', carRouter)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})