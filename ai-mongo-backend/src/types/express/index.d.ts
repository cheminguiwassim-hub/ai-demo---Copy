/*import express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

*/

// ai-mongo-backend/src/types/express/index.d.ts
import { IUser } from "../../models/User";

declare global {
  namespace Express {
    interface Request {
      user?: IUser
    }
  }
}
