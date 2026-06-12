export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => Promise<void>;
  isLoading: boolean;
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

export interface TaddyPodcast {
  uuid: string;
  name: string;
  description: string;
  imageUrl: string;
  itunesId?: string;
  totalEpisodesCount: number;
}

export interface PostResponse {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  totalEpisodes: number;
  createdAt: string;
  userId: string;
  user: User;
  likes: { id: string; userId: string }[];
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

export interface Chat {
  id: string;
  userOneId: string;
  userTwoId: string;
  userOne: { id: string; name: string };
  userTwo: { id: string; name: string };
}

export interface Message {
  id: string;
  text: string;
  userId: string;
  chatId: string;
  createdAt: string;
  user: User;
}
