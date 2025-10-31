import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string, {
      dbName: process.env.DB_NAME,
    });
  } catch (error) {
    throw error;
  }
};
