import fs from "fs";
import imagekit from "../configs/imageKit.js";
import StoryModel from "../models/story.model.js";
import UserModel from "../models/user.model.js";
import { inngest } from "../inngest/index.js";

//! Add User Story
export const addUserStory = async (req, res) => {
  let media;

  try {
    const { userId } = await req.auth();
    const { content, media_type, background_color } = req.body;

    media = req.file; // Get the uploaded media file from Multer

    let media_url = "";

    // upload media to ImageKit
    if (media_type === "image" || media_type === "video") {
      if (!media) {
        return res.status(400).json({
          success: false,
          message: "Media file is required",
        });
      }

      const stream = fs.createReadStream(media.path);

      const response = await imagekit.files.upload({
        file: stream,
        fileName: media.originalname,
      });

      //🔵 ImageKit upload successful
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

    //🔔 schedule story deletion after 24 hours using Inngest
    await inngest.send({
      name: "app/story.delete",
      data: { storyId: story._id },
    });

    return res.status(201).json({
      success: true,
      data: story,
    });
  } catch (error) {
    console.error("🔴 ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    // 🧹 Always remove the temporary Multer file
    if (media?.path) {
      await fs.promises.unlink(media.path).catch(() => {});
    }
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
    const userIds = [userId, ...user.connections, ...user.following]; // Include the user's own ID, connections, and following users
    const stories = await StoryModel.find({ user: { $in: userIds } })
      .sort({ createdAt: -1 })
      .populate("user");
    res.status(200).json({ success: true, stories });
  } catch (error) {
    console.error("🔴 ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
