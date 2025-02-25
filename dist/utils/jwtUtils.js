"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env['JWT_SECRET'] || 'verysecret';
function generateToken(user, expiry_time) {
    const payload = {
        userId: user._id,
        email: user.email,
        username: user.username
    };
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: expiry_time });
}
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
//# sourceMappingURL=jwtUtils.js.map