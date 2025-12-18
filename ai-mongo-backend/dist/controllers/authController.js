"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
// Register
const register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ status: "error", message: "All fields are required!" });
        }
        const existingUser = await User_1.User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists" });
        }
        const hashedPwd = await bcrypt_1.default.hash(password, 10);
        await User_1.User.create({ name, email, mobile, password: hashedPwd });
        res.status(201).json({ status: "success", message: "User registered successfully" });
    }
    catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error!" });
    }
};
exports.register = register;
// Login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Email and password are required" });
        }
        const user = await User_1.User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "error", message: "Invalid credentials" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Invalid credentials" });
        }
        res.json({ status: "success", message: "Login successful", user: { name: user.name, email: user.email } });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error!" });
    }
};
exports.login = login;
