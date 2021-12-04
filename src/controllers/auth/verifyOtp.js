import User from '../../models/user.js';
import Otp from '../../models/otp.js';
import jwt from 'jsonwebtoken';

// Verify OTP controller 
const verifyOtp = async (req,res) => {
  const { email, otp } = req.body;

  try {
    const userData = await User.findOne({
      email,
    });

    if (userData) {
      const otpData = await Otp.findOneAndUpdate({
        otp,
        user: userData._id,
        isUsed: false
      },{
        isUsed: true // Expire this otp
      });

      if (otpData) {
        const expireTime = 5 * 60 * 1000; // 5 minutes in milliseconds

        const currentTime = new Date();
        const otpSentTime = new Date(otpData.sentAt);

        // Otp Expired
        if (currentTime - otpSentTime > expireTime) {
          return res.status(401).json({
            error: "OTP expired, Please try again!"
          });
        }

        // User is not verified
        if (!userData.isVerified) {
          await User.findOneAndUpdate(
            {
              email,
            },
            {
              isVerified: true
            },
            {
              new: true
            }
          );

          return res.status(201).json({
            message: "Registration successful! Please complete your profile using /api/complete-profile route."
          })
        }

        // User is verified;        
        const maxAge = 24 * 60 * 60; // Token expires after 1 day;
        const token = jwt.sign({ _id: userData?._id }, process.env.JWT_KEY, { expiresIn: maxAge });

        // Set the token as a cookie
        res.cookie('jwt', token, { 
            maxAge: maxAge * 1000,
        });

        // Also return user data
        return res.status(200).json({
          message: "Login successful!", 
          user: {
            type: 'User',
            id: userData._id,
            name: userData.name,
            email: userData.email,
            isVerified: userData.isVerified,
          }
        });
      }
      // If otp not found or already used
      return res.status(400).json({
        error: "Invalid OTP!"
      })
    }
    // If user not found
    return res.status(404).json({
      error: "User not found! Try registering via /api/signup route first."
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: "Something went wrong, Please try again later!"});
  }
}

export default verifyOtp;