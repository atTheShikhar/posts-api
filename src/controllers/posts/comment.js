import Comment from "../../models/comment.js";
import Post from "../../models/post.js";

const comment = async (req, res) => {
  const { content, postId, decoded } = req.body;

  try {
    const postData = await Post.findById(postId);

    if (postData) {
      const commentData = new Comment({
        content,
        post: postId,
        createdBy: decoded._id,
        isDeleted: false,
      });

      commentData.save();

      return res.status(201).json({
        message: "Comment added successfully!",
        comment: {
          id: commentData._id,
          postId,
          content,
        }
      })
    }

    return res.status(404).json({
      message: "Post does not exists!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong, Please try again later!"
    });
  }
}

export default comment;