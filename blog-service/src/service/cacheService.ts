import { Job, Worker } from "bullmq";
import { client } from "../config/redis.config";

export const blogWorker = new Worker(
  "add-new-blog",
  async (job: Job) => {
    if (job.name === "new-blog") {
      console.log(job.data);
      const pattern = "blogs*";
      const keys = await client.keys(pattern);
      if (keys.length > 0) {
        await client.del(...keys);
        console.log(`🗑️ Cache invalidated for keys: ${keys.join(", ")}`);
      } else {
        console.log("ℹ️ No cache keys found to invalidate.");
      }
    }
  },
  { connection: client }
);
