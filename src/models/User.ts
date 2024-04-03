import { Schema, model } from "mongoose";

const User = new Schema({
  name: String,
  email: String,
  username: String,
  picture: String,
  bio: String,
  isActive: Boolean,
  isVerified: Boolean,
  inactive: Boolean,
  createdAt: Date,
});

export default model("User", User);
