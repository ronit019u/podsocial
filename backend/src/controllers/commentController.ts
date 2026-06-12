import type { NextFunction, Request, Response } from 'express';

import {
  createComment,
  getCommentService,
  removeComment,
} from '../services/commentService.js';
import type { Comment } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

const addComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;
    const { content } = req.body as Comment;

    if (!postId || typeof postId !== 'string') {
      throw new AppError('Invalid post ID', 400);
      //return res.status(400).json({ error: 'Invalid post ID' });
    }

    const comment = await createComment(postId, content, req.user!.id);

    return res.status(201).json({
      status: 'success',
      data: comment,
    });
  } catch (error) {
    next(error);
  }
};

const getComments = async (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params;
  try {
    if (!postId || typeof postId !== 'string') {
      throw new AppError('Invalid post ID', 400);
    }

    const comments = await getCommentService(postId);

    return res.status(200).json({
      status: 'success',
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params;

    if (!commentId || typeof commentId !== 'string') {
      throw new AppError('Invalid comment ID', 400);
    }

    await removeComment(commentId);

    return res.status(200).json({
      status: 'success',
      message: 'Comment deleted',
    });
  } catch (error) {
    next(error);
  }
};

export { addComment, deleteComments, getComments };
