import { Router } from "express";
import { getAllBlogs, getBlogById } from "../controller/blog.controller";

const router = Router();

router.get("/blogs", getAllBlogs);

router.get("/blog/:id", getBlogById);

export default router;
