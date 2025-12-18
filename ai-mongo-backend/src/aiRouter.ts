/*import express from 'express';
import { sendToAI } from './logic';
import { createRide, findRides, findRideById } from './mongoActions';
import { AIExtractionResult, RideInput } from './types';

const router = express.Router();

router.post('/message', async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: 'Message is required.' });

  try {
    // 1. Send to AI for extraction
    const aiResult: AIExtractionResult = await sendToAI(userMessage);

    // 2. Perform DB action based on intent
    let dbResult: any = null;
    switch (aiResult.intent) {
      case 'create_ride':
        dbResult = await createRide(aiResult as RideInput);
        break;
      case 'search_rides':
        dbResult = await findRides({
          origin: aiResult.origin,
          destination: aiResult.destination,
          date: aiResult.date,
        });
        break;
      case 'get_ride':
        if (aiResult.rideId) dbResult = await findRideById(aiResult.rideId);
        break;
      default:
        dbResult = { message: 'Unknown intent' };
    }

    // 3. Return DB + AI info to frontend
    res.json({ aiResult, dbResult });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;*/


/*

import express from 'express';
import { extractIntent, generateUserReply } from './logic';
import { createRide, findRides, findRideById } from './mongoActions';
import { ConversationMessage, RideInput } from './types';

const router = express.Router();

router.post('/message', async (req, res) => {
  /*const { userMessage, conversationHistory } = req.body as {
    userMessage: string;
    conversationHistory: ConversationMessage[];
  };*/
/*





const userMessage = req.body.userMessage;
  const conversationHistory = req.body.conversationHistory || [];
  if (!userMessage) {
    return res.status(400).json({ error: 'userMessage is required.' });
  }

  try {
    console.log('Received user message:', userMessage);
    // 1. Extract JSON intent
    const aiResult = await extractIntent(userMessage, conversationHistory);
    console.log('AI result:', aiResult);
    // 2. Perform DB action based on intent
    let dbResult: any = null;
    let aiReply: string = "";

    switch (aiResult.intent) {
      /*case 'create_ride':
        // Validate required fields
        if (!aiResult.origin || !aiResult.destination || !aiResult.date) {
            return res.status(400).json({ error: 'Missing required ride information' });
        }

        const rideData: RideInput = {
            origin: aiResult.origin,
            destination: aiResult.destination,
            date: aiResult.date,
            time: aiResult.time,
            pricePreference: aiResult.pricePreference,
            rideId: aiResult.rideId,
        };
        dbResult = await createRide(rideData);
        break;*/

/*







      case 'create_ride':
        const missingFields: string[] = [];

        // Required fields for creating a ride
        if (!aiResult.origin) missingFields.push("origin");
        if (!aiResult.destination) missingFields.push("destination");
        if (!aiResult.date) missingFields.push("date");
        if (missingFields.length > 0) {
          aiReply = `Before I can create this ride, I still need the following information: ${missingFields.join(", ")}. Can you provide it?`;

          return res.json({
            aiResult,
            dbResult: null,
            aiReply
          });
        }
      
      
        /*    
      // If date/origin/destination missing -> ask user to clarify
      if (!aiResult.origin || !aiResult.destination || !aiResult.date) {
        return res.status(400).json({ error: 'Missing required ride information (origin/destination/date).' });
      }
*/
      // Normalize and coerce numbers here





/*


      const createData: RideInput = {
          driverId: aiResult.driverId || null,
          origin: aiResult.origin,
          destination: aiResult.destination,
          date: aiResult.date,
          time: aiResult.time || '',
          price: aiResult.price ?? aiResult.pricePreference ?? '',
          pricePreference: aiResult.pricePreference ?? '',
          totalSeats: aiResult.totalSeats ?? aiResult.seats ?? 1,
          seats: aiResult.seats ?? aiResult.totalSeats ?? 1,
          luggageAllowed: true,
          status: 'active'
        };

      // Create ride via mongoActions (which will parse/normalize fields)
        dbResult = await createRide(createData); 
        // Generate final confirmation to the user
        aiReply = await generateUserReply(dbResult, [
          ...conversationHistory,
          { role: 'user', content: userMessage },
        ]);
        break;
      case 'search_rides':
        dbResult = await findRides({
          origin: aiResult.origin,
          destination: aiResult.destination,
          date: aiResult.date,
        });
        // Generate final confirmation to the user
        aiReply = await generateUserReply(dbResult, [
          ...conversationHistory,
          { role: 'user', content: userMessage },
        ]);
        break;
      case 'get_ride':
        if (aiResult.rideId) dbResult = await findRideById(aiResult.rideId);
        // Generate final confirmation to the user
        aiReply = await generateUserReply(dbResult, [
          ...conversationHistory,
          { role: 'user', content: userMessage },
        ]);
        break;
      default:
        dbResult = { message: 'Unknown intent' };
    }
    console.log('DB result:', dbResult);
    

    /*
    
    // 3. Generate human-readable reply
    const aiReply = await generateUserReply(dbResult, [
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ]);

    */

