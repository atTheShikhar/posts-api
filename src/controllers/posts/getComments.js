import Post from '../../models/post.js';
import Comment from '../../models/comment.js';

const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const postData = await Post.findOne({
      _id: postId,
      isDeleted: false,
    })
      .select('_id content createdBy createdAt')
      .populate(
        {
          path: 'createdBy',
          select: 'firstName lastName email'
        }
      );

    if (postData) {
      const allComments = await Comment.find(
        {
          post: postId,
          isDeleted: false,
        },
      ).select('_id content createdBy createdAt')
      .populate(
        {
          path: 'createdBy',
          select: 'firstName lastName email'
        }
      );

      return res.status(200).json({
        message: "All Comments",
        post: postData,
        comments: allComments
      })
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
};

export default getComments;