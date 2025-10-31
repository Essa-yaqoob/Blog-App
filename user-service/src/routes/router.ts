import { Router } from "express";
import {
  login,
  profile,
  profileById,
  profilePicUpdate,
  profileUpdate,
} from "../controller/user.controller";
import { authMiddleware } from "../middlewares/authMiddleware";
import { upload } from "../middlewares/multer";

const router = Router();

router.post("/login", login);

router.get("/profile", authMiddleware, profile);

router.get("/profile/:id", profileById);

router.patch("/update-profile", authMiddleware, profileUpdate);

router.put(
  "/update-profile-pic",
  authMiddleware,
  upload.single("file"),
  profilePicUpdate
);

export default router;
