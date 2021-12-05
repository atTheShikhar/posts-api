import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const commentSchema = new Schema(
    {
      content: {
        type: String,
        trim: true,
        required: true,
      },
      post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      isDeleted: {
        type: Boolean,
        default: false,
      }, 
    },
    {
      timestamps: true,
    }
);

export default model('Comment', commentSchema);
