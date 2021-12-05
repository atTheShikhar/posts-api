import Post from "../../models/post.js";

const newPost = async (req, res) => {
  const { content, decoded } = req.body;

  try {
    const postData = new Post({
      content,
      createdBy: decoded._id,
      isDeleted: false,
      likes: [],
    });

    postData.save();

    return res.status(201).json({
      message: "Post created successfully!",
      post: {
        id: postData._id,
        content,
        likes: postData.likes,
      }
    })

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong, Please try again later!"
    });
  }
}

export default newPost;