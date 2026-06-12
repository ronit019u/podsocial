import express from 'express';

import { getById, search } from '../controllers/podcastController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/search', search);

router.get('/:id', getById);

export default router;
