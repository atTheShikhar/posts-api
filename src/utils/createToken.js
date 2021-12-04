import jwt from 'jsonwebtoken';

const createToken = (payload) => {
  const maxAge = 24 * 60 * 60; // Token expires after 1 day;
  const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: maxAge });
  return { token, maxAge };
}

export default createToken;