import type { NextFunction, Request, Response } from 'express';

import {
  createPostService,
  getpostService,
  singlePostService,
} from '../services/postService.js';
import { AppError } from '../utils/AppError.js';

//creates post using taddy podcast
export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { podCastId } = req.body as { podCastId: string };
    if (!podCastId) {
      throw new AppError('Podcast ID required', 400);
    }

    const post = await createPostService(podCastId, req.user!.id);
    return res.status(201).json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

//get all posts
export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getpostService();
    return res.json({
      status: 'success',
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

//get single post

export const getPostById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== 'string') {
      throw new AppError('Invalid post ID', 400);
    }
    const post = await singlePostService(id);
    return res.json({
      status: 'success',
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

//delete post and update
