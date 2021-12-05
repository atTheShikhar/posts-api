import { Router } from 'express';
import addComment from '../controllers/posts/addComment.js';
import deletePost from '../controllers/posts/deletePost.js';
import getComments from '../controllers/posts/getComments.js';
import newPost from '../controllers/posts/newPost.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.post('/new-post', authenticate, newPost);
router.post('/add-comment', authenticate, addComment);
router.get('/get-comments/:postId', authenticate, getComments);
router.delete('/delete-post', authenticate, deletePost);

export default router;