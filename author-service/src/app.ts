import express from "express";
import cookieParser from "cookie-parser";

import authorRoute from "./routers/author.route";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1", authorRoute);
