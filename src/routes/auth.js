import { Router } from 'express';
import completeProfile from '../controllers/auth/completeProfile.js';
import login from '../controllers/auth/login.js';
import signup from '../controllers/auth/signup.js';
import verifyOtp from '../controllers/auth/verifyOtp.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/verify-otp', verifyOtp);
router.post('/complete-profile', authenticate, completeProfile);

export default router;