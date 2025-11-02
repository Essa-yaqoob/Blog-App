import express from "express";

import blogRoutes from "./routes/blog.routes";

export const app = express();

app.use("/api/v1", blogRoutes);
