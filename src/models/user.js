import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
      firstName: {
        type: String,
        trim: true      
      },
      lastName: {
        type: String,
        trim: true
      },
      email: {
        type: String,
        required: false,
        lowercase: true,
        unique: true
      },
      isVerified: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true    
    }
);

userSchema.virtual("name").get(function () {
    if (this.firstName && this.lastName) {
      return this.firstName + " " + this.lastName;
    } else if(this.firstName) {
      return this.firstName;
    } else if(this.lastName) {
      return this.lastName;
    } else {
      return null;
    }
  });

export default model('User', userSchema);
