import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log('DB connected via Prisma');
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting DB via Prisma: ${error.message}`);
    } else {
      console.error('Unknown error connecting DB via Prisma');
    }
  }
};

const disconnectDB = async () => {
  await prisma.$disconnect();
};

export { connectDB, disconnectDB, prisma };
