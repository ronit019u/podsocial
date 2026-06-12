import { prisma } from '../config/db.js';
import type { ChatResponse } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const createChatService = async (
  userOneId: string,
  userTwoId: string
): Promise<ChatResponse> => {
  console.log('userOneId:', userOneId);
  console.log('userTwoId:', userTwoId);
  const existingChat = await prisma.chat.findFirst({
    where: {
      OR: [
        { userOneId: userOneId, userTwoId: userTwoId },
        { userOneId: userTwoId, userTwoId: userOneId },
      ],
    },
  });

  if (existingChat) return existingChat;

  const newChat = await prisma.chat.create({
    data: {
      userOne: { connect: { id: userOneId } },
      userTwo: { connect: { id: userTwoId } },
    },
  });
  return newChat;
};

export const getChatService = async (userId: string) => {
  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ userOneId: userId }, { userTwoId: userId }],
    },
    include: {
      userOne: { select: { id: true, name: true } },
      userTwo: { select: { id: true, name: true } },
    },
  });
  return chats;
};
