import { Router } from 'express';
import signup from '../controllers/auth/signup.js';
import verifyOtp from '../controllers/auth/verifyOtp.js';

const router = Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
// router.post('/signup');

// router.post('/login');
// router.post('/login-otp');

export default router;