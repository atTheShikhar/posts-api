import User from '../../models/user.js';
import Otp from '../../models/otp.js';
import createToken from '../../utils/createToken.js';

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

        // generate JSON Web Token
        const { token, maxAge } = createToken({
          _id: userData._id,
          email
        });

        // Set the token as a cookie is everything passes
        res.cookie('jwt', token, { 
          maxAge: maxAge * 1000,
        });

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
            message: "Registration successful!"
          })
        }

        // User is verified;        
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
      error: "User not found!"
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: "Something went wrong, Please try again later!"});
  }
}

export default verifyOtp;