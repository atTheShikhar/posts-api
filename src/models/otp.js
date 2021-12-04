import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const otpSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
      },
      otp: {
        type: String,
        trim: true,
        required: true,
      },
      sendAt: {
        type: Date,
        required: true,
      },
      isUsed: {
        type: Boolean,
        required: true,
        default: false
      }
    },
    {
      timestamps: true    
    }
);

export default model('Otp', otpSchema);
