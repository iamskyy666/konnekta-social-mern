import fs from "fs";
import imagekit from "../configs/imageKit.js";
import StoryModel from "../models/story.model.js";
import UserModel from "../models/user.model.js";

//! Add User Story
export const addUserStory = async (req, res) => {
  try {
    const { userId } = await req.auth(); // Get the authenticated user's ID from Clerk
    const { content, media_type, background_color } = req.body;
    const media = req.file ? req.file.path : null; // Assuming we're using multer for file uploads
    let media_url = "";

    // upload media to imagekit
    if (media_type === "image" || media_type === "video") {
      const stream = fs.createReadStream(media.path);
      const response = await imagekit.files.upload({
        file: stream,
        fileName: media.originalname,
      });
      //🔵 also we can optimize the media using imagekit's optimization features if needed
      media_url = response.url;
    }

    // create story
    const story = await StoryModel.create({
      user: userId,
      content,
      media_url,
      media_type,
      background_color,
    });
    res.status(201).json({ success: true, data: story });
  } catch (error) {
    console.error("🔴 ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//! Get User Stories
export const getUserStories = async (req, res) => {
  try {
    const { userId } = await req.auth(); // Get the authenticated user's ID from Clerk
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const userIds = [userId, user.connections, ...user.following]; // Get the user's connections and following users
    const stories = await StoryModel.find({ user: { $in: userIds } })
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(200).json({ success: true, stories });
  } catch (error) {
    console.error("🔴 ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

