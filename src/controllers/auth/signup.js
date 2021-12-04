import User from '../../models/user.js';
import Otp from '../../models/otp.js';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import generateOtp from '../../utils/generateOtp.js';

const OAuth2 = google.auth.OAuth2;

//OAuth2 configuration
const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"   
);
oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
});
const accessToken = oauth2Client.getAccessToken((err,acctoken) => {
    if(err) {
       return 
    } else {
       return acctoken;
    }
});

// Sign Up Controller
const signup = async (req,res) => {
  const { email } = req.body;

  try {
    // If User already exists
    const userData = await User.findOne({ email, isVerified: true });
    if (userData) {
      // Return with error
      return res.status(403).json({
        error: "User already exits! Please login via /api/login route"
      })
    }

    // If User does not exists
    const otp = generateOtp();

    //Nodemailer configuration to send mails using gmail
    const smtpTransport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_ID,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken
      },
      tls: {
        rejectUnauthorized: false
      }
    });

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

    const mailSentResponse = await smtpTransport.sendMail(mailOptions);
    
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
      error: "Something went wrong, Please try again later!"
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: "Something went wrong, Please try again later!"});
  }
}

export default signup;