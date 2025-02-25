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
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', authMiddleware_1.authenticate, (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('get all users');
    try {
        const users = yield User_1.default.find();
        res.send(users);
    }
    catch (err) {
        res.status(500).send({ error: err });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params['id']);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json(user);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = new User_1.default({
        name: req.body.name,
        email: req.body.email,
        password_hash: req.body.password_hash,
        role: req.body.role
    });
    try {
        const newUser = yield user.save();
        res.status(201).json(newUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.patch('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (req.body.username != null) {
            user.username = req.body.username;
        }
        if (req.body.email != null) {
            user.email = req.body.email;
        }
        if (req.body.password_hash != null) {
            user.password_hash = req.body.password_hash;
        }
        if (req.body.role != null) {
            user.role = req.body.role;
        }
        const updatedUser = yield user.save();
        res.json(updatedUser);
    }
    catch (err) {
        res.status(400).json({ message: err.message });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.params['id']);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        yield User_1.default.deleteOne({ _id: req.params['id'] });
        return res.json({ message: 'User deleted successfully' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}));
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map