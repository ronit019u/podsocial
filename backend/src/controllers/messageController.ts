import type { NextFunction, Request, Response } from 'express';

import { createText, getAllMessages } from '../services/messageService.js';
import type { ChatDTO, ChatResponse, MessageDTO } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const createMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body as MessageDTO;

    console.log('chatId:', chatId);
    console.log('text:', text);

    if (!chatId || typeof chatId != 'string')
      throw new AppError('not found', 400);

    const newMessage = await createText(chatId, text, req.user!.id);
    return res.status(201).json({
      status: 'success',
      data: newMessage,
    });
  } catch (error) {
    next(error);
  }
};

export const getMessage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { chatId } = req.params as { chatId: string };

    if (!chatId) throw new AppError('chat not found', 404);

    const messages = await getAllMessages(chatId);
    return res.status(200).json({
      status: 'success',
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};
