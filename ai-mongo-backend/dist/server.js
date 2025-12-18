"use strict";
/*import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import aiRouter from './aiRouter';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/ai', aiRouter);
app.use('/auth', authRoutes);

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`AI-Mongo backend running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Failed to connect to DB:', err));*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ai-mongo-backend/src/server.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const ridesRoutes_1 = __importDefault(require("./routes/ridesRoutes"));
const aiRouter_1 = __importDefault(require("./aiRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// mount routes
app.use('/api/auth', authRoutes_1.default); // register/login
app.use('/api/rides', ridesRoutes_1.default); // rides + bookings
app.use('/api/ai', aiRouter_1.default); // AI/assistant (if you use it)
(0, db_1.connectDB)()
    .then(() => {
    app.listen(PORT, () => console.log(`RideNest backend running on http://localhost:${PORT}`));
})
    .catch(err => {
    console.error('Failed to connect to DB:', err);
    process.exit(1);
});
