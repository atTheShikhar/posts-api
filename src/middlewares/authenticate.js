import jwt from 'jsonwebtoken';

const authenticate = async (req,res,next) => {
  const token = req.cookies.jwt;
  
  jwt.verify(token, process.env.JWT_KEY, (error,decoded) => {
    if(error) {
      return res.status(401).json({error: "User not authorized!"});
    }
    // If token valid, add decoded value to body and call next middleware
    req.body = {
      ...req.body,
      decoded
    }
    next();
  })
}

export default authenticate;