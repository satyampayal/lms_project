import { Schema, model } from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
const userSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Name is Required'],
        minLength: [5, 'Name Must length be at-least 5 charcter'],
        lowercase: true,
        trim: true,

    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please fill in a valid email address',
          ], // Matches email against regex


    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Password must be at-least 8 Charcers'],
        select: false
    },
    subscription: {
        id: String,
        status: String,
      },
    role: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default:'USER'
    },
    avatar: {
        public_id: {
            type: String,
        },
        secure_url: {
            type: String,
        }
    },
    forgetPasswordToken: String,
    ForgetPasswordExpiry: Date
}, {
    timestamps: true,
});

userSchema.pre('save',async function(next){
    // If password is not modified then do not hash it 
    if(!this.isModified('password')){
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
});

userSchema.methods={
    comparePassword:async function(plainPassword){
        return bcrypt.compare(plainPassword,this.password);
    },
    generateJWTToken:async function(){
   return await  jwt.sign({id:this._id,role:this.role,subscription:this.subscription},
    process.env.JWT_SECRET,
    {
        expiresIn:process.env.JWT_EXPIRY,
    })
    },
    generatePasswordToken:async function(){
        // we use crypto method to dynamic token
        const resetToken=crypto.randomBytes(20).toString('hex');

        this.forgetPasswordToken=crypto.createHash('sha256')
        .update(resetToken)
        .digest('hex');
        
        this.ForgetPasswordExpiry=Date.now()+15*60*1000;// 15 min from now
    }
}

const User=model('User',userSchema);

export default User;