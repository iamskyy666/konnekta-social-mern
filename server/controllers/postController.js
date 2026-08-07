import imagekit from "../configs/imageKit.js";
import PostModel from "../models/post.model.js";
import UserModel from "../models/user.model.js";
import fs from "fs";

//! Add Post
export const addPost = async (req, res) => {
  try {
    const { userId } = await req.auth(); // from Clerk auth middleware
    const { content, post_type } = req.body;
    const images = req.files;

    let image_urls = [];
    if (images && images.length) {
      image_urls = await Promise.all(
        images.map(async (image) => {
          // convert to buffer
          const fileBuffer = fs.readFileSync(image.path);
          const response = await imagekit.files.upload({
            file: fileBuffer,
            fileName: image.originalname,
            folder: "posts",
          });

          const url = imagekit.helper.buildSrc({
            src: response.url,
            transformation: [
              {
                width: 1280,
                quality: "auto",
                format: "webp",
              },
            ],
          });
          await fs.promises.unlink(image.path);
          return url;
        }),
      );
    }

    await PostModel.create({
      user: userId,
      content,
      image_urls,
      post_type,
    });

    res
      .status(201)
      .json({ success: true, message: "Post created successfully" });
  } catch (error) {
    console.error("Error adding post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//! Get Posts
export const getPosts = async (req, res) => {
  try {
    const { userId } = await req.auth(); // from Clerk auth middleware
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // User connections and followings
    const userIds = [userId, ...user.connections, ...user.following];
    const posts = await PostModel.find({ user: { $in: userIds } })
      .sort({ createdAt: -1 })
      .populate("user", "full_name username profile_picture")
      .lean();

    res.status(200).json({ success: true, posts });
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//! Like Post
export const likePost = async (req, res) => {
  try {
    const { userId } = await req.auth(); // from Clerk auth middleware
    const { postId } = req.body;

    const post = await PostModel.findById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    if (post.likes_count.includes(userId)) {
      // unlike the post
      post.likes_count = post.likes_count.filter((id) => id !== userId);
      await post.save();
      res.status(200).json({ success: true, message: "Post unliked" });
    } else {
      // like the post
      post.likes_count.push(userId);
      await post.save();
      res.status(200).json({ success: true, message: "Post liked" });
    }
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
