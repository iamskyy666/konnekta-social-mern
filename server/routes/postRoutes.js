import { Router } from "express";
import {
  addPost,
  getFeedPosts,
  likePost,
} from "../controllers/postController.js";
import { upload } from "../configs/multer.js";
import protectMw from "../middlewares/auth.js";

const postRouter = Router();

postRouter.use(protectMw); // Apply authentication middleware to all routes

postRouter.post("/add", upload.array("images", 4), addPost);
postRouter.get("/feed", getFeedPosts);
postRouter.post("/like", likePost);

export default postRouter;
