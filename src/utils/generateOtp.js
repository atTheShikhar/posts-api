const generateOtp = () => {
  const characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const len = characters.length;
  let otp = '';

  for (let i = 0; i < 6;i++) {
    otp += characters[Math.floor(Math.random() * len)];
  }

  return otp;
}

export default generateOtp;