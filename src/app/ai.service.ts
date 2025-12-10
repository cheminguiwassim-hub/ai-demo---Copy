

/*
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';  // <-- import this

/*@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(private http: HttpClient) {}

  // Sends prompt to your Node.js backend
  ask(prompt: string): Promise<string> {
    return firstValueFrom(
      this.http.post<{ answer: string }>('http://localhost:3000/ask', { prompt })
    ).then(res => res?.answer || '');
  }
}*/





/*



@Injectable({
  providedIn: 'root'
})
export class AiService {

  private conversationHistory: { role: string; content: string }[] = [];

  constructor(private http: HttpClient) {}

  async sendMessage(userMessage: string): Promise</*string*//*{ aiReply: string; aiResult: any; dbResult: any }> {

    const body = {
      userMessage,
      conversationHistory: this.conversationHistory
    };

    const result = await firstValueFrom(
      this.http.post<any>('http://localhost:4000/ai/message', body)
    );

    // save conversation for next turn
    this.conversationHistory.push({ role: 'user', content: userMessage });
    this.conversationHistory.push({ role: 'assistant', content: result.aiReply });

    //return result.aiReply;
    return {
    aiReply: result.aiReply,
    aiResult: result.aiResult,
    dbResult: result.dbResult
  };
  }
}
*/


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  constructor(private http: HttpClient) {}

  async sendMessage(userMessage: string, conversationHistory: any[]= []): Promise<any> {
    const body = { userMessage, conversationHistory };
    const result = await firstValueFrom(this.http.post<any>('http://localhost:4000/ai/message', body));

    // Return structured AI + DB + human-readable reply
    return {
      aiResult: result.aiResult,
      dbResult: result.dbResult,
      aiReply: result.aiReply
    };
  }
}
