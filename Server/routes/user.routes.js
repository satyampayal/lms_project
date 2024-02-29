import express from 'express';
import {login,logout, register,getProfile,forgetPassword,resetPassword,changePassword,updateUser} from '../controller/user.controller.js'
import isLoggedIn from '../middleware/auth.middleware.js';
import upload from '../middleware/multer.middleware.js';
const router=express.Router();

router.post('/register',upload.single('avatar'),register);
router.post('/login',login);
router.get('/logout',logout);
router.get('/me',isLoggedIn,getProfile);
router.post('/reset',forgetPassword)
router.post('/reset:resetToken',resetPassword);
router.post('/change-password',isLoggedIn,changePassword);
router.post('.update',isLoggedIn,upload.single('avatar'),updateUser)
export default router;


