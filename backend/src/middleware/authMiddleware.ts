import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { prisma } from '../config/db.js';
import type { JwtPayloadWithId } from '../types/index.js';

//read token from the request and check if the token is valid
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Auth middleware reached');
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(401).json({ error: 'Not authorized, no token provided' });
  }

  try {
    //verify token and extract user ID
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variable');
    }
    const decoded = jwt.verify(token, secret) as JwtPayloadWithId;
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) {
      return res.status(401).json({ error: 'User no longer exists' });
    }
    // do req.user.id for other controllers
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Not authorized token error' });
  }
};
