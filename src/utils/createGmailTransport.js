import nodemailer from 'nodemailer';
import getGmailAccessToken from './getGmailAccessToken.js';

const createGmailTransport = () => {
  const accessToken = getGmailAccessToken();

  // configures nodemailer for sending mail via gmail
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

  return smtpTransport;
};

export default createGmailTransport;