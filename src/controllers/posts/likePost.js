import Comment from "../../models/comment.js";
import Post from "../../models/post.js";

const likePost = async (req, res) => {
  const { postId, decoded } = req.body;

  try {
    const postData = await Post.findOneAndUpdate(
      {
        _id: postId,
        isDeleted: false,
      },
      {
        // only adds the user id if it does not exists already
        $addToSet: {    
          likes: decoded._id,
        }
      },
      {
        // returns after updation
        new: true
      }
    )
    .select('content createdBy likes createdAt')
    .populate({
      path: 'createdBy',
      select: 'firstName lastName email',
    })
    .populate({
      path: 'likes',
      select: 'firstName lastName email',
    });

    if (postData) {
      return res.status(200).json({
        message: "Liked the post successfully!",
        post: postData,
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

export default likePost;