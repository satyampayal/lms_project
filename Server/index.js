import express from "express";
import {config} from "dotenv";

config();
const app=express();
app.use(express.json());
app.use('/ping',(req,res)=>{
    res.send('pong');
})


app.listen(process.env.PORT,()=>{
    console.log('App server live!')
});


export default app;