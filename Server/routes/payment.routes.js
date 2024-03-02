import {Router} from 'express';
import {
    getRazorPayApiKey,
    buySubscription,
    verfiySubscription,
    cancelSubscription,
    getAllPayments
}  from '../controller/payment.controller.js'

const routes=Router();

routes
     .route('/razorpay-key')
     .get(getRazorPayApiKey);
    
     
routes
.route('/subscribe')
.post(buySubscription);

routes
.route('/verify')
.post(verfiySubscription);

routes
     .route('/unsubscribe')
     .get(cancelSubscription);


     // only for ADMIN
routes
     .route('/')
     .post(getAllPayments);
    
