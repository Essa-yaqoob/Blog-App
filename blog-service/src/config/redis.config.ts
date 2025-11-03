import Redis from "ioredis";

export const client = new Redis({
  host: "sought-guppy-14831.upstash.io",
  port: 6379,
  username: "default",
  password: "ATnvAAIncDI5MTZiMzA1NjM1Y2Q0ZDE1YjA3ZmQ0MWMxMjg5MWU4MXAyMTQ4MzE",
  tls: {}, // 👈 required for "rediss://" (secure connection)
  maxRetriesPerRequest: null, // 👈 required by BullMQ
});
