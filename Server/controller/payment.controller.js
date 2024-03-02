import Payment from "../models/payment.model.js"
import User from "../models/user.model.js";
import AppError from "../utils/appError.js"
export const getRazorPayApiKey=async(req,res,next)=>{
    try{
           res.status(200).json({
            success:true,
            message:'RazorPay Api Key',
            key:process.env.RAZORPAY_API_KEY
           })
    }catch(e){
        return(
            new AppError(e.message,500)
        )
    }
};

export const buySubscription=async(req,res,next)=>{
    try{
          const {id}=req.user;
          const user=await User.findById(id);
          if(!user){
            return(new AppError('UnAuthorised,Please Login',400))
          }
          if(user.role==='ADMIN'){
            return(new AppError('ADMIN,Not Neaad to purchase',200))

          }

    }catch(e){
        return(
            new AppError(e.message,500)
        )
    }
};

export const verfiySubscription=async(req,res,next)=>{
    try{

    }catch(e){
        return(
            new AppError(e.message,500)
        )
    }
};

export const cancelSubscription=async(req,res,next)=>{
    try{

    }catch(e){
        return(
            new AppError(e.message,500)
        )
    }
};

export const getAllPayments=async(req,res,next)=>{
    try{

    }catch(e){
        return(
            new AppError(e.message,500)
        )
    }
};