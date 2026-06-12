import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { type Request, type Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

//import { PrismaClient } from "@prisma/client"
import { connectDB, disconnectDB, prisma } from './config/db.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import podcastRoutes from './routes/podcastRoutes.js';
import postRoutes from './routes/postRoutes.js';
import testRoutes from './routes/testRoutes.js';
dotenv.config();

export const app = express();

/* wrapping express through app inside httpServer*/
const httpServer = createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

/* now the server is handling socket*/
export const io = new Server(httpServer, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinChat', (chatId: string) => {
    socket.join(chatId);
    console.log(`user joined chat ${chatId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
  });
});

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

//body parsing middlewares
app.use(express.json());
app.use(cookieParser());
app.get('/', async (_req: Request, res: Response) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ message: 'Server + DB working ✅' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database not connected ❌' });
  }
});

app.use('/auth', authRoutes);
app.use('/api/podcast', podcastRoutes);
app.use('/api/posts', postRoutes);
app.use('/test-error', testRoutes);
app.use('/api/chat', messageRoutes);
app.use(errorMiddleware);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
/* changed from app to httpServer donot want app to crated separate server
 where only express being handle not with socket*/
const server = httpServer.listen(PORT || 5001, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection', err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

process.on('uncaughtException', async (err) => {
  console.error('Uncaight Exception:', err);
  await disconnectDB();
  process.exit(1);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
