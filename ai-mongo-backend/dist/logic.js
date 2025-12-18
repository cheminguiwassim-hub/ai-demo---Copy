"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildExtractionPrompt = buildExtractionPrompt;
exports.buildHumanReplyPrompt = buildHumanReplyPrompt;
exports.sendToAI = sendToAI;
exports.extractIntent = extractIntent;
exports.generateUserReply = generateUserReply;
const axios_1 = __importDefault(require("axios"));
const AI_ENDPOINT = 'http://localhost:3000/ask';
const API_KEY = process.env.AI_API_KEY;
// Build JSON extraction prompt
function buildExtractionPrompt(userMessage, conversation = []) {
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
  "seats": 0,
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
function buildHumanReplyPrompt(backendResult, conversation) {
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
async function sendToAI(prompt) {
    const res = await axios_1.default.post(AI_ENDPOINT, { prompt }, { headers: { 'Authorization': `Bearer ${API_KEY}` } });
    return res.data.answer;
}
// Extract intent
async function extractIntent(userMessage, conversation) {
    const prompt = buildExtractionPrompt(userMessage, conversation);
    const aiResponse = await sendToAI(prompt);
    return JSON.parse(aiResponse);
}
// Generate human-readable reply
async function generateUserReply(backendResult, conversation) {
    const prompt = buildHumanReplyPrompt(backendResult, conversation);
    const reply = await sendToAI(prompt);
    return reply;
}
