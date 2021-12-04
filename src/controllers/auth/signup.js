import User from '../../models/user.js';
import Otp from '../../models/otp.js';
import createGmailTransport from '../../utils/createGmailTransport.js';
import generateOtp from '../../utils/generateOtp.js';

// Sign Up Controller
const signup = async (req,res) => {
  const { email } = req.body;

  try {
    // If User already exists
    const userData = await User.findOne({ email, isVerified: true });
    if (userData) {
      // Return with error
      return res.status(403).json({
        error: "User already registered!"
      })
    }

    // If User does not exists
    const otp = generateOtp();
    const gmailTransport = createGmailTransport();

    const mailOptions = {
        from: process.env.GMAIL_ID,
        to: email,
        subject: "Registration OTP",
        html: `
          <p>Your OTP is: </p>
          <h1>
            <code>
              ${otp}
            </code
          </h1>
          <p>This OTP is valid for 5 minutes only.</p>
          <hr/>
          <p>This email may contain sensitive data.</p>
        `
    };

    const mailSentResponse = await gmailTransport.sendMail(mailOptions);
    
    if(mailSentResponse) {
      const newUser = await User.findOneAndUpdate(
        {
          email,
          isVerified: false
        }, 
        {
          email,
          isVerified: false
        },
        {
          upsert: true,
          new: true,
        }
      );

      await Otp.findOneAndUpdate(
        {
          user: newUser._id,
        },
        {
          otp,
          user: newUser._id,
          sendAt: new Date(),
          isUsed: false
        },
        {
          upsert: true,
        }
      );

      return res.status(200).json({
          message: "OTP has been sent to your email"
      });
    } 

    return res.status(500).json({
      error: "Error sending OTP, Please try again later!"
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: "Something went wrong, Please try again later!"});
  }
}

export default signup;