"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
router.post('/register', authController_1.register);
router.post('/login', authController_1.login);
router.post('/otp/request', authController_1.requestOTP);
router.post('/otp/verify', authController_1.verifyOTP);
router.post('/token', authController_1.token);
exports.default = router;
//# sourceMappingURL=authRoutes.js.map