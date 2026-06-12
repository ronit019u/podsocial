/* controller files are like middle man that
talks with the HTTP request then with services then
pass HTTP response */

import type { NextFunction, Request, Response } from 'express';

import { loginUser, registerUser } from '../services/authService.js';
import type { Login, Register } from '../types/index.js';
import { generateToken } from '../utils/generateToken.js';

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body as Register); //generate JWT token
    const token = generateToken(user.id, res);
    console.log(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response) => {
  const user = await loginUser(req.body as Login);

  //generate JWT token
  const token = generateToken(user.id, res);

  res.status(200).json({
    status: 'success',
    data: {
      user,
      token,
    },
  });
};

const getMe = (req: Request, res: Response) => {
  res.json(req.user);
};

//not handling db calls or any business logic
const logout = async (req: Request, res: Response) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully',
  });
};

export { getMe, login, logout, register };
