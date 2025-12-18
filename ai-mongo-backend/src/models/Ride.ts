/*import mongoose, { Schema, Document } from 'mongoose';
import { RideInput } from '../types';

export interface IRide extends RideInput, Document {}

const RideSchema: Schema = new Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, default: "" },
  pricePreference:{ type: String, default: "" },
  seats: { type: Number, default: 1 },
}, { timestamps: true });

export const Ride = mongoose.model<IRide>('Ride', RideSchema);
*/




import mongoose, { Schema, Document, Types } from 'mongoose';
import { RideInput } from '../types';

export interface IRide extends RideInput, Document {
    origin: string,
  destination: string,
  date: string,   // you can convert to ISO Date later
  time: string,
  price: number,
  maxPassengers:number,
  passengers: Types.ObjectId[],
  seats: number,                   // seats available
  allowSmoking: Boolean,
  allowPets: Boolean,
  instantBooking: Boolean,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: string

}

const RideSchema: Schema = new Schema({
  origin: { type: String, required: true, trim: true, lowercase: true, index: true },
  destination: { type: String, required: true, trim: true, lowercase: true, index: true },
  date: { type: String, required: true, trim: true },   // you can convert to ISO Date later
  time: { type: String, trim: true, default: '' },
  price: { type: Number, default: 0 },
  maxPassengers:Number,
  passengers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  seats: { type: Number, default: 1 },                   // seats available
  allowSmoking: Boolean,
  allowPets: Boolean,
  instantBooking: Boolean,
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ['active','cancelled','completed'], default: 'active' }
}, { timestamps: true });

// Add text index if you want to support fuzzy searching later
RideSchema.index({ origin: 'text', destination: 'text' });

export const Ride = mongoose.model<IRide>('Ride', RideSchema);
