import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
 export const isLoggedIn=function(req,res,next){
    const {token}=req.cookies;
    if(!token){
        return next(new AppError('UnAuthorised ,Please Login',400));
    }

    const tokenDetails=jwt.verify(token,process.env.JWT_SECRET)

    if(!tokenDetails){
        return next(new AppError('UnAuthorised ,Please Login',400));
        
    }
    req.user=tokenDetails;
    next();
}

export  const authorizedRoles=(...roles)=>(req,res,next)=>{
   const currentRole=req.user.role;
   if(!roles.includes(currentRole)){
    return next(new AppError('Tou do not permission to access this route',403))

   }
    next();
};

export const authorizedSubscribed=async(req,res,next)=>{
    const subscriptionStatus=req.user.subscription.staus;
    const currentRole=req.user.role;
    if(currentRole!=='ADMIN' && subscriptionStatus!=='active'){
        return (new AppError('Please subscribe to access this Route',403))
    }

    next();
}



