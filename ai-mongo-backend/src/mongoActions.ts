



/*



import mongoose from 'mongoose';
import { Ride, IRide } from './models/Ride';
import { RideInput } from './types';

// Create ride
export const createRide = async (rideData: RideInput): Promise<IRide> => {
  const ride = new Ride(rideData);
  return ride.save();
};
/*
// Find rides based on criteria
export const findRides = async (criteria: Partial<RideInput>): Promise<IRide[]> => {
  return Ride.find(criteria);
};*/
// Smart search: matchAllCriteria = true => AND, false => OR






/*
export const findRides = async (criteria: Partial<RideInput>, matchAllCriteria = true): Promise<IRide[]> => {
  // empty criteria -> return all
  if (!criteria || Object.keys(criteria).length === 0) {
    return Ride.find().sort({ createdAt: 1 }).exec();
  }
  // build simple text equality queries (can be enhanced)
  const query: any = {};
  if (matchAllCriteria) {
    Object.assign(query, criteria);
    return Ride.find(query).sort({ createdAt: 1 }).exec();
  } else {
    const orCriteria = Object.entries(criteria).map(([k, v]) => ({ [k]: v }));
    return Ride.find({ $or: orCriteria }).sort({ createdAt: 1 }).exec();
  }
};*/












/*










export async function findRides(filters: any) {
  const query: any = {};

  if (filters.origin && filters.origin.trim() !== "") {
    query.origin = filters.origin;
  }

  if (filters.destination && filters.destination.trim() !== "") {
    query.destination = filters.destination;
  }

  if (filters.date && filters.date.trim() !== "") {
    query.date = filters.date;
  }

  return Ride.find(query);
}







/*
// Find ride by ID
export const findRideById = async (rideId: string): Promise<IRide | null> => {
  return Ride.findById(rideId);
  return Ride.findById(rideId).exec();
};*/




/*






export const findRideById = async (rideId: string): Promise<IRide | null> => {
  if (!mongoose.Types.ObjectId.isValid(rideId)) return null;
  return Ride.findById(rideId).exec();
};




// Update ride
export const updateRide = async (rideId: string, update: Partial<RideInput>): Promise<IRide | null> => {
  return Ride.findByIdAndUpdate(rideId, update, { new: true });
};
/*
// Delete ride
export const deleteRide = async (rideId: string): Promise<IRide | null> => {
  return Ride.findByIdAndDelete(rideId);
};
*/




/*








export const deleteRide = async (rideId: string): Promise<{ deleted: boolean; rideId: string }> => {
  if (!mongoose.Types.ObjectId.isValid(rideId)) return { deleted: false, rideId };
  const result = await Ride.findByIdAndDelete(rideId).exec();
  return { deleted: !!result, rideId };
};








*/



import mongoose from 'mongoose';
import { Ride, IRide } from './models/Ride';
import { RideInput } from './types';
import { Booking } from "./models/Booking";

// Helper to normalize strings
const norm = (s?: string) => (s ? s.trim().toLowerCase() : '');

// Parse price like "80 $" or "12 euros" -> number
function parsePrice(input?: string | number): number {
  if (input == null) return 0;
  if (typeof input === 'number') return input;
  const digits = (input as string).replace(/[^\d.,]/g, '').replace(',', '.');
  const n = parseFloat(digits);
  return Number.isFinite(n) ? n : 0;
}

// Parse seats safely
function parseSeats(input?: number | string): number {
  if (input == null) return 1;
  const n = typeof input === 'number' ? input : parseInt(String(input).replace(/[^\d]/g, ''), 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

// Create ride — normalizes values before saving
export const createRide = async (rideData: RideInput): Promise<IRide> => {
  const data = {
    driverId: rideData.driverId || null,
    origin: norm(rideData.origin),
    destination: norm(rideData.destination),
    date: (rideData.date || '').trim(),
    time: (rideData.time || '').trim(),
    price: parsePrice(rideData.price ?? rideData.pricePreference),
    pricePreference: (rideData.pricePreference || '').trim(),
    totalSeats: parseSeats(rideData.totalSeats ?? rideData.seats),
    seats: parseSeats(rideData.seats),
    luggageAllowed: rideData.luggageAllowed ?? true,
    status: 'active'
  } as Partial<IRide>;

  const ride = new Ride(data);
  return ride.save();
};

// Smart find: case-insensitive partial match for origin/destination, and optional numeric filters
export async function findRides(filters: any = {}, matchAllCriteria = true) {
  const queryParts: any[] = [];

  if (filters.origin && filters.origin.trim() !== '') {
    queryParts.push({ origin: { $regex: new RegExp(filters.origin.trim(), 'i') } });
  }
  if (filters.destination && filters.destination.trim() !== '') {
    queryParts.push({ destination: { $regex: new RegExp(filters.destination.trim(), 'i') } });
  }
  if (filters.date && filters.date.trim() !== '') {
    queryParts.push({ date: filters.date.trim() });
  }
  if (filters.minPrice) {
    queryParts.push({ price: { $gte: Number(filters.minPrice) } });
  }
  if (filters.maxPrice) {
    queryParts.push({ price: { $lte: Number(filters.maxPrice) } });
  }
  if (filters.seats && Number(filters.seats) > 0) {
    queryParts.push({ seats: { $gte: Number(filters.seats) } });
  }

  let query: any = {};
  if (queryParts.length === 0) {
    query = {}; // return all (maybe limit in prod)
  } else if (matchAllCriteria) {
    query = { $and: queryParts };
  } else {
    query = { $or: queryParts };
  }

  // Return sorted by newest first; you can customize
  return Ride.find(query).sort({ createdAt: -1 }).exec();
}

export const findRideById = async (rideId: string) => {
  if (!mongoose.Types.ObjectId.isValid(rideId)) return null;
  return Ride.findById(rideId).exec();
};

export const updateRide = async (rideId: string, update: Partial<RideInput>) => {
  // Optional: normalize update values
  const _update: any = { ...update };
  if (_update.origin) _update.origin = norm(_update.origin);
  if (_update.destination) _update.destination = norm(_update.destination);
  if (_update.price) _update.price = parsePrice(_update.price);
  if (_update.seats) _update.seats = parseSeats(_update.seats);

  return Ride.findByIdAndUpdate(rideId, _update, { new: true }).exec();
};

export const deleteRide = async (rideId: string) => {
  if (!mongoose.Types.ObjectId.isValid(rideId)) return { deleted: false, rideId };
  const result = await Ride.findByIdAndDelete(rideId).exec();
  return { deleted: !!result, rideId };
};
// Create booking
export const createBooking = async (userId: string | null, rideId: string, seats: number = 1) => {
  const booking = new Booking({ userId, rideId, seats });
  return booking.save();
};