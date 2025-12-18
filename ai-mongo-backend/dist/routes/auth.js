"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
const JWT_SECRET = process.env.JWT_SECRET || 'dev_jwt_secret';
// POST /api/auth/register
// Register user
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, mobile } = req.body;
        if (!email || !password || !name)
            return res.status(400).json({ message: 'name, email and password required' });
        const existingUser = await User_1.User.findOne({ email }).exec();
        if (existingUser)
            return res.status(400).json({ message: 'Email already exists' });
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.User({ name, email, password: hashedPassword, mobile });
        await newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email }, JWT_SECRET, { expiresIn: '1d' });
        return res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
        //res.status(201).json({ message: 'User registered successfully' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
// POST /api/auth/login
// Login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ message: 'email and password required' });
        const user = await User_1.User.findOne({ email }).exec();
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: 'Invalid credentials' });
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
