import { Router } from "express";
import {
  addUserStory,
  getUserStories,
} from "../controllers/storyController.js";
import protectMw from "../middlewares/auth.js";
import { upload } from "../configs/multer.js";

const storyRouter = Router();

storyRouter.post("/create", protectMw, upload.single("media"), addUserStory);
storyRouter.get("/get", protectMw, getUserStories);

export default storyRouter;
