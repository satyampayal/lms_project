import { razorpay } from "../index.js";
import Payment from "../models/payment.model.js"
import User from "../models/user.model.js";
import AppError from "../utils/appError.js"
import crypto  from "crypto";
export const getRazorPayApiKey = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'RazorPay Api Key',
            key: process.env.RAZORPAY_API_KEY
        })
    } catch (e) {
        return (
            new AppError(e.message, 500)
        )
    }
};

export const buySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);
        if (!user) {
            return (new AppError('UnAuthorised,Please Login', 400))
        }
        if (user.role === 'ADMIN') {
            return (new AppError('ADMIN,Not Nead to purchase', 200))

        }

        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1
        });

        //update user model with subsciption
        user.subscription.id = subscription.id;
        user.subscription.status = subscription.status;
        await user.save();
        console.log();
        console.log();
        console.log();
        console.log("Subscription Id"+subscription.id);

        res.status(200).json({
            success: true,
            message: 'Subscribed SuccessFully',
            // subscription_id:subscription.id
            subscription_id:await subscription.id,
        })
    } catch (e) {
        return (
            new AppError(e.message, 500)
        )
    }
};

export const verfiySubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = User.findById(id);
        if (!user) {
            return (new AppError('UnAuthorised,Please Login', 400))
        }

        const {
            razorpay_payment_id, razorpay_signature, razorpay_subscription_id
        } = req.body;

        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_SECRET)
            .update(`${razorpay_payment_id} | ${razorpay_subscription_id} `);
        if (!generatedSignature) {
            return (new AppError('Payment not verify,try again', 500))
        }

        // Racord PAyment details
        await Payment.create({
            razorpay_payment_id,
            razorpay_signature,
            razorpay_subscription_id
        });

        //update user record with subscription status

        user.subscription.status = 'active';
        await user.save();
        res.status(200).json({
            success: true,
            message: 'Payment verifed SuccessFully',

        });

    } catch (e) {
        return (
            new AppError(e.message, 500)
        )
    }
};

export const cancelSubscription = async (req, res, next) => {
    try {
        const { id } = req.user;
        const user = User.findById(id);
        if (!user) {
            return (new AppError('UnAuthorised,Please Login', 400))
        }
        if(user.role==='ADMIN'){
            return (new AppError('ADMIN canNot cancel the subscrition ',403))
        }
        const subsciptionId=user.subscription.id;
        const subsciption=await razorpay.subscriptions.cancel(subsciptionId);
       user.subsciption.status=subsciption.status;
       await user.save();

       res.status(200).json({
        success:true,
        mesage:"Subscribed Cancelled",
       })

    } catch (e) {
        return (
            new AppError(e.message, 500)
        )
    }
};

export const getAllPayments = async (req, res, next) => {
    try {
        const {count}=req.query;
        const subscription=await razorpay.subscriptions.all({
            count:count || 10,
        });

        res.status(200).json({
            success:true,
            message:'All Payments',
            payments:subscription,
        })

    } catch (e) {
        return (
            new AppError(e.message, 500)
        )
    }
};