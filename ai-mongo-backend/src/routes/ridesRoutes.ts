// ai-mongo-backend/src/routes/ridesRoutes.ts
import express from 'express';
import {
  createRide,
  listRides,
  getRide,
  updateRide,
  deleteRide,
  bookRide
} from '../controllers/ridesController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', listRides);            // public search/list
router.get('/:id', getRide);           // public get

router.post('/', authMiddleware, createRide);      // create ride (driver)
router.put('/:id', authMiddleware, updateRide);    // edit ride (driver)
router.delete('/:id', authMiddleware, deleteRide); // delete ride (driver)
router.post('/:id/book', authMiddleware, bookRide);// booking (user)

export default router;
