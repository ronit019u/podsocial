/* basic idea a user will click on the start chat button
on the frontend which will create a chatId that chatId can 
be used to create messages*/

import express from 'express';

import { createChat, getChat } from '../controllers/chatController.js';
import { createMessage, getMessage } from '../controllers/messageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createChat);
router.get('/', getChat);

router.post('/:chatId/message', createMessage);
router.get('/:chatId/messages', getMessage);
//router.delete('/:chatId/messages/:messageId');

export default router;
