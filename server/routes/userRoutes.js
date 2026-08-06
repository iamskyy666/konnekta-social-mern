import { Router } from "express";
import {
  acceptConnectionRequests,
  discoverUsers,
  followUser,
  getUserConnections,
  getUserData,
  sendConnectionReq,
  unfollowUser,
  updateUserData,
} from "../controllers/userController.js";
import protectMw from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";

const userRouter = Router();

//🔧 REFACTORED: Apply authentication to every route below
userRouter.use(protectMw);

userRouter.get("/data", getUserData);

userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  updateUserData,
);

userRouter.post("/discover", discoverUsers);
userRouter.post("/follow", followUser);
userRouter.post("/unfollow", unfollowUser);
userRouter.post("/connect", sendConnectionReq);
userRouter.post("/accept", acceptConnectionRequests);
userRouter.get("/connections", getUserConnections);

export default userRouter;
