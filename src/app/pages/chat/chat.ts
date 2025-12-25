import { FormsModule } from '@angular/forms';
//import { RouterOutlet,RouterLink } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

import {Location} from '@angular/common';



import { Header } from '../../header/header';
import { MessagePanal } from '../../message-panal/message-panal';
import { UserInput } from '../../user-input/user-input';
import { Map } from '../../map/map';

import { AiService } from '../../ai.service';
import { Message } from '../../utility/constants';
import { v4 as uuidv4 } from "uuid";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [RouterModule,FormsModule, /*RouterOutlet,*/ Header, MessagePanal, UserInput, Map/*,RouterLink*/],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class Chat {
  

  @ViewChild(Map) map!: Map;
  data: Message[] = [];
  pendingBooking = false;
  pendingRideId: string | null = null;
  pendingSeats: number = 1;
  pendingRideCreation = false;   // ✅ NEW
  pendingRideData: any = null; // <-- new property
  constructor(private ai: AiService,private location:Location) {}
  private isRideDataComplete(ai: any): boolean {
  return (
    !!ai.origin &&
    !!ai.destination &&
    !!ai.date &&
    Number(ai.seats) > 0
  );
}

  goBack(){
    this.location.back();
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  async getMessage(userInput: string) {

    // ------------------------
    // 1) Add USER message
    // ------------------------
    const userMsg: Message = {
      id: uuidv4(),
      sender: "user",
      content: userInput,
      dateTime: new Date()
    };

    this.data.push(userMsg);
    



    // ------------------------
    // 2) Send to AI backend
    // ------------------------
    const response = await this.ai.sendMessage(
      userInput,
      this.data.map(m => ({
        role: m.sender === "user" ? "user" : "assistant",
        content: m.content
      }))
    );


    const aiResult = response.aiResult;
    const dbResult = response.dbResult;
    const aiReply = response.aiReply || "Okay.";

    // Add AI message to chat
    const aiMsg: Message = {
      id: uuidv4(),
      sender: "assistant",
      content: aiReply,
      dateTime: new Date()
    };
    this.data.push(aiMsg);
    // Store backend result inside conversation history for next turn
    this.data.push({
      id: uuidv4(),
      sender: "backend",
      content: JSON.stringify(dbResult),
      dateTime: new Date()
    });
    // ------------------------
// BOOKING INTENT HANDLING
// ------------------------
if (aiResult.intent === 'book_ride' && aiResult.rideId) {
  
  // 🔐 user not logged in
  if (!this.isLoggedIn()) {
    /*this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content: 'Please log in to book a ride.',
      dateTime: new Date()
    });*/
    return;
  }
  // 🚫 Backend already refused booking
  if (!dbResult) {
    this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content:'❌ This ride is fully booked.',
      dateTime: new Date()
    });

    // 🔥 VERY IMPORTANT
    this.pendingBooking = false;
    this.pendingRideId = null;
    this.pendingSeats = 1;
    return;
  }
  // user logged in → ask confirmation
  this.pendingBooking = true;
  this.pendingRideId = aiResult.rideId;
  this.pendingSeats = aiResult.seats || 1;
  this.data.push({
    id: uuidv4(),
    sender: 'assistant',
    content: 'Do you want to confirm this booking?',
    dateTime: new Date()
  });

  return; // ⛔ stop here, don't continue map logic
}
  // ------------------------
    // CREATE RIDE INTENT HANDLING
    // ------------------------
if (aiResult.intent === 'create_ride') {
      if (!this.isLoggedIn()) {
        /*this.data.push({
          id: uuidv4(),
          sender: 'assistant',
          content: '❌ Please log in to create a ride.',
          dateTime: new Date()
        });*/
        return;
      }
      // ❌ incomplete data → ask for missing info
      if (!this.isRideDataComplete(aiResult)) {
        /*this.data.push({
          id: uuidv4(),
          sender: 'assistant',
          content: 'I still need the date and number of seats to create the ride.',
          dateTime: new Date()
        });*/
        return;
      }
      // Store pending ride data
      this.pendingRideData = {
        origin: aiResult.origin,
        destination: aiResult.destination,
        date: aiResult.date,
        time: aiResult.time || '',
        price: aiResult.price || 0,
        seats: aiResult.seats || 1,
        maxPassengers: aiResult.seats || 1,
        allowSmoking: aiResult.allowSmoking || false,
        allowPets: aiResult.allowPets || false,
        instantBooking: aiResult.instantBooking || false
      };
      // 🔥 ADD THIS
      // pendingRideData itself is the signal → no extra boolean needed
      this.pendingRideCreation = true; // ✅ IMPORTANT
      this.data.push({
        id: uuidv4(),
        sender: 'assistant',
        content: `Do you want to create a ride from ${aiResult.origin} → ${aiResult.destination} on ${aiResult.date}?`,
        dateTime: new Date()
      });
      return;
    }

    // ------------------------
    // 3) MAP LOGIC: update map based on AI intent + db result
    // ------------------------

    //
    // Handle search results → place markers on map
    //
    if (aiResult.intent === 'search_rides' && Array.isArray(dbResult)) {
      for (const ride of dbResult) {
        const loc = await this.map.searchLocation(ride.origin);
        if (loc) {
          this.map.addRideMarker(loc, `${ride.origin} → ${ride.destination}`);
        }
      }
      return;
    }
    //
    // Handle single ride selection
    //
    if (aiResult.intent === 'get_ride' && dbResult) {
      const ride = dbResult;
      const loc = await this.map.searchLocation(ride.origin);
      if (loc) {
        this.map.addRideMarker(loc, `Selected Ride: ${ride.origin} → ${ride.destination}`);
      }
      return;
    }


    //
    // Handle adding origin to map (user typed: "my origin is ...")
    //
    if (aiResult.origin) {
      await this.map.setOrigin(aiResult.origin);
    }


    //
    // Handle adding destination (user typed: "my destination is ...")
    //
    if (aiResult.destination) {
      await this.map.setDestination(aiResult.destination);
    }


    //
    // If the AI wants to add a marker generically
    //
    if (aiReply.toLowerCase().includes("add ride")) {
      const genericLoc = await this.map.searchLocation(userInput);
      if (genericLoc) {
        this.map.addRideMarker(genericLoc, "Ride Info");
      }
    }
  }
  async onBookingConfirmed() {
  //if (!this.pendingRideId) return;
   // ✅ GUARD: no pending booking
  /*if (!this.pendingBooking || !this.pendingRideId) {
    this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content: 'There is no booking to confirm.',
      dateTime: new Date()
    });
    return;
  }*/
 // ✅ CASE 1: BOOKING CONFIRMATION
  if (this.pendingBooking && this.pendingRideId) {
  try {
    await fetch(`http://localhost:4000/rides/${this.pendingRideId}/book`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        seats: this.pendingSeats   // 👈 VERY IMPORTANT
      })
    });
    this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content: '✅ Booking confirmed!',
      dateTime: new Date()
    });

  } catch {
    this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content: '❌ Booking failed.',
      dateTime: new Date()
    });
  }

  this.pendingBooking = false;
  this.pendingRideId = null;
  this.pendingSeats = 1;
    return;
  }
      // HANDLE RIDE CREATION CONFIRMATION
    //if (this.pendingRideData) {
    // ✅ CASE 2: RIDE CREATION CONFIRMATION
    if (this.pendingRideCreation && this.pendingRideData) {
      try {
        const res = await fetch(`http://localhost:4000/rides`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.pendingRideData)
        });

        if (!res.ok) throw new Error('Ride creation failed');

        const ride = await res.json();
        this.data.push({
          id: uuidv4(),
          sender: 'assistant',
          content: `✅ Ride created successfully: ${ride.origin} → ${ride.destination} on ${ride.date}`,
          dateTime: new Date()
        });
      } catch {
        this.data.push({
          id: uuidv4(),
          sender: 'assistant',
          content: '❌ Ride creation failed.',
          dateTime: new Date()
        });
      }
      this.pendingRideCreation = false;
      this.pendingRideData = null;
      return;
    }
    // 🛑 SAFETY
  this.data.push({
    id: uuidv4(),
    sender: 'assistant',
    content: 'There is nothing to confirm.',
    dateTime: new Date()
  });
}

onBookingCancelled() {
  /*this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content: '❌ Booking cancelled.',
      dateTime: new Date()
    });
  this.pendingBooking = false;
  this.pendingRideId = null;*/
  // ❌ Case 1: cancel booking
  if (this.pendingBooking) {
    this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content: '❌ Booking cancelled.',
      dateTime: new Date()
    });

    this.pendingBooking = false;
    this.pendingRideId = null;
    return;
  }

  // ❌ Case 2: cancel ride creation
  if (this.pendingRideData) {
    this.data.push({
      id: uuidv4(),
      sender: 'assistant',
      content: '❌ Ride creation cancelled.',
      dateTime: new Date()
    });

    this.pendingRideData = null;
    return;
  }

  // 🛑 Case 3: nothing to cancel (safety guard)
  this.data.push({
    id: uuidv4(),
    sender: 'assistant',
    content: 'There is nothing to cancel.',
    dateTime: new Date()
  });
}

}












