import type { NextFunction, Request, Response } from 'express';

import { createChatService, getChatService } from '../services/chatService.js';
import type { ChatDTO } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const createChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { otherUserId } = req.body as ChatDTO;

    if (!otherUserId) {
      throw new AppError('not found', 400);
    }

    const chat = await createChatService(req.user!.id, otherUserId);
    res.status(201).json({
      status: 'success',
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};

export const getChat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await getChatService(req.user!.id);
    res.status(200).json({
      status: 'success',
      data: chat,
    });
  } catch (error) {
    next(error);
  }
};
