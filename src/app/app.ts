/*import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ai-demo');
}*/



//////correct version
/*


import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AiService } from './ai.service';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { MessagePanal } from './message-panal/message-panal';
import { UserInput } from './user-input/user-input';
import { Message } from './utility/constants';
import { v4 as uuidv4 } from "uuid";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,RouterOutlet,Header,MessagePanal,UserInput],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  /*
  userPrompt = '';
  aiResponse = '';

  constructor(private ai: AiService) {}

  async send() {
    this.aiResponse = 'Thinking...';
    this.aiResponse = await this.ai.sendMessage(this.userPrompt);

  }
  title="exploring-angular"
  data:Message[]=[];
  getMessage($event: string){
    let messageObject: Message ={
      id:uuidv4(),
      sender:"user",
      content:$event,
      dateTime:new Date()
    }
    this.data.push(messageObject);
  }*/       /*
  data: Message[] = [];

  constructor(private ai: AiService) {}

  async getMessage(userInput: string) {

    // 1️⃣ Add user bubble
    const userMsg: Message = {
      id: uuidv4(),
      sender: "user",
      content: userInput,
      dateTime: new Date()
    };
    this.data.push(userMsg);

    // 2️⃣ Ask AI (async)
    const aiReply = await this.ai.sendMessage(userInput);

    // 3️⃣ Add AI bubble
    const aiMsg: Message = {
      id: uuidv4(),
      sender: "assistant",
      content: aiReply,
      dateTime: new Date()
    };
    this.data.push(aiMsg);
  }
}




*/




/*
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

import { AiService } from './ai.service';
import { Header } from './header/header';
import { MessagePanal } from './message-panal/message-panal';
import { UserInput } from './user-input/user-input';
import { Message } from './utility/constants';
import { v4 as uuidv4 } from "uuid";
import { Map } from './map/map';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, Header, MessagePanal, UserInput, Map],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {

  data: Message[] = [];
  @ViewChild(Map) map!: Map;

  constructor(private ai: AiService) {}

  async getMessage(userInput: string) {
    const userMsg: Message = { id: uuidv4(), sender: "user", content: userInput, dateTime: new Date() };
    this.data.push(userMsg);

    const aiReply = await this.ai.sendMessage(userInput);
    const aiMsg: Message = { id: uuidv4(), sender: "assistant", content: aiReply, dateTime: new Date() };
    this.data.push(aiMsg);
  }

  handleLocation(event: any) {
    if (!this.map) return;
    if (event.type === 'origin') this.map.setOrigin(event.data);
    if (event.type === 'destination') this.map.setDestination(event.data);
  }
}
*/













/////correct version2
/*



import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Component, ViewChild,AfterViewInit } from '@angular/core';
import { Header } from './header/header';
import { MessagePanal } from './message-panal/message-panal';
import { UserInput } from './user-input/user-input';
import { Map } from './map/map';
import { AiService } from './ai.service';
import { Message } from './utility/constants';
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [FormsModule, RouterOutlet, Header, MessagePanal, UserInput, Map],

  templateUrl: './app.html'
})
export class App implements AfterViewInit{
  @ViewChild(Map) map!: Map;
  data: Message[] = [];
  
  private mapReady = false;
  ngAfterViewInit() {
    // Wait for map component to be ready
    this.mapReady = true;
  }
  constructor(private ai: AiService) {}

  async getMessage(userInput: string) {
    const userMsg: Message = { id: uuidv4(), sender: "user", content: userInput, dateTime: new Date() };
    this.data.push(userMsg);
/*
    const aiReply = await this.ai.sendMessage(userInput);
    const aiMsg: Message = { id: uuidv4(), sender: "assistant", content: aiReply, dateTime: new Date() };
    this.data.push(aiMsg);
    // Only trigger map functions if the map component is ready
    if (!this.mapReady) return;
    // Example: AI triggers map actions
    if (aiReply.toLowerCase().includes('origin')) await this.map.setOrigin(userInput);
    if (aiReply.toLowerCase().includes('destination')) await this.map.setDestination(userInput);
    if (aiReply.toLowerCase().includes('add ride')) {
      const loc = await this.map.searchLocation(userInput);
      if (loc) this.map.addRideMarker(loc, 'Ride Info');
    }
  }
}*/                   /*
  // Call AI service
  const response = await this.ai.sendMessage(userInput);
  const aiReply: string = response.aiReply;
  const aiResult = response.aiResult;

  const aiMsg: Message = { id: uuidv4(), sender: "assistant", content: aiReply, dateTime: new Date() };
  this.data.push(aiMsg);

  // Map updates using structured AI extraction
  if (aiResult.origin) await this.map.setOrigin(aiResult.origin);
  if (aiResult.destination) await this.map.setDestination(aiResult.destination);

  if (aiResult.intent === 'create_ride') {
    // Optional: add markers for ride points
    if (aiResult.origin) {
      const loc = await this.map.searchLocation(aiResult.origin);
      if (loc) this.map.addRideMarker(loc, `Origin: ${aiResult.origin}`);
    }
    if (aiResult.destination) {
      const loc = await this.map.searchLocation(aiResult.destination);
      if (loc) this.map.addRideMarker(loc, `Destination: ${aiResult.destination}`);
    }
  }
}}



*/
/*
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Component, ViewChild } from '@angular/core';

import { Header } from './header/header';
import { MessagePanal } from './message-panal/message-panal';
import { UserInput } from './user-input/user-input';
import { Map } from './map/map';

import { AiService } from './ai.service';
import { Message } from './utility/constants';
import { v4 as uuidv4 } from "uuid";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterOutlet, Header, MessagePanal, UserInput, Map],
  templateUrl: './app.html'
})
export class App {

  @ViewChild(Map) map!: Map;
  data: Message[] = [];

  constructor(private ai: AiService) {}


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





*/


import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ai-demo - Copy');
}