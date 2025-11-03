import Redis from "ioredis";

export const client = new Redis(
  "rediss://default:ATnvAAIncDI5MTZiMzA1NjM1Y2Q0ZDE1YjA3ZmQ0MWMxMjg5MWU4MXAyMTQ4MzE@sought-guppy-14831.upstash.io:6379"
);
