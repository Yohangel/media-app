"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUsers = exports.registerUser = exports.loginUser = void 0;
const user_model_1 = require("@/models/user.model");
const role_model_1 = require("@/models/role.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jsonwebtoken_1.default.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.loginUser = loginUser;
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const existingUser = await user_model_1.UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        const validRole = await role_model_1.RoleModel.findById(role);
        if (!validRole) {
            return res.status(400).json({ error: 'Invalid role in database' });
        }
        const validRoles = ['editor', 'viewer'];
        if (!validRoles.includes(validRole.name)) {
            return res.status(400).json({ error: 'Invalid role. Must be either "editor" or "viewer"' });
        }
        const user = new user_model_1.UserModel({ username, email, password, role });
        await user.save();
        res.status(201).json(user); // La contraseña está oculta debido a la transformación en el esquema
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.registerUser = registerUser;
const getUsers = async (req, res) => {
    try {
        const users = await user_model_1.UserModel.find().populate('role');
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.getUsers = getUsers;
const updateUser = async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const existingUser = await user_model_1.UserModel.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: 'Username or email already exists' });
        }
        const validRole = await role_model_1.RoleModel.findById(role);
        if (!validRole) {
            return res.status(400).json({ error: 'Invalid role' });
        }
        const validRoles = ['editor', 'viewer'];
        if (!validRoles.includes(validRole.name)) {
            return res.status(400).json({ error: 'Invalid role. Must be either "editor" or "viewer"' });
        }
        const user = await user_model_1.UserModel.findByIdAndUpdate(req.params.id, { username, email, role }, { new: true });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const user = await user_model_1.UserModel.findByIdAndDelete(req.params.id);
        if (!user)
            return res.status(404).json({ error: 'User not found' });
        res.status(204).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
exports.deleteUser = deleteUser;
