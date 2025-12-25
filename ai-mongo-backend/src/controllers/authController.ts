import { Request, Response } from 'express';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
// Register
export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, mobile, password } = req.body;
        if (!name || !email || !mobile || !password) {
            return res.status(400).json({ status: "error", message: "All fields are required!" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ status: "error", message: "User already exists" });
        }

        const hashedPwd = await bcrypt.hash(password, 10);
        await User.create({ name, email, mobile, password: hashedPwd });

        res.status(201).json({ status: "success", message: "User registered successfully" });

    } catch (error) {
        console.error("Register Error:", error);
        res.status(500).json({ message: "Server error!" });
    }
};

// Login
export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ status: "error", message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: "error", message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ status: "error", message: "Invalid credentials" });
        }
        //res.json({ status: "success", message: "Login successful", user: { name: user.name, email: user.email,id: user._id, } });
//const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const token = jwt.sign(
  { id: user._id, email: user.email },
  JWT_SECRET,
  { expiresIn: '1d' }
);

res.json({
  status: "success",
  message: "Login successful",
  token,                     // ✅ BACKEND sends token
  user: {
    id: user._id,
    name: user.name,
    email: user.email
  }
});

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error!" });
    }
};