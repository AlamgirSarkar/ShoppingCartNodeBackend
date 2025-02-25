import jwt from 'jsonwebtoken';
import { IUser } from '../models/User';

const JWT_SECRET = process.env['JWT_SECRET'] || 'verysecret'; // Store securely!

export function generateToken(user: IUser, expiry_time: any): string {
  const payload = {
    userId: user._id,
    email: user.email,
    username: user.username
    // Add other user information you want in the token
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: expiry_time }); // Adjust expiration as needed
}

export function verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    return null; // Token is invalid or expired
  }
}