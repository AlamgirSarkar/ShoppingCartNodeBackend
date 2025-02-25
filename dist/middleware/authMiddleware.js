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
exports.authenticate = void 0;
const jwtUtils_1 = require("../utils/jwtUtils");
const User_1 = __importDefault(require("../models/User"));
const authenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Authenticating user...');
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const decoded = (0, jwtUtils_1.verifyToken)(token);
        if (decoded) {
            try {
                const user = yield User_1.default.findById(decoded.userId);
                if (user) {
                    req.user = user;
                    return next();
                }
                else {
                    return res.status(401).json({ message: 'Unauthorized' });
                }
            }
            catch (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
    else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
});
exports.authenticate = authenticate;
//# sourceMappingURL=authMiddleware.js.map