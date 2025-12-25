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
  .catch(err => console.error('Failed to connect to DB:', err));

*/




  import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './db';
import aiRouter from './aiRouter';
import authRoutes from './routes/authRoutes';
import jwt from 'jsonwebtoken';
import ridesRoutes from './routes/ridesRoutes';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());
// 🔐 JWT middleware (ADD HERE)
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next();

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'change_this_secret'
    ) as any;

    (req as any).user = { id: decoded.id };
  } catch (err) {
    // invalid token → ignore
  }

  next();
});

// Routes
app.use('/ai', aiRouter);
app.use('/auth', authRoutes);
app.use('/rides', ridesRoutes);

// Connect to DB and start server
connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`AI-Mongo backend running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('Failed to connect to DB:', err));