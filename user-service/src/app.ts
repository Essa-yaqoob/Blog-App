import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import userRouter from "./routes/router";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", userRouter);
