import express from 'express';

import {
  getMe,
  login,
  logout,
  register,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.post('/logout', logout);

//postman cannot use cookie so we gotta do bearer Auth token
//main reason to include authMiddleware it checks whether the cookie is valid or not
//if we donot use it will show error problems user exist or not or unauthorised accesss
router.get('/me', authMiddleware, getMe);

export default router;
