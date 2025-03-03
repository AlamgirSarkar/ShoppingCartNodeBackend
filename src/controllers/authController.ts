import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Otp from '../models/OTP'; 
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';
import { generateOTP } from '../utils/otpUtils'; 
import nodemailer from 'nodemailer';
import { verifyToken } from '../utils/jwtUtils';
import { redis } from '../utils/redisCient';

const SALT_ROUNDS = 10;

export const requestOTP = async (req: Request, res: Response) => {
    try {
        const { email, purpose } = req.body;
        // Generate OTP
        const otp = generateOTP(); 
        // Hash OTP
        const saltRounds = 10; // 
        const hashedOTP = await bcrypt.hash(otp, saltRounds);

        // Define expiry time for OTP.
        const expires_at = new Date(Date.now() + 10 * 60 * 1000);  

        // Save OTP to database
        const newOTP = new Otp({
            email,
            otp: hashedOTP,
            purpose,
            expires_at,
        });
        await newOTP.save();
        const transporter = nodemailer.createTransport({
            host: process.env['EMAIL_HOST'],
            port: Number(process.env['EMAIL_PORT']), 
            secure: false,
            auth: {
                user: process.env['EMAIL_USER'],
                pass: process.env['EMAIL_PASS'],
            },
        });

        // Email options
        const mailOptions = {
            from: process.env['EMAIL_USER'],
            to: email,
            subject: 'Your OTP Code',
            html: `<p>Your OTP code is: <b>${otp}</b>. This code will expire in 10 minutes.</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
        console.log(`Sending OTP ${otp} to ${email} for ${purpose}`); 
         res.status(200).json({ message: 'OTP sent successfully' });

    } catch (error: any) {
        console.error(error);
         res.status(500).json({ message: 'Internal server error' });
    }
};

export const verifyOTP = async (req: Request, res: Response):Promise<void> => {
    try {
        const { email, otp, purpose } = req.body;

        //Get OTP
        const recentOtp = await Otp.findOne({email, purpose}).sort({created_at: -1});

        if(!recentOtp) {
            res.status(400).json({ message: 'Invalid OTP' });
            return;
        }

        //Validate Expiry.
        if(recentOtp.expires_at < new Date()) {
            res.status(400).json({ message: 'OTP expired' });
        }

        //Verify OTP
        const validOTP = await bcrypt.compare(otp, recentOtp.otp);
        if (!validOTP) {
             res.status(400).json({ message: 'Invalid OTP' });
        }

        //Get User
        const user = await User.findOne({email: recentOtp.email});
        if (!user && purpose === 'register') {
             res.status(404).json({ message: 'User not found' }); //Check user
        }

        //Generate token for authentication

        if (user && (purpose === 'login' || purpose === 'password-reset')) { //Check type
          const token = generateToken(user, '10m');
            //Generate token for authentication
             res.status(200).json({
                token: token,
                user: user
            });
        }

        //Delete OTP (If not deleted).
        await Otp.deleteOne({email: recentOtp.email});

        //If registering, it will need to be handle in FE, so let
        if (purpose === 'register') {

             //Generate token for authentication
              res.status(200).json({
                user: email
             });
        }

    } catch (error: any) {
        console.error(error);
         res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req: Request, res: Response):Promise<void> => {
    try {
        const { username, email, password, firstname, lastname, otp } = req.body;

       // Verify information, and get OTP object.
        const recentOtp = await Otp.findOne({email, purpose: "register"}).sort({created_at: -1});

        if(!recentOtp) {
             res.status(400).json({ message: 'Invalid OTP' });
             return
        }

        //Validate Expiry.
        if(recentOtp.expires_at < new Date()) {
              res.status(400).json({ message: 'OTP expired' });
              return;
        }

        //Verify OTP (bcrypt comparision)
        const validOTP = await bcrypt.compare(otp, recentOtp.otp);
        if (!validOTP) {
             res.status(400).json({ message: 'Invalid OTP' });
        }

        //Hash the password
        const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

        //Create the new user
        const newUser = new User({
          username,
          email,
          password_hash,
          firstname,
          lastname,
        
        });

        await newUser.save();
        
       //Delete the OTP
        await Otp.deleteOne({_id: recentOtp._id});

       //Generate a JWT
       const token = generateToken(newUser, '1d');

        //Respond with the user and token
         res.status(201).json({
          user: {
            userId: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token
          },
         // token,
        });
    } catch (error: any) {
        console.error(error);
         res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate a JWT
    const access_token = generateToken(user, '1d');
    const refresh_token = generateToken(user, '1450m'); // 1 day + 10 minutes

    // Store the refresh token in Redis
    await redis.set(`refresh_token:${user._id}`, refresh_token, { EX: 1450 * 60 }); // 1450 minutes in seconds

    // Respond with the user and token
    res.status(200).json({
      user: {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      access_token,
      refresh_token,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const token = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    // Verify the refresh token
    const decoded = verifyToken(refreshToken as string);
    if (!decoded) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    // Find the user associated with the refresh token
    const user = await User.findById({_id:decoded.userId});
    if (!user) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    // Retrieve the refresh token from Redis
    const storedRefreshToken = await redis.get(`refresh_token:${user._id}`);
    if (storedRefreshToken !== refreshToken) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    // Generate a new access token and a new refresh token
    const accessToken = generateToken(user as IUser, '1d');
    const newRefreshToken = generateToken(user as IUser, '1450m'); // 1 day + 10 minutes

    // Update the refresh token in Redis
    await redis.set(`refresh_token:${user._id}`, newRefreshToken, { EX: 1450 * 60 }); // 1450 minutes in seconds

    // Send the new access token and refresh token to the client
    res.status(200).json({ accessToken, refresh_token: newRefreshToken });
  } catch (error: any) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};