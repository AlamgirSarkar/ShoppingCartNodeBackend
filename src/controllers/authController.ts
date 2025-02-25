//import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import Otp from '../models/OTP'; 
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/jwtUtils';
import { generateOTP } from '../utils/otpUtils'; 
import {verifyToken} from '../utils/jwtUtils';
import nodemailer from 'nodemailer';
const SALT_ROUNDS = 10;

export const requestOTP = async (req: any, res: any) => {
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
            to: 'alamgirsarkar47@gmail.com',
            subject: 'Your OTP Code',
            html: `<p>Your OTP code is: <b>${otp}</b>. This code will expire in 10 minutes.</p>`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);
       
        console.log(`Sending OTP ${otp} to ${email} for ${purpose}`); 

        return res.status(200).json({ message: 'OTP sent successfully' });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const verifyOTP = async (req: any, res: any) => {
    try {
        const { email, otp, purpose } = req.body;

        //Get OTP
        const recentOtp = await Otp.findOne({email, purpose}).sort({created_at: -1});

        if(!recentOtp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        //Validate Expiry.
        if(recentOtp.expires_at < new Date()) {
             return res.status(400).json({ message: 'OTP expired' });
        }

        //Verify OTP
        const validOTP = await bcrypt.compare(otp, recentOtp.otp);
        if (!validOTP) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        //Get User
        const user = await User.findOne({email: recentOtp.email});
        if (!user && purpose === 'register') {
            return res.status(404).json({ message: 'User not found' }); //Check user
        }

        //Generate token for authentication

        if (user && (purpose === 'login' || purpose === 'password-reset')) { //Check type
          const token = generateToken(user, '10m');
            //Generate token for authentication
            return res.status(200).json({
                token: token,
                user: user
            });
        }

        //Delete OTP (If not deleted).
        await Otp.deleteOne({email: recentOtp.email});

        //If registering, it will need to be handle in FE, so let
        if (purpose === 'register') { //Check registration

             //Generate token for authentication
             return res.status(200).json({ //Success Status
                user: email
             });
        }

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const register = async (req: any, res: any) => {
    try {
        const { username, email, password, firstname, lastname, otp } = req.body;

       // Verify information, and get OTP object.
        const recentOtp = await Otp.findOne({email, purpose: "register"}).sort({created_at: -1});

        if(!recentOtp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        //Validate Expiry.
        if(recentOtp.expires_at < new Date()) {
             return res.status(400).json({ message: 'OTP expired' });
        }

        //Verify OTP (bcrypt comparision)
        const validOTP = await bcrypt.compare(otp, recentOtp.otp);
        if (!validOTP) {
            return res.status(400).json({ message: 'Invalid OTP' });
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
        return res.status(201).json({
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
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const login = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password_hash);
        console.log(isPasswordValid, password, user.password_hash);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT
        const access_token = generateToken(user, '1d');
        const refresh_token = generateToken(user, '7d');
        user['refresh_token']  = refresh_token;
        await user.save()
        // Respond with the user and token
        return res.status(200).json({
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
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const token = async (req: any, res: any) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
      }
      // Verify the refresh token
        try {
          // Find the user associated with the refresh token
          const decoded = await verifyToken(refreshToken);
          console.log(decoded, 'decoded');
         
          const user = await User.findOne({refresh_token: refreshToken});
          console.log(user, 'user');
          // Generate a new access token and a new refresh token
          const accessToken = generateToken(user as IUser, '1h');
          // Send the new access token and refresh token to the client
          return res.status(200).json({ accessToken});
        } catch (dbError: any) {
          console.error('Database error:', dbError);
          return res.status(500).json({ message: 'Internal server error' });
        }
    } catch (error: any) {
      console.error('Token refresh error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
};