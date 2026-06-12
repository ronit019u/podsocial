// add this temporarily in your routes file

import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';

import { AppError } from '../utils/AppError.js';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    throw new AppError('prove it works', 404);
  } catch (error) {
    next(error);
  }
});

export default router;
