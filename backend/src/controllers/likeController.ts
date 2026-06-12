import type { NextFunction, Request, Response } from 'express';

import { likePostService, unlikePostService } from '../services/likeService.js';
import { AppError } from '../utils/AppError.js';

const likePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;

    if (!postId || typeof postId !== 'string') {
      throw new AppError('Invalid post ID', 400);
    }

    const like = await likePostService(postId, req.user!.id);

    return res.status(201).json({
      status: 'success',
      data: like,
    });
  } catch (error) {
    next(error);
  }
};

const unLikePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { postId } = req.params;

    if (!postId || typeof postId !== 'string') {
      throw new AppError('Invalid post ID', 400);
    }

    await unlikePostService(req.user!.id, postId);

    return res.status(200).json({
      status: 'success',
      message: 'Post unliked',
    });
  } catch (error) {
    next(error);
  }
};

export { likePost, unLikePost };
