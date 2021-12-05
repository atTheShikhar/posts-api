import Post from '../../models/post.js';
import Comment from '../../models/comment.js';

const deletePost = async (req, res) => {
  const { postId, decoded } = req.body;

  try {
    // Deletes the post and return the post information before deletion
    const postData = await Post.findOneAndUpdate(
      {
        _id: postId,
        createdBy: decoded._id,
        isDeleted: false,
      },
      {
        isDeleted: true, 
      }
    );

    if (postData) {
      // Delete all comments of that post.
      await Comment.updateMany(
        {
          post: postId,
        },
        {
          isDeleted: true,
        }
      );

      return res.status(200).json({
        message: "Post deleted successfully!"
      });
    }

    return res.status(404).json({
      error: "Post does not exists!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong, Please try again later!"
    });
  }
}

export default deletePost;