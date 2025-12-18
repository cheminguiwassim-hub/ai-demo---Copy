"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ride = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const RideSchema = new mongoose_1.Schema({
    origin: { type: String, required: true, trim: true, lowercase: true, index: true },
    destination: { type: String, required: true, trim: true, lowercase: true, index: true },
    date: { type: String, required: true, trim: true }, // you can convert to ISO Date later
    time: { type: String, trim: true, default: '' },
    price: { type: Number, default: 0 },
    maxPassengers: Number,
    passengers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    seats: { type: Number, default: 1 }, // seats available
    allowSmoking: Boolean,
    allowPets: Boolean,
    instantBooking: Boolean,
    driver: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ['active', 'planned', 'cancelled', 'completed'], default: 'active' }
}, { timestamps: true });
// Add text index if you want to support fuzzy searching later
RideSchema.index({ origin: 'text', destination: 'text' });
exports.Ride = mongoose_1.default.model('Ride', RideSchema);
