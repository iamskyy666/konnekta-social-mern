import { Router } from "express";
import {
  acceptConnectionRequests,
  discoverUsers,
  followUser,
  getUserConnections,
  getUserData,
  getUserProfiles,
  sendConnectionReq,
  unfollowUser,
  updateUserData,
} from "../controllers/userController.js";
import protectMw from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";
import { getUserRecentMessages } from "../controllers/messageController.js";

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
userRouter.post("/connect", protectMw, sendConnectionReq);
userRouter.post("/accept", protectMw, acceptConnectionRequests);
userRouter.get("/connections", protectMw, getUserConnections);
userRouter.get("/recent-messages", protectMw, getUserRecentMessages);

// Public endpoint — no authentication required
userRouter.post("/profiles", getUserProfiles);

export default userRouter;
