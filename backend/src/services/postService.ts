import { prisma } from '../config/db.js';
import { getPodcastById } from '../services/taddyServices.js';
import type { PostResponse } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const createPostService = async (
  podCastId: string,
  userId: string
): Promise<PostResponse> => {
  //real magic where my taddy api and db works together
  const podcast = await getPodcastById(podCastId);

  const post = await prisma.post.create({
    data: {
      title: podcast.name,
      coverImage: podcast.imageUrl,
      description: podcast.description,
      totalEpisodes: podcast.totalEpisodesCount,
      userId,
    },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  return post;
};

export const getpostService = async (): Promise<PostResponse[]> => {
  const posts = await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
      likes: {
        select: { id: true, userId: true },
      },
    },
  });
  return posts;
};

export const singlePostService = async (id: string): Promise<PostResponse> => {
  const post = await prisma.post.findUnique({
    where: { id },
    include: {
      user: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  if (!post) {
    throw new AppError('Post not found', 400);
    //return res.status(404).json({ error: 'Post not found' });
  }
  return post;
};
