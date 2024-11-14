
import express from 'express';
import { loginUser } from '../controllers/Login.controller.js';
import {verifyOtp} from '../controllers/VeriftOtp.js';
import { getAllLeadDetails, createLeadDetail,getLeadById,updateLeadDetail,getUserAndLeadDetailsById } from "../controllers/LeadDetails.controller.js"
import{UserRegistationemail,getAllUsers} from "../controllers/EmailVerification.js"
const router = express.Router();

router.post('/register', UserRegistationemail);
router.get('/getusers', getAllUsers);
router.post('/login',loginUser);
router.post('/otp', verifyOtp);
router.get('/leaddetails', getAllLeadDetails);
router.post('/leaddetails', createLeadDetail);
router.get('/leaddetails/:id', getLeadById);
router.put('/leaddetails/:id', updateLeadDetail);
router.get('/userandlead/:id', getUserAndLeadDetailsById);

export default router;
