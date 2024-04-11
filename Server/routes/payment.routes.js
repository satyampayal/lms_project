import { Router } from 'express';
import {
    getRazorPayApiKey,
    buySubscription,
    verfiySubscription,
    cancelSubscription,
    getAllPayments
} from '../controller/payment.controller.js'
import { isLoggedIn, authorizedRoles } from '../middleware/auth.middleware.js';
const router = Router();

router
    .route('/razorpay-key')
    .get(isLoggedIn, getRazorPayApiKey);


router
    .route('/subscribe')
    .get(isLoggedIn,
        buySubscription
    );

router
    .route('/verify')
    .post(isLoggedIn,
        verfiySubscription
    );

router
    .route('/unsubscribe')
    .get(isLoggedIn,
        cancelSubscription
    );


// only for ADMIN
router
    .route('/')
    .post(isLoggedIn,
        authorizedRoles('ADMIN'),
        getAllPayments
    );


export default router;