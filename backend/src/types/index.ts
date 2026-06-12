/*response is like what we give to the client or user and DTO is like wht we get from user */

import jwt from 'jsonwebtoken';

export interface User {
  id: string;
  name?: string;
  email: string;
}

export interface Register {
  name: string;
  email: string;
  password: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface JwtPayloadWithId extends jwt.JwtPayload {
  id: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export interface TaddyPodcast {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  itunesId?: string;
  totalEpisodesCount: number;
}
/* gotta remove podcastUrl later there is no
    such service in the taddy podcast*/

interface Like {
  id: string;
  userId: string;
}

export interface PostResponse {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  totalEpisodes: number;
  createdAt: Date;
  userId: string;
  user: User;
  likes?: Like[];
}

export interface Comment {
  content: string;
}

export interface CommentResponse {
  id: string;
  content: string;
  user: User;
  createdAt: Date;
}

export interface likeResponse {
  id: string;
  postId: string;
  userId: string;
  createdAt: Date;
}

export interface ChatResponse {
  id: string;
  userOneId: string;
  userTwoId: string;
  message?: MessageResponse[];
}

export interface ChatDTO {
  otherUserId: string;
}

export interface MessageDTO {
  text: string;
}

export interface MessageResponse {
  id: string;
  userId: string;
  chatId: string;
  createdAt: Date;
  text: string;
}
