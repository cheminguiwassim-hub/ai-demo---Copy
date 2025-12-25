/*import axios from 'axios';
import { AIExtractionResult, ConversationMessage } from './types';

const AI_ENDPOINT = process.env.AI_BACKEND_URL + '/ask'; // your ai-demo backend
const API_KEY = process.env.AI_API_KEY;

// Send user input + conversation to AI
export const sendToAI = async (prompt: string): Promise<AIExtractionResult> => {
  try {
    const response = await axios.post(
      AI_ENDPOINT,
      { prompt },
      { headers: { 'Authorization': `Bearer ${API_KEY}` } }
    );
    return response.data as AIExtractionResult;
  } catch (err) {
    console.error('AI request failed:', err);
    throw err;
  }
};
*/

import axios from 'axios';
import { AIExtractionResult, ConversationMessage } from './types';

const AI_ENDPOINT = 'http://localhost:3000/ask';
const API_KEY = process.env.AI_API_KEY;

// Build JSON extraction prompt
export function buildExtractionPrompt(userMessage: string, conversation: ConversationMessage[]= []) {
  const systemPrompt = `
You are an AI assistant for a covoiturage (carpooling) application.
Your task:
1. Read the conversation and the user's new message.
2. Identify the user's intent from the following fixed list ONLY:
   - create_ride
   - search_rides
   - get_ride
   - book_ride
   - cancel_ride
   - get_driver_info
   - list_rides
   - unknown
3. Extract all relevant structured fields.
4. RETURN ONLY VALID JSON 
- DO NOT use code blocks.
- DO NOT use \`\`\`json or any markdown formatting.
- DO NOT add text before or after the JSON.
- If a field is not relevant, set it to "".
Use this exact JSON schema:
{
  "intent": "",
  "origin": "",
  "destination": "",
  "date": "",
  "time": "",
  "pricePreference": "",
  "price": 0,
  "seats": 0,
  "allowSmoking": false,
  "allowPets": false,
  "instantBooking": false,
  "newValue": "",
  "rideId": "",
  "field": "",
  "rideIndex": 0,
  "matchAllCriteria": true,
  "wantsListOnly": false,
  "message": ""
}
Rules:
- If user refers to "first/second/third", set rideIndex accordingly.
- Fill only fields relevant to the intent; other fields must be empty strings "".
- If intent is unclear, set "intent": "unknown".
- Map previous assistant messages like "second ride" to rideId if applicable.
- ALWAYS output valid JSON only.
`;

  const convoText = conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n');

  return `
${systemPrompt}

Conversation history:
${convoText}

User: ${userMessage}
`;
}

// Build human-readable reply prompt
export function buildHumanReplyPrompt(backendResult: any, conversation: ConversationMessage[]) {
  const systemPrompt = `
You are an AI assistant for a covoiturage app.
Now produce a short, polite, human-readable assistant response using the BACKEND RESULT.
Do NOT include JSON, return only natural language.
`;

  const convoText = conversation.map(msg => `${msg.role}: ${msg.content}`).join('\n');

  return `
${systemPrompt}

Conversation history:
${convoText}

BACKEND RESULT:
${JSON.stringify(backendResult, null, 2)}
`;
}

// Send prompt to AI
export async function sendToAI(prompt: string) {
  /*const res = await axios.post(
    AI_ENDPOINT,
    { prompt },
    { headers: { 'Authorization': `Bearer ${API_KEY}` } }
  );*/
  const headers: any = {};
  if (API_KEY) headers['Authorization'] = `Bearer ${API_KEY}`;
  
  const res = await axios.post(AI_ENDPOINT, { prompt }, { headers });
  
  return res.data.answer;
}

// Extract intent
export async function extractIntent(userMessage: string, conversation: ConversationMessage[]) {
  const prompt = buildExtractionPrompt(userMessage, conversation);
  const aiResponse = await sendToAI(prompt);
  return JSON.parse(aiResponse) as AIExtractionResult;
}

// Generate human-readable reply
export async function generateUserReply(backendResult: any, conversation: ConversationMessage[]) {
  const prompt = buildHumanReplyPrompt(backendResult, conversation);
  const reply = await sendToAI(prompt);
  return reply;
}


