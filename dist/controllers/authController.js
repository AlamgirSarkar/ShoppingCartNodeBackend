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
const jwtUtils_2 = require("../utils/jwtUtils");
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
        console.log(`Sending OTP ${otp} to ${email} for ${purpose}`);
        return res.status(200).json({ message: 'OTP sent successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.requestOTP = requestOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, otp, purpose } = req.body;
        const recentOtp = yield OTP_1.default.findOne({ email, purpose }).sort({ created_at: -1 });
        if (!recentOtp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        if (recentOtp.expires_at < new Date()) {
            return res.status(400).json({ message: 'OTP expired' });
        }
        const validOTP = yield bcrypt_1.default.compare(otp, recentOtp.otp);
        if (!validOTP) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
        const user = yield User_1.default.findOne({ email: recentOtp.email });
        if (!user && purpose === 'register') {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user && (purpose === 'login' || purpose === 'password-reset')) {
            const token = (0, jwtUtils_1.generateToken)(user, '10m');
            return res.status(200).json({
                token: token,
                user: user
            });
        }
        yield OTP_1.default.deleteOne({ email: recentOtp.email });
        if (purpose === 'register') {
            return res.status(200).json({
                user: email
            });
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.verifyOTP = verifyOTP;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        const password_hash = yield bcrypt_1.default.hash(password, SALT_ROUNDS);
        const newUser = new User_1.default({
            username,
            email,
            password_hash
        });
        yield newUser.save();
        return res.status(201).json({
            user: {
                userId: newUser._id,
                username: newUser.username,
                email: newUser.email,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password_hash);
        console.log(isPasswordValid, password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const access_token = (0, jwtUtils_1.generateToken)(user, '1d');
        const refresh_token = (0, jwtUtils_1.generateToken)(user, '7d');
        user['refresh_token'] = refresh_token;
        yield user.save();
        return res.status(200).json({
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
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.login = login;
const token = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ message: 'Refresh token is required' });
        }
        try {
            const decoded = yield (0, jwtUtils_2.verifyToken)(refreshToken);
            console.log(decoded, 'decoded');
            const user = yield User_1.default.findOne({ refresh_token: refreshToken });
            console.log(user, 'user');
            const accessToken = (0, jwtUtils_1.generateToken)(user, '1h');
            return res.status(200).json({ accessToken });
        }
        catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
    catch (error) {
        console.error('Token refresh error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.token = token;
//# sourceMappingURL=authController.js.map