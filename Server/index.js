import app from "./app.js";
import connectedToDB from "./config/db.connection.js";
import { config } from "dotenv";
import {v2} from 'cloudinary';
import Razorpay from 'razorpay';
 config();
const PORT=process.env.PORT;

v2.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,

});
export const razorpay=new Razorpay({
    key_id:process.env.RAZORPAY_API_KEY,
    key_secret:process.env.RAZORPAY_SECRET
});




app.listen(PORT,()=>{
    connectedToDB();
    console.log('Connected to server '+ PORT)
});