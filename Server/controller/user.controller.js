import User from "../models/user.model.js";
import AppError from "../utils/appError.js";
import cloudinary from "cloudinary";
import fs from 'fs/promises';
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto';
const cookieOptions={
    secure:true,
    maxAge:7*24*60*60*1000, // 7 days
    httpOnly:true,
}
const register=async (req,res,next)=>{
    const {fullName,email,password}=req.body;

    if(!fullName || !email || !password){
        return next(new AppError(' All Filed are Required',400));// whatever next executation go 
    }
    const userExists=await User.findOne({email});
    if(userExists){
        return next(new AppError('User Already Exists',400));
    }
    const user=await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:'https://res.cloudinary.com/du9jzqlpt/image/upload/v1674647316/avatar_drzgxv.jpg',
        }
    });
    if(!user){
        return next(new AppError('User not exists',400));
    }
    // TODO: Upload user Picture
    if(req.file){
        try{
             const result=await  cloudinary.v2.uploader.upload(req.file.path,{
                folder:'lms',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
             });
             //console.log(result);
             if(result){
                user.avatar.public_id=result.public_id;
                user.avatar.secure_url=result.secure_url;

                // remove file from local server
                fs.rm(`uploads/${req.file.filename}`);
             }
        }catch(e){
            return next(new AppError(e || 'file not upload,please try again',400));

        }
    }

    await user.save();
    
    // ToDo: get jwt token in cookie
    //const token=await  user.generateJWTToken();

    user.password=undefined;// to ensure password not send in response
     res.status(200).json({
        success:true,
        message:'User Registerd successfully',
        user
    });
}


const login=async (req,res,next)=>{
   const {email,password}=req.body;

   if(  !email || !password){
    return next(new AppError(' All Filed are Required',400));// whatever next executation go 
}

const user=await User.findOne({email}).select('+password');
if(!user || !user.comparePassword(password)){
    return next(new AppError('Email or passowrd do not match',400));
}

const token=await user.generateJWTToken();
//console.log(token)
user.password=undefined;
// Setting the token in the cookie with name token along with cookieOption
res.cookie('token', token, cookieOptions);
console.log(req.cookies);
 res.status(201).json({
    success:true,
    message:"User Login Successfully",
    user,
 })

}

 const  logout=async (req,res,next)=>{

    res.cookie('token',null,{
        secure:true,
        maxAge:0,
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:'User logged out successfully'
    })
  
}

const getProfile=async (req,res)=>{
       const user=await User.findById(req.user.id);

       res.status(200).json({
        success:true,
        message:'User Details',
        user
       })
}

const forgetPassword=async (req,res)=>{
   const {email}=req.body;

   if(!email){
    return next( new AppError('Email is required ',400));
   }

   const user=await User.findOne({email});

   if(!user){
    return next( new AppError('Email is not registered ',400));
   }

   const resetToken= await User.generatePasswordToken();
   
   await user.save();

   const resetPasswordUrl=`${process.env.FRONTEND_URL}/reset-password${resetToken}`;
   const subject='Reset password';
   const message=`You can reset your password by clicking <a href=${resetPasswordUrl}/>`
 
   try{
    //TODO: Create sendEmail
    await sendEmail(email,subject,message);

    res.status(200).json({
        success:true,
        message:`Reset password token has been sent to ${email}`
    })

   }catch(e){
          user.ForgetPasswordExpiry=undefined;
          user.forgetPasswordToken=undefined;
          await user.save();

          return next(new AppError(e.message,500));
   }


}

// PART -B
const resetPassword=async(req,res)=>{

    const {resetToken}=req.params;
    const {password}=req.body;

    const forgetPasswordToken=crypto 
                   .createHash('sha256')
                   .update(resetToken)
                   .digest('hex');

   const user=await User.findOne({
    forgetPasswordToken,
    ForgetPasswordExpiry:{$gt:Date.now()}
   });
   if(!user){
    return next(new AppError('Token is invalid or expirey ',500));

   }

   user.password=password;
   user.ForgetPasswordExpiry=undefined;
   user.forgetPasswordToken=undefined;

   await user.save();

   res.status(200).json({
    success:true,
    message:'password changed succeessfully'
   })
}

const changePassword=async (req,res,next)=>{
     const {oldPassword,newPassword}=req.body;

     if(!oldPassword || !newPassword ){
        return next(
            new AppError('All fieds required ',400)
        )
     }
     const user=await User.findById(id).select('+password');
     
     if(!user){
        return next(
            new AppError('user do something wrong ',400)
        )
     }

     const isPasswordValid=await user.comparePassword(password);
    
     if(!isPasswordValid){
        return next(
            new AppError('Old password is wrong ',400)
        )
     }
     user.password=newPassword;
     await user.save();
     user.password=undefined;
     res.satatus(200).json({
        success:true,
        message:'password changed SuccessFuly'
     })
};

const updateUser=async (req,res,next)=>{
    const {fullName}=req.body;
    const {id}=req.user;

    const user=await User.findById({id});
    if(!user){
        return next(
            new AppError('User not exist ',400)
        )
    }

    if(fullName){
        user.fullName=fullName;

    }
    if(req.file){
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        
        const result=await  cloudinary.v2.uploader.upload(req.file.path,{
            folder:'lms',
            width:250,
            height:250,
            gravity:'faces',
            crop:'fill'
         });
       //  console.log(result);
         if(result){
            user.avatar.public_id=result.public_id;
            user.avatar.secure_url=result.secure_url;

            // remove file from local server
            fs.rm(`uploads/${req.file.filename}`);
         }
    }
    await user.save();
    res.status(200).json({
        success:true,
        message:'Update Profile Successfully'
    })

}

export 
   { login,
    logout,
    register,
    getProfile,
    forgetPassword,
    resetPassword,
    changePassword,
    updateUser
}
    
