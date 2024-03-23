import AppError from "../utils/appError.js";
import jwt from 'jsonwebtoken';
 export const isLoggedIn=function(req,res,next){
    console.log(req.cookies);
    const {token}=req.cookies;
    console.log(token)
    if(!token){
        return next(new AppError('UnAuthorised ,You should be Login First',401));
    }

    const tokenDetails=jwt.verify(token,process.env.JWT_SECRET)

    if(!tokenDetails){
        return next(new AppError('UnAuthorised ,Please Login',401));
        
    }
    req.user=tokenDetails;
    next();
}

export  const authorizedRoles=(...roles)=>(req,res,next)=>{
    console.log(req.user);
   const currentRole=req.user.role;
   if(!roles.includes(currentRole)){
    return next(new AppError('You do not permission to access this route',403))

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



