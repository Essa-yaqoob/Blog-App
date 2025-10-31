import { Router } from "express";
import {
  createBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/author.controller";
import { authMiddleware } from "../middlewares/middlewares/authMiddleware";
import { upload } from "../middlewares/middlewares/multer";

const router = Router();

router.post("/create-blog", authMiddleware, upload.single("file"), createBlog);

router.patch(
  "/update-blog/:id",
  authMiddleware,
  upload.single("file"),
  updateBlog
);

router.delete("/delete-blog/:id", authMiddleware, deleteBlog);

export default router;
