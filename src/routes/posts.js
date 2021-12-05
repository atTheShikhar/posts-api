import { Router } from 'express';
import addComment from '../controllers/posts/addComment.js';
import deletePost from '../controllers/posts/deletePost.js';
import getComments from '../controllers/posts/getComments.js';
import likePost from '../controllers/posts/likePost.js';
import newPost from '../controllers/posts/newPost.js';
import authenticate from '../middlewares/authenticate.js';
import validate from '../middlewares/validate.js';
import { validString } from '../middlewares/validation.js';

const router = Router();

router.post(
  '/new-post', 
  [
    // Max 512 characters are allowed for post text
    validString(true, "content", "Content", 512),
  ],
  validate, 
  authenticate, 
  newPost
);

router.post(
  '/add-comment', 
  [
    // Max 512 characters are allowed for comment text
    validString(true, "content", "Content", 512),
  ],
  validate, 
  authenticate, 
  addComment
);

router.post('/like-post', authenticate, likePost);

router.get('/get-comments/:postId', authenticate, getComments);

router.delete('/delete-post', authenticate, deletePost);


export default router;