import { prisma } from '../config/db.js';
import { io } from '../index.js';
import type { MessageResponse } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const createText = async (
  chatId: string,
  text: string,
  userId: string
): Promise<MessageResponse> => {
  const chat = await prisma.chat.findUnique({ where: { id: chatId } });

  if (!chat) throw new AppError('chat not found', 404);

  const newText = await prisma.message.create({
    data: {
      chatId,
      text,
      userId,
    },
  });

  //socket io
  io.to(chatId).emit('newText', newText);

  return newText;
};

export const getAllMessages = async (
  chatId: string
): Promise<MessageResponse[]> => {
  const chat = await prisma.chat.findUnique({ where: { id: chatId } });

  if (!chat) throw new AppError('chat not found', 404);

  const messages = await prisma.message.findMany({
    where: { chatId },
    orderBy: { createdAt: 'asc' },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  return messages;
};
