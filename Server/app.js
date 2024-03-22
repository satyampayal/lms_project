import express from "express";
import cookieParser from 'cookie-parser'
import cors from 'cors';
import userRoutes from "./routes/user.routes.js";
import errorMiddleware from "./middleware/error.middleware.js";
import morgan from "morgan";
import courseRoutes from './routes/course.routes.js'
import paymentRoute from './routes/payment.routes.js'
import { config } from "dotenv";
config();
const app=express();
app.use(morgan('dev'))
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    credentials:true,
}));
console.log("Front End Url "+process.env.FRONTEND_URL)

app.use('/ping',(req,res)=>{
    res.status(200).send('pong');
});

app.use('/api/v1/user',userRoutes);
app.use('/api/v1/courses',courseRoutes);
app.use('/api/v1/payments',paymentRoute)

app.all('*',(req,res)=>{
    res.status(404).send('OOPS! 404 page not found');
});

// who is next in userRoutes 
app.use(errorMiddleware);

export default app;