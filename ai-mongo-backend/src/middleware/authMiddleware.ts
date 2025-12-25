import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
interface JwtPayload {
  id: string;
  email?: string;
  role?: string;
}
/*// Use a local type with user
interface AuthRequest extends Request {
  user?: { id: string };
}*/

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization') || req.header('authorization');
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });
  const token = authHeader.replace(/^Bearer\s+/i, '');
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    //console.log("JWT_SECRET:", process.env.JWT_SECRET);
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    //console.log("JWT_SECRET:", process.env.JWT_SECRET);
    /*req*/(req as any).user = { id: decoded.id, email: decoded.email }; // attach user to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
