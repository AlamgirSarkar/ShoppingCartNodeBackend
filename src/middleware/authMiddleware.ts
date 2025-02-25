//import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtUtils'
import User from '../models/User';

// interface AuthRequest extends Request {
//   user?: any; // Add a user property to the Request interface
// }

export const authenticate = async (req: any, res: any, next: any) => {
  console.log('Authenticating user...');
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1]; // Expect "Bearer <token>"
    const decoded = verifyToken(token as string);
    if (decoded) {
      try {
        const user = await User.findById(decoded.userId); //Find user by decoded id.
        if (user) {
            req.user = user;
            return next();
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
      } catch (err) {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};