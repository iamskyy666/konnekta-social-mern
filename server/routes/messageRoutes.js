import { Router } from "express";
import {
  getChatMessages,
  sendMessage,
  sseEventController,
} from "../controllers/messageController.js";
import { upload } from "../configs/multer.js";
import protectMw from "../middlewares/auth.js";

const messageRouter = Router();

messageRouter.get("/:userId", sseEventController);
messageRouter.post("/send",protectMw, upload.single("image"), sendMessage);
messageRouter.post("/get",protectMw, getChatMessages);

export default messageRouter;
