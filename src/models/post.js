import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const postSchema = new Schema(
    {
      content: {
        type: String,
        trim: true,
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      isDeleted: {
        type: Boolean,
        default: false,
      }, 
      likes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        }
      ]
    },
    {
      timestamps: true    
    }
);

export default model('Post', postSchema);
