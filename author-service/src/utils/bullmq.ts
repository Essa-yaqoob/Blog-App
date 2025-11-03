import { Queue } from "bullmq";
import { client } from "../config/redis.config";

const addBlogQueue = new Queue("add-new-blog", { connection: client });

export const addNewBlogInQueue = async (blog: any) => {
  const job = await addBlogQueue.add("new-blog", { blog });
};
