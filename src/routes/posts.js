import { Router } from 'express';
import comment from '../controllers/posts/comment.js';
import newPost from '../controllers/posts/newPost.js';
import authenticate from '../middlewares/authenticate.js';

const router = Router();

router.post('/new-post', authenticate, newPost);
router.post('/comment', authenticate, comment);

export default router;