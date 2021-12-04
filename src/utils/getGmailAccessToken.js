import { google } from 'googleapis';

const getGmailAccessToken = () => {
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

  return accessToken;
}

export default getGmailAccessToken;