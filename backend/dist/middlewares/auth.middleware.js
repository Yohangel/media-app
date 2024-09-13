"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("@/models/user.model");
const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'No token provided' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await user_model_1.UserModel.findById(decoded._id);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        req.user = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Invalid token' });
    }
};
exports.authenticate = authenticate;
