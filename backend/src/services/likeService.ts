import { prisma } from '../config/db.js';
import type { likeResponse } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const likePostService = async (
  postId: string,
  userId: string
): Promise<likeResponse> => {
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new AppError('Post not found', 404);
  }

  const alreadyLike = await prisma.like.findMany({
    where: {
      userId,
      postId,
    },
  });
  if (alreadyLike.length > 0) {
    throw new AppError('Already liked the post', 400);
  }
  const like = await prisma.like.create({
    data: {
      userId,
      postId,
    },
    select: {
      id: true,
      userId: true,
      postId: true,
      createdAt: true,
    },
  });
  return like;
};

export const unlikePostService = async (userId: string, postId: string) => {
  const like = await prisma.like.findFirst({
    where: {
      userId,
      postId,
    },
  });
  if (!like) {
    throw new AppError('Like not found', 404);
  }
  await prisma.like.delete({
    where: { id: like.id },
  });
};
