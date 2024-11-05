import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    // google
    googleId: {
      type: String,
      required: false,
      unique: true,
    },
    name: {
      type: String,
      required: false,
    },

    // manual
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verivicationCode: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
