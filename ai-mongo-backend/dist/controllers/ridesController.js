"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRide = exports.deleteRide = exports.updateRide = exports.getRide = exports.listRides = exports.createRide = void 0;
const Ride_1 = require("../models/Ride");
const Booking_1 = require("../models/Booking");
const mongoose_1 = __importDefault(require("mongoose"));
// create ride (driver must be authenticated)
const createRide = async (req, res) => {
    try {
        //const { origin, destination, date, time, seats, price, description } = req.body;
        const driverId = req.user?.id;
        if (!driverId)
            return res.status(401).json({ message: 'Unauthorized' });
        const { origin, destination, date, time, price, seats, maxPassengers, allowSmoking, allowPets, instantBooking } = req.body;
        if (!origin || !destination || !date || !seats) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const ride = await Ride_1.Ride.create({
            origin,
            destination,
            date,
            time: time || "",
            price: price ?? 0,
            seats: seats,
            maxPassengers: maxPassengers ?? seats,
            passengers: [],
            allowSmoking: allowSmoking ?? false,
            allowPets: allowPets ?? false,
            instantBooking: instantBooking ?? false,
            driver: new mongoose_1.default.Types.ObjectId(driverId),
            status: "active"
        });
        return res.status(201).json(ride);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.createRide = createRide;
// list/search rides (public)
const listRides = async (req, res) => {
    try {
        const { origin, destination, date } = req.query;
        const q = {};
        if (origin)
            q.origin = { $regex: new RegExp(String(origin), 'i') };
        if (destination)
            q.destination = { $regex: new RegExp(String(destination), 'i') };
        if (date)
            q.date = String(date);
        const rides = await Ride_1.Ride.find(q).populate('driver', 'name email');
        return res.json(rides);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.listRides = listRides;
const getRide = async (req, res) => {
    try {
        const ride = await Ride_1.Ride.findById(req.params.id).populate('driver', 'name email');
        if (!ride)
            return res.status(404).json({ message: 'Ride not found' });
        return res.json(ride);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.getRide = getRide;
const updateRide = async (req, res) => {
    try {
        const ride = await Ride_1.Ride.findById(req.params.id);
        if (!ride)
            return res.status(404).json({ message: 'Ride not found' });
        // only driver can edit
        if (String(ride.driver) !== String(req.user?.id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        Object.assign(ride, req.body);
        await ride.save();
        return res.json(ride);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.updateRide = updateRide;
const deleteRide = async (req, res) => {
    try {
        const ride = await Ride_1.Ride.findById(req.params.id);
        if (!ride)
            return res.status(404).json({ message: 'Ride not found' });
        if (String(ride.driver) !== String(req.user?.id)) {
            return res.status(403).json({ message: 'Forbidden' });
        }
        await ride.deleteOne();
        return res.json({ message: 'Ride deleted' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteRide = deleteRide;
const bookRide = async (req, res) => {
    try {
        const ride = await Ride_1.Ride.findById(req.params.id);
        if (!ride)
            return res.status(404).json({ message: 'Ride not found' });
        const userId = req.user?.id;
        if (!userId)
            return res.status(401).json({ message: 'Login required' });
        if (ride.seats <= 0) {
            return res.status(400).json({ message: 'No seats available' });
        }
        // avoid duplicate booking
        if (ride.passengers.find((p) => String(p) === String(userId))) {
            return res.status(400).json({ message: 'Already booked' });
        }
        ride.passengers.push(/*userId as any*/ new mongoose_1.default.Types.ObjectId(userId));
        ride.seats = ride.seats - 1;
        await ride.save();
        await Booking_1.Booking.create({
            userId: new mongoose_1.default.Types.ObjectId(userId),
            rideId: ride._id,
            seats: 1
        });
        return res.status(201).json({ message: 'Booking confirmed' });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.bookRide = bookRide;
