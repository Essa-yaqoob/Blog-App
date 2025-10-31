import { Types } from "mongoose";
import cloudinary from "../config/cloudinary";
import { User } from "../model/user.model";
import { getBuffer } from "../utils/helper";
import { HttpStatusCode } from "../utils/HttpStatusCode";
import { generateJwtToken } from "../utils/Jwt";
import { TryCatch } from "../utils/TryCatch";

export const login = TryCatch(async (req, res) => {
  const { name, email, image } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name,
      email,
      image,
    });
  }

  const token = generateJwtToken((user._id as Types.ObjectId).toString());

  res.cookie("token", token);

  return res.status(HttpStatusCode.OK).json({
    message: "User login successfully",
    user,
  });
});

export const profile = TryCatch(async (req, res) => {
  const user = req.user;

  return res.status(HttpStatusCode.OK).json({
    message: "Profile fetched successfully",
    user,
  });
});

export const profileById = TryCatch(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return res.status(HttpStatusCode.NOT_FOUND).json({
      message: "User not found",
    });
  }

  return res.status(HttpStatusCode.OK).json({
    message: "User profile fetched successfully",
    user,
  });
});

export const profileUpdate = TryCatch(async (req, res) => {
  const { name, facebook_url, instagram_url, linkdIn_url, bio } = req.body;

  //@ts-ignore
  const userId = req.user._id;

  const user = await User.findByIdAndUpdate(
    userId,
    {
      name,
      facebook_url,
      instagram_url,
      linkdIn_url,
      bio,
    },
    { new: true }
  );

  return res.status(HttpStatusCode.OK).json({
    message: "User updated successfully",
    user,
  });
});

export const profilePicUpdate = TryCatch(async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(HttpStatusCode.BAD_REQUEST).json({
      message: "File not found",
    });
  }

  //@ts-ignore
  const userId = req.user;

  const fileUri = getBuffer(file);

  const result = await cloudinary.uploader.upload(fileUri.content as string, {
    folder: "Blogs",
  });

  const user = await User.findByIdAndUpdate(
    userId,
    {
      image: result.secure_url,
    },
    { new: true }
  );

  return res.status(HttpStatusCode.OK).json({
    message: "User profile picture updated successfully",
    user,
  });
});
