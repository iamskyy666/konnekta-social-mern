import { Router } from "express";
import {
  discoverUsers,
  followUser,
  getUserData,
  unfollowUser,
  updateUserData,
} from "../controllers/userController.js";
import protectMw from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";

const userRouter = Router();

userRouter.get("/data", protectMw, getUserData);
userRouter.post(
  "/update",
  protectMw,
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateUserData,
);
userRouter.post("/discover", protectMw, discoverUsers);
userRouter.post("/follow", protectMw, followUser);
userRouter.post("/unfollow", protectMw, unfollowUser);

export default userRouter;
