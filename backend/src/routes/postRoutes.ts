import express from 'express';

import {
  addComment,
  deleteComments,
  getComments,
} from '../controllers/commentController.js';
import { likePost, unLikePost } from '../controllers/likeController.js';
import {
  createPost,
  getPostById,
  getPosts,
} from '../controllers/postController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

//router.use(authMiddleware);
router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPosts);
router.get('/:id', authMiddleware, getPostById);
router.post('/:postId/like', authMiddleware, likePost);
router.delete('/:postId/like', authMiddleware, unLikePost);

router.post('/:postId/comment', authMiddleware, addComment);
router.get('/:postId/comments', authMiddleware, getComments);
router.delete('/comment/:commentId', authMiddleware, deleteComments);
export default router;
