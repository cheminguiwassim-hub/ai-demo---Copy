/*






export interface RideInput {
  origin: string;
  destination: string;
  date: string;
  time?: string;
  pricePreference?: string;
  seats?: number;
  rideId?: string;
}

export interface AIExtractionResult {
  intent: string;
   // Ride info
  origin?: string;
  destination?: string;
  date?: string;
  time?: string;
  pricePreference?: string;
  seats?: number;
  // Direct reference (from user input or AI memory)
  rideId?: string;
  // Index-based reference ("first ride", "second", etc.)
  rideIndex?: number;
   // Smart searching
  matchAllCriteria: boolean;     // AND if true, OR if false
  wantsListOnly: boolean;        // user said: "show me all rides"
  // Field-specific update
  field?: string;                 // e.g. "price" if user says "change the price"
  newValue?: string;              // e.g. "20 euros"
  // Freeform message (questions, clarifications)
  message?: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
}




*/











export interface RideInput {
  driverId?: string | null;
  origin: string;
  destination: string;
  date: string;
  time?: string;
  price?: number | string;
  maxPassengers: number;
  //pricePreference?: string;
  //totalSeats?: number | string;
  seats?: number | string;
  //luggageAllowed?: boolean;
  //status?: string;
  //rideId?: string;
  allowSmoking?: boolean;
  allowPets?: boolean;
  instantBooking?: boolean;
  status?: 'active' | 'planned' | 'completed' | 'cancelled';
}

export interface AIExtractionResult {
  intent: string;
  origin?: string;
  destination?: string;
  date?: string;
  time?: string;
  pricePreference?: string;
  price?: number | string;
  seats?: number;
  //totalSeats?: number;
  //driverId?: string | null;   // <-- ADD THIS
  rideId?: string;
  rideIndex?: number;
  matchAllCriteria?: boolean;
  wantsListOnly?: boolean;
  allowSmoking?: boolean;
  allowPets?: boolean;
  instantBooking?: boolean;
  field?: string;
  newValue?: string;
  message?: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant' | 'backend';
  content: string;
}

