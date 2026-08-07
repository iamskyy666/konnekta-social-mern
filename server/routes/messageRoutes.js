import { Router } from "express";
import {
  getChatMessages,
  sendMessage,
  sseEventController,
} from "../controllers/messageController.js";
import { upload } from "../configs/multer.js";
import protectMw from "../middlewares/auth.js";

const messageRouter = Router();

messageRouter.use(protectMw); // Apply the authentication middleware to all routes in this router

messageRouter.get("/:userId", sseEventController);
messageRouter.post("/send", upload.single("image"), sendMessage);
messageRouter.post("/get", getChatMessages);

export default messageRouter;
