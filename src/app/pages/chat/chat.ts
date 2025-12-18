import { FormsModule } from '@angular/forms';
import { RouterOutlet,RouterLink } from '@angular/router';
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
  imports: [RouterModule,FormsModule, RouterOutlet, Header, MessagePanal, UserInput, Map,RouterLink],
  templateUrl: './chat.html',
  styleUrls: ['./chat.scss'],
})
export class Chat {
  

  @ViewChild(Map) map!: Map;
  data: Message[] = [];

  constructor(private ai: AiService,private location:Location) {}
  goBack(){
    this.location.back();
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
  
}












