import { Router } from 'express';
import completeProfile from '../controllers/auth/completeProfile.js';
import login from '../controllers/auth/login.js';
import signup from '../controllers/auth/signup.js';
import verifyOtp from '../controllers/auth/verifyOtp.js';
import authenticate from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import { validText, validString, validEmail, validOtp } from '../middlewares/validation.js';

const router = Router();

router.post('/signup', [ validEmail("email") ], validate, signup);

router.post('/login', [ validEmail("email") ], validate, login);

router.post(
  '/verify-otp',
  [ 
    validEmail("email"),
    validOtp('otp', 'OTP', 6)
  ],
  validate, 
  verifyOtp
);

router.post(
  '/complete-profile', 
  [
    validText("firstName","First Name",48),
    validString(false,"lastName","Last Name",20),
  ],
  validate, 
  authenticate, 
  completeProfile
);

export default router;