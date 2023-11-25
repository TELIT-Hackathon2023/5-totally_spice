// api/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'; // Adjust the path according to your project structure
import authRouter from './routes/authRouter.js'


dotenv.config();
const port = process.env.PORT || 8000
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})