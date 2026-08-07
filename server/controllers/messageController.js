// Realtime chat features

import fs from "fs";
import imagekit from "../configs/imageKit.js";
import MessageModel from "../models/message.model.js";

const connections = {}; // server-side Event connections

//! SSE
export const sseEventController = (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    console.log(`🔵 New client connected: ${userId}`);

    // Set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");

    // Add the client's response object to the connections object
    connections[userId] = res;

    // Send an initial event to the client
    res.write("log: Connected to SSE server ✅\n\n");

    // Handle client disconnect
    req.on("close", () => {
      // Remove the client's response object from the connections object
      delete connections[userId];
      console.log(`🔴 Client disconnected: ${userId}`);
    });
  } catch (error) {
    console.error("🔴 Error in SSE controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//! Send Message
export const sendMessage = async (req, res) => {
    let image;
  try {
    const { userId } = await req.auth(); // Get the authenticated user's ID from Clerk
    const { to_user_id, text } = req.body;
    image = req.file;

    if (!to_user_id || (!text && !image)) { 
      return res
        .status(400)
        .json({ error: "Recipient user ID and message are required" });
    }

    let media_url = "";
    let message_type = image ? "image" : "text";

    if (message_type === "image") {
      const stream = fs.createReadStream(image.path);

      const response = await imagekit.files.upload({
        file: stream,
        fileName: image.originalname,
      });

      media_url = imagekit.helper.buildSrc({
        src: response.url,
        transformation: [
          {
            width: 1280,
            quality: "auto",
            format: "webp",
          },
        ],
      });
    }

    const message = await MessageModel.create({
      from_user_id: userId,
      to_user_id,
      text,
      message_type,
      media_url,
    });

    // Send/Deliver the message to to_user_id using SSE
    const messageWithUserData = await MessageModel.findById(
      message._id,
    ).populate("from_user_id");

    if (connections[to_user_id]) {
      connections[to_user_id].write(
        `data: ${JSON.stringify(messageWithUserData)}\n\n`,
      );
    }

    res.status(201).json({ success: true, message });
  } catch (error) {
    console.error("🔴 Error in sendMessage controller:", error);
    res.status(500).json({ error: "Internal Server Error" });
  } finally {
    // 🧹 delete temporary file
    if (image?.path) {
      await fs.promises.unlink(image.path).catch(() => {});
    }
  }
};
