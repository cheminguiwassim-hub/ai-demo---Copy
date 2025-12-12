// src/routes/ride.routes.ts

import { Router } from 'express';
import { createRide, getRides } from '../controllers/rideController';

const router = Router();

router.post('/', createRide);      // POST /rides
router.get('/', getRides);         // GET /rides

export default router;
