import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import aiRouter from './aiRouter';
import authRoutes from './routes/authRoutes';
import rideRoutes from './routes/rideRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/ai', aiRouter);
app.use('/auth', authRoutes);
app.use('/rides',rideRoutes);

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`AI-Mongo backend running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Failed to connect to DB:', err));
