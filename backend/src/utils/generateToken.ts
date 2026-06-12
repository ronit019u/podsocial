import type { Response } from 'express';
import jwt, { type SignOptions } from 'jsonwebtoken';

import type { User } from '../types/index.js';

export const generateToken = (userId: User['id'], res: Response): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT secret not defined');

  const payload = { id: userId };

  const options: SignOptions = {
    expiresIn: (process.env.JWT_IN as SignOptions['expiresIn']) ?? '7d',
  };

  const token = jwt.sign(payload, secret, options);
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000,
  });
  return token;
};
