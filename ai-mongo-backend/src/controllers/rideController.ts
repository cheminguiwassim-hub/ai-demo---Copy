// src/controllers/ride.controller.ts

import { Request, Response } from 'express';
import { Ride } from '../models/Ride';

export const createRide = async (req: Request, res: Response) => {
  try {
        const ride = new Ride({
      origin: req.body.origin,
      destination: req.body.destination,
      date: req.body.date,
      time: req.body.time,
      totalSeats: req.body.totalSeats,
      seats: req.body.seats,
      price: req.body.price,
      luggageAllowed: req.body.luggageAllowed,
      description: req.body.description || "",
      driverId: req.body.driverId   // 👍 envoyé par le front
    });
    await ride.save();
    return res.status(201).json({ message: "Ride created", ride });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};

export const getRides = async (req: Request, res: Response) => {
  try {
    const { origin, destination, date } = req.query;

    const filter: any = {};

    if (origin) filter.origin = String(origin).toLowerCase().trim();
    if (destination) filter.destination = String(destination).toLowerCase().trim();
    if (date) filter.date = date;

    const rides = await Ride.find(filter).sort({ createdAt: -1 });

    return res.status(200).json(rides);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
