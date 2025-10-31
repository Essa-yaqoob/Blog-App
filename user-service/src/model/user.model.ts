import mongoose, { Document, Schema } from "mongoose";

export interface IUSER extends Document {
  name: string;
  email: string;
  image: string;
  facebook_url: string;
  instagram_url: string;
  linkdIn_url: string;
  bio: string;
}

const userSchema: Schema<IUSER> = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  facebook_url: {
    type: String,
  },
  instagram_url: {
    type: String,
  },
  linkdIn_url: {
    type: String,
  },
  bio: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
