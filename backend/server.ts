/*import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI('AIzaSyA8mf3C0hQfAXxvA5lAoCL6lTmRsVWZzig');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

app.post('/ask', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ]
    });

    const candidate = result.response?.candidates?.[0];
    let answer = '';

    if (candidate && candidate.content && Array.isArray(candidate.content.parts)) {
      answer = candidate.content.parts.map(part => part.text).join('');
    }

    res.json({ answer });
  } catch (err: any) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Backend listening on http://localhost:3000');
});
*/
/*
import express, { Request, Response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// Use a valid model from the list
const model = genAI.getGenerativeModel({ model: 'models/gemini-2.5-flash' });

app.post('/ask', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required' });

    // Generate content using the correct structure
    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: prompt }]

        }
      ],
      generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 500
      }
    });

    // Access the first candidate's text
    const candidate = result.response?.candidates?.[0];
    let answer = '';

    if (candidate && Array.isArray(candidate.content)) {
      // Join all text parts into a single string
      answer = candidate.content.map(part => ('text' in part ? part.text : '')).join('');
    }

    res.json({ answer });
  } catch (err: any) {
    console.error('Error generating content:', err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log('Backend listening on http://localhost:3000');
});
*/



import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';

const app = express();
app.use(cors());
app.use(express.json());

// Use your API key
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyA8mf3C0hQfAXxvA5lAoCL6lTmRsVWZzig");

app.post('/ask', async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });

    const result = await model.generateContent(prompt);

    // ✔ THIS is the correct way to get the text
    const answer = result.response.text();

    res.json({ answer });

  } catch (err: any) {
    console.error("Error:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("Backend running at http://localhost:3000");
});
