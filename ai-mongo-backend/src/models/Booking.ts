import mongoose, { Schema, Document } from "mongoose";

export interface IBooking extends Document {
  userId: string | null;
  rideId: string;
  seats: number;
  status: string; // booked | cancelled
}

const BookingSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
    rideId: { type: Schema.Types.ObjectId, ref: "Ride", required: true },
    seats: { type: Number, default: 1 },
    status: { type: String, enum: ["booked", "cancelled"], default: "booked" }
  },
  { timestamps: true }
);

export const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
