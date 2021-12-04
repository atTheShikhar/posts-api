import User from "../../models/user.js";
import Otp from '../../models/otp.js';
import generateOtp from '../../utils/generateOtp.js';
import createGmailTransport from '../../utils/createGmailTransport.js';

const login = async (req, res) => {
  const { email } = req.body;

  try {
    const userData = await User.findOne({
      email,
      isVerified: true
    });

    if (userData) {
      const otp = generateOtp();
      const gmailTransport = createGmailTransport();

      const mailOptions = {
          from: process.env.GMAIL_ID,
          to: email,
          subject: "Login OTP",
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
        await Otp.findOneAndUpdate(
          {
            user: userData._id,
          },
          {
            otp,
            user: userData._id,
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
    }

    // User not exists or not verified
    return res.status(404).json({
      error: "User not found or not verified!"
    })
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong, Please try again later!"
    });
  }
}

export default login;