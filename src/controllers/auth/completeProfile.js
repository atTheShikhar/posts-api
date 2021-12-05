import User from "../../models/user.js";

const completeProfile = async (req,res) => {
  const { firstName, lastName, decoded } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate({
      _id: decoded._id,
      email: decoded.email,
    },{
      firstName,
      lastName,
    },{
      new: true,
    })

    return res.status(200).json({
      message: "User data updated successfully",
      user: {
        type: 'User',
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isVerified: updatedUser.isVerified,
      }
    });
  } catch(err) {
    console.log(err);
    return res.status(500).json({
      error: "Something went wrong, Please try again later!"
    });
  }

}

export default completeProfile;