/*

    res.json({ aiResult, dbResult, aiReply });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;





*/





import express from 'express';
import { extractIntent, generateUserReply } from './logic';
import { createRide, findRides, findRideById, updateRide, createBooking } from './mongoActions';
import { ConversationMessage, RideInput } from './types';



// define a local type with optional user
interface AuthRequest extends Express.Request {
  user?: { id: string };
}


const router = express.Router();

router.post('/message', async (req, res) => {
  const userMessage: string = req.body.userMessage;
  const conversationHistory: ConversationMessage[] = req.body.conversationHistory || [];

  if (!userMessage) {
    return res.status(400).json({ error: 'userMessage is required.' });
  }

  try {
    console.log('Received user message:', userMessage);

    // 1. Extract AI structured intent
    const aiResult = await extractIntent(userMessage, conversationHistory);
    console.log('AI result:', aiResult);

    // 2. Perform DB action based on intent
    let dbResult: any = null;
    let aiReply: string = '';

    switch (aiResult.intent) {
      case 'create_ride':
        const missingFields: string[] = [];
        if (!aiResult.origin) missingFields.push("origin");
        if (!aiResult.destination) missingFields.push("destination");
        if (!aiResult.date) missingFields.push("date");

        if (missingFields.length > 0) {
          aiReply = `Before I can create this ride, I need the following info: ${missingFields.join(", ")}. Can you provide it?`;
          return res.json({ aiResult, dbResult: null, aiReply });
        }

        const createData: RideInput = {
          driverId: aiResult.driverId || null,
          origin: aiResult.origin,
          destination: aiResult.destination,
          date: aiResult.date,
          time: aiResult.time || '',
          price: aiResult.price ?? aiResult.pricePreference ?? '',
          pricePreference: aiResult.pricePreference ?? '',
          totalSeats: aiResult.totalSeats ?? aiResult.seats ?? 1,
          seats: aiResult.seats ?? aiResult.totalSeats ?? 1,
          luggageAllowed: true,
          status: 'active'
        };

        dbResult = await createRide(createData);
        break;

      case 'search_rides':
        dbResult = await findRides({
            origin: aiResult.origin,
            destination: aiResult.destination,
            date: aiResult.date,
            seats: aiResult.seats
          },      
          aiResult.matchAllCriteria
        );
        break;

      case 'get_ride':
        if (!aiResult.rideId) {
          aiReply = "Which ride do you want to see?";
          return res.json({ aiResult, dbResult: null, aiReply });
        }
        dbResult = await findRideById(aiResult.rideId);

        if (!dbResult) {
          aiReply = "That ride doesn’t seem to exist.";
          return res.json({ aiResult, dbResult: null, aiReply });
        }          
      break;

      case "book_ride":
          const authReq = req as AuthRequest; // cast Request to AuthRequest
        if (!authReq.user) {
          aiReply = "To book a ride, please log in first.";
          return res.json({ aiResult, dbResult: null, aiReply });
        }
        if (!aiResult.rideId) {
          aiReply = "Which ride do you want to book?";
          return res.json({ aiResult, dbResult: null, aiReply });
        }
        const ride = await findRideById(aiResult.rideId);
        if (!ride) {
          aiReply = "I couldn’t find this ride anymore.";
          return res.json({ aiResult, dbResult: null, aiReply });
        }
        const seatsAvailable = Number(ride.seats ?? 0);
        const seatsRequested = Number(aiResult.seats ?? 1);
        if (seatsAvailable < seatsRequested) {
          aiReply = `Only ${seatsAvailable} seats left! You requested ${seatsRequested}.`;
          return res.json({ aiResult, dbResult: null, aiReply });
        }

        // reduce available seats
        await updateRide(aiResult.rideId, { seats: seatsAvailable - seatsRequested });
        // create booking
        dbResult = await createBooking(null, aiResult.rideId, seatsRequested);
        aiReply = `Your booking is confirmed! ${seatsRequested} seat(s) reserved.`;
        break;
      default:
        dbResult = { message: 'Unknown intent' };
        break;
      }
    console.log('DB result:', dbResult);

    // 3. Build updated conversation for AI (includes backend results)
    const updatedConversation: ConversationMessage[] = [
      ...conversationHistory,
      { role: 'user', content: userMessage },
    ];

    if (dbResult) {
      updatedConversation.push({ role: 'backend', content: JSON.stringify(dbResult) });
    }

    // 4. Generate human-readable AI reply
    aiReply = await generateUserReply(dbResult, updatedConversation);

    // 5. Return structured AI intent, DB result, and readable reply
    res.json({ aiResult, dbResult, aiReply });

  } catch (err: any) {
    console.error('AI router error:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
