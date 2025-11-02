import "dotenv/config";

import { app } from "./app";
import { redisClient } from "./config/redis.config";

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server started at PORT : ${PORT}`);
  redisClient
    .connect()
    .then(() => {
      console.log("Redis client connected successfully");
    })
    .catch((error) => {
      console.log("Redis connection failed");
      console.log(error);
    });
});
