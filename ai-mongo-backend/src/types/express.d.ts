/*import { IUser } from '../models/User'; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email?: string;
        // add other fields you attach in authMiddleware
      };
    }
  }
}*/



/*import { IUser } from '../models/User';
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: IUser; // your user type, optional
    }
  }
}*/





/*import { IUser } from '../../ai-mongo-backend/src/models/User'; // adjust path if needed

declare global {
  namespace Express {
    interface Request {
      user?: { id: string }; // define user object
    }
  }
}*/


/*
import "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
    };
  }
}
*/

/*import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;email?: string 
      } | null;
    }
  }
}

export {};
*/


import { Types } from 'mongoose';

declare global {
  namespace Express {
    interface User {
      id: string;
      email?: string;
    }

    interface Request {
      user?: User;
    }
  }
}

export {};
