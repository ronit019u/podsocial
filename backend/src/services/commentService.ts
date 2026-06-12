import { prisma } from '../config/db.js';
import type { CommentResponse } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const createComment = async (
  postId: string,
  content: string,
  userId: string
): Promise<CommentResponse> => {
  if (!content || content.trim().length === 0) {
    throw new AppError('comments requried', 400);
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  if (!post) {
    throw new AppError('post not found', 404);
  }

  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      postId,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  return comment;
};

export const getCommentService = async (
  postId: string
): Promise<CommentResponse[]> => {
  const comments = await prisma.comment.findMany({
    where: { postId: postId },
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  return comments;
};

export const removeComment = async (commentId: string) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    throw new AppError('Comment not found', 404);
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });
};
