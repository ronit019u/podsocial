/*Services files make sure the rules for the app that I define
like if email exists or like u cannot comment without any content
or like u cannot like posts twice or u cannot register with the
same email twice must be followed */

import bcrypt from 'bcrypt';

import { prisma } from '../config/db.js';
import type { Login, Register, User } from '../types/index.js';
import { AppError } from '../utils/AppError.js';

export const registerUser = async (data: Register): Promise<User> => {
  const { name, email, password } = data;

  if (!email || !password || !name) {
    throw new AppError('All fields must be filled', 400);
  }

  const userExists = await prisma.user.findUnique({
    where: { email },
  });
  if (userExists) {
    throw new AppError('User already exists with this email', 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (data: Login): Promise<User> => {
  const { email, password } = data;

  //check if email exits in the db
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw new AppError('Invalid email', 400);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid password', 400);
  }
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
};
