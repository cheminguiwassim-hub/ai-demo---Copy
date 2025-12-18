// ai-mongo-backend/src/controllers/ridesController.ts
import { Request, Response } from 'express';
import {Ride} from '../models/Ride';
import {Booking} from '../models/Booking';
import mongoose from 'mongoose';


// create ride (driver must be authenticated)
export const createRide = async (req: Request, res: Response) => {
  try {
    //const { origin, destination, date, time, seats, price, description } = req.body;
    const driverId = req.user?.id;
    if (!driverId) return res.status(401).json({ message: 'Unauthorized' });
    const {
      origin,
      destination,
      date,
      time,
      price,
      seats,
      maxPassengers,
      allowSmoking,
      allowPets,
      instantBooking
    } = req.body;

    if (!origin || !destination || !date || !seats) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const ride = await Ride.create({});

    return res.status(201).json(ride);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

// list/search rides (public)
export const listRides = async (req: Request, res: Response) => {
  try {
    const { origin, destination, date } = req.query;
    const q: any = {};
    if (origin) q.origin = { $regex: new RegExp(String(origin), 'i') };
    if (destination) q.destination = { $regex: new RegExp(String(destination), 'i') };
    if (date) q.date = String(date);

    const rides = await Ride.find(q).populate('driver', 'name email');
    return res.json(rides);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getRide = async (req: Request, res: Response) => {
  try {
    const ride = await Ride.findById(req.params.id).populate('driver', 'name email');
    if (!ride) return res.status(404).json({ message: 'Ride not found' });
    return res.json(ride);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateRide = async (req: Request, res: Response) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    // only driver can edit
    if (String(ride.driverId) !== String(req.user?.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    Object.assign(ride, req.body);
    await ride.save();
    return res.json(ride);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const deleteRide = async (req: Request, res: Response) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    if (String(ride.driverId) !== String(req.user?.id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    await ride.deleteOne();
    return res.json({ message: 'Ride deleted' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const bookRide = async (req: Request, res: Response) => {
  try {
    const ride = await Ride.findById(req.params.id);
    if (!ride) return res.status(404).json({ message: 'Ride not found' });

    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Login required' });

    if (ride.seats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // avoid duplicate booking
    if (ride.passengers.find((p:any) => String(p) === String(userId))) {
      return res.status(400).json({ message: 'Already booked' });
    }

    ride.passengers.push(userId as any);
    ride.seats = ride.seats - 1;
    await ride.save();

    await Booking.create({ 
        /*userId: new mongoose.Types.ObjectId(userId),*/ 
        rideId: ride._id, 
        userId: userId,
        seats: 1 });

    return res.status(201).json({ message: 'Booking confirmed' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
