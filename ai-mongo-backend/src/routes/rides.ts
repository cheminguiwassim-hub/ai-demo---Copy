/*import { Router } from 'express';
import { Ride } from '../models/Ride';
import { Booking } from '../models/Booking';
import jwt from 'jsonwebtoken';
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    user?: { id: string; email: string };
  }
}
const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Middleware to check JWT
const authMiddleware = (req: any, res: any, next: any) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

// Get all rides
router.get('/', async (req, res) => {
  try {
    const rides = await Ride.find();
    res.json(rides);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new ride
router.post('/', authMiddleware, async (req: any, res: any) => {
  try {
    const ride = new Ride({ ...req.body, driver: req.user.id });
    await ride.save();
    res.status(201).json({ message: 'Ride created', ride });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Book a ride
router.post('/:rideId/book', authMiddleware, async (req: any, res: any) => {
  try {
    const { rideId } = req.params;
    const ride = await Ride.findById(rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (ride.passengers.length >= ride.maxPassengers) {
      return res.status(400).json({ message: 'No available seats' });
    }
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });

    const booking = new Booking({ ride: rideId, user: req.user.id });
    await booking.save();

    ride.passengers.push(req.user!.id);
    await ride.save();

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete ride
router.delete('/:rideId', authMiddleware, async (req: any, res: any) => {
  try {
    const ride = await Ride.findById(req.params.rideId);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    if (ride.driver.toString() !== req.user.id) return res.status(403).json({ message: 'Forbidden' });

    await ride.deleteOne();
    res.json({ message: 'Ride deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
*/ 


import express from 'express';
import {Ride} from '../models/Ride';
import { Booking } from '../models/Booking';
import { authMiddleware } from '../middleware/authMiddleware';
import mongoose from 'mongoose';

interface AuthRequest extends express.Request {
  user?: { id: string };
}
const router = express.Router();
// GET /api/rides  (query: origin,destination,date,seats)
router.get('/', async (req, res) => {
  try {
    const { origin, destination, date, seats, matchAll } = req.query;
    const filters: any = {};
    if (origin) filters.origin = new RegExp(String(origin), 'i');
    if (destination) filters.destination = new RegExp(String(destination), 'i');
    if (date) filters.date = String(date);
    if (seats) filters.seats = { $gte: Number(seats) };
    const rides = await Ride.find(filters).sort({ createdAt: -1 }).exec();
    res.json(rides);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/rides  create a ride (driver must be logged or pass driverId)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const driverId = req.user?.id || req.body.driverId || null;
    const body = req.body;
    const ride = new Ride({
      driverId,
      origin: body.origin,
      destination: body.destination,
      date: body.date,
      time: body.time || '',
      price: Number(body.price || 0),
      totalSeats: Number(body.totalSeats || body.seats || 1),
      seats: Number(body.seats || body.totalSeats || 1),
      luggageAllowed: body.luggageAllowed ?? true,
      status: body.status || 'active'
    });
    await ride.save();
    res.status(201).json(ride);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// POST /api/rides/:rideId/book  (requires auth)
router.post('/:rideId/book', authMiddleware, async (req: express.Request, res: express.Response) => {
  //const authReq = req as AuthRequest; // cast here
  try {
    const { rideId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(rideId)) return res.status(400).json({ message: 'Invalid rideId' });
    const ride = await Ride.findById(rideId).exec();
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    const seatsRequested = Number(req.body.seats ?? 1);
    // seats could be undefined; coerce safely
    const seatsAvailable = Number(ride.seats ?? 0);
    if (seatsAvailable < seatsRequested) {
      return res.status(400).json({ message: 'Not enough seats available', seatsAvailable });
    }

    // create booking
    const booking = new Booking({
      userId: req.user!.id, // authMiddleware ensures user exists
      rideId: ride._id,
      seats: seatsRequested,
      status: 'booked'
    });
    await booking.save();

    // decrement seats atomically (avoid race with findByIdAndUpdate)
    ride.seats = seatsAvailable - seatsRequested;
    await ride.save();

    return res.status(201).json({ message: 'Booking successful', booking });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
});
// Additional helper routes (get one ride, update, delete) you can add as needed
export default router;
    /*if (ride.passengers.length >= ride.maxPassengers) {
      return res.status(400).json({ message: 'No available seats' });
    }

    ride.passengers.push (new mongoose.Types.ObjectId(authReq.user!.id));
    await ride.save();

    res.status(201).json({ message: 'Booking successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;*/
