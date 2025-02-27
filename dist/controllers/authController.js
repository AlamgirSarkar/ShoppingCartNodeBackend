"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.token = exports.login = exports.register = exports.verifyOTP = exports.requestOTP = void 0;
const User_1 = __importDefault(require("../models/User"));
const OTP_1 = __importDefault(require("../models/OTP"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtUtils_1 = require("../utils/jwtUtils");
const otpUtils_1 = require("../utils/otpUtils");
const nodemailer_1 = __importDefault(require("nodemailer"));
const SALT_ROUNDS = 10;
const requestOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, purpose } = req.body;
        const otp = (0, otpUtils_1.generateOTP)();
        const saltRounds = 10;
        const hashedOTP = yield bcrypt_1.default.hash(otp, saltRounds);
        const expires_at = new Date(Date.now() + 10 * 60 * 1000);
        const newOTP = new OTP_1.default({
            email,
            otp: hashedOTP,
            purpose,
            expires_at,
        });
        yield newOTP.save();
        const transporter = nodemailer_1.default.createTransport({
            host: process.env['EMAIL_HOST'],
            port: Number(process.env['EMAIL_PORT']),
            secure: false,
            auth: {
                user: process.env['EMAIL_USER'],
                pass: process.env['EMAIL_PASS'],
            },
        });
        const mailOptions = {
            from: process.env['EMAIL_USER'],
            to: 'alamgirsarkar47@gmail.com',
            subject: 'Your OTP Code',
            html: `<p>Your OTP code is: <b>${otp}</b>. This code will expire in 10 minutes.</p>`,
        };
        yield transporter.sendMail(mailOptions);
        console.log(`Sending OTP ${otp} to ${email} for ${purpose}`);
        res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.requestOTP = requestOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, purpose } = req.body;
        const recentOtp = yield OTP_1.default.findOne({ email, purpose }).sort({ created_at: -1 });
        if (!recentOtp) {
            res.status(400).json({ message: 'Invalid OTP' });
            return;
        }
        if (recentOtp.expires_at < new Date()) {
            res.status(400).json({ message: 'OTP expired' });
        }
        const validOTP = yield bcrypt_1.default.compare(otp, recentOtp.otp);
        if (!validOTP) {
            res.status(400).json({ message: 'Invalid OTP' });
        }
        const user = yield User_1.default.findOne({ email: recentOtp.email });
        if (!user && purpose === 'register') {
            res.status(404).json({ message: 'User not found' });
        }
        if (user && (purpose === 'login' || purpose === 'password-reset')) {
            const token = (0, jwtUtils_1.generateToken)(user, '10m');
            res.status(200).json({
                token: token,
                user: user
            });
        }
        yield OTP_1.default.deleteOne({ email: recentOtp.email });
        if (purpose === 'register') {
            res.status(200).json({
                user: email
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.verifyOTP = verifyOTP;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password, firstname, lastname, otp } = req.body;
        const recentOtp = yield OTP_1.default.findOne({ email, purpose: "register" }).sort({ created_at: -1 });
        if (!recentOtp) {
            res.status(400).json({ message: 'Invalid OTP' });
            return;
        }
        if (recentOtp.expires_at < new Date()) {
            res.status(400).json({ message: 'OTP expired' });
            return;
        }
        const validOTP = yield bcrypt_1.default.compare(otp, recentOtp.otp);
        if (!validOTP) {
            res.status(400).json({ message: 'Invalid OTP' });
        }
        const password_hash = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        const newUser = new User_1.default({
            username,
            email,
            password_hash,
            firstname,
            lastname,
        });
        yield newUser.save();
        yield OTP_1.default.deleteOne({ _id: recentOtp._id });
        const token = (0, jwtUtils_1.generateToken)(newUser, '1d');
        res.status(201).json({
            user: {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
                token
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
        }
        const access_token = (0, jwtUtils_1.generateToken)(user, '1d');
        const refresh_token = (0, jwtUtils_1.generateToken)(user, '7d');
        user['refresh_token'] = refresh_token;
        yield user.save();
        res.status(200).json({
            user: {
                userId: user._id,
                username: user.username,
                email: user.email,
            },
            access_token,
            refresh_token,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
const token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400).json({ message: 'Refresh token is required' });
        }
        try {
            const user = yield User_1.default.findOne({ refresh_token: refreshToken });
            const accessToken = (0, jwtUtils_1.generateToken)(user, '1h');
            res.status(200).json({ accessToken });
        }
        catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    catch (error) {
        console.error('Token refresh error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.token = token;
//# sourceMappingURL=authController.js.map