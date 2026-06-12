import type { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/AppError.js';

export const errorMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err); // ✅ also log the actual error
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
};
