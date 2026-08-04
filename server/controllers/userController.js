import imagekit from "../configs/imageKit.js";
import UserModel from "../models/user.model.js";
import fs from "fs";

//! Get User Data using userId
export const getUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
     console.error("🔴 ERROR:", error);

     return res.status(500).json({
       success: false,
       message: "Internal Server Error",
     });
  }
};

//! Update User Data using userId
export const updateUserData = async (req, res) => {
  let profile;
  let cover;

  try {
    const { userId } = await req.auth();
    let { username, bio, location, full_name } = req.body;

    const temp_user = await UserModel.findById(userId);

    // !username && (username = temp_user.username);

    // REFACTORED: Ensure authenticated user exists
    if (!temp_user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // REFACTORED: Use existing username if none was provided
    if (!username) {
      username = temp_user.username;
    }

    if (temp_user.username !== username) {
      const user = await UserModel.findOne({ username });

      if (user) {
        // we won't change the username if it's already taken
        // username = temp_user.username;

        // OR return a conflict response instead:
        return res.status(409).json({
          success: false,
          message: "Username already exists",
        });
      }
    }

    const updatedUser = {
      username,
      bio: bio ?? temp_user.bio,
      location: location ?? temp_user.location,
      full_name: full_name ?? temp_user.full_name,
    };

    profile = req.files?.profile?.[0];
    cover = req.files?.cover?.[0];

    // upload profile image
    if (profile) {
      const stream = fs.createReadStream(profile.path);

      const response = await imagekit.files.upload({
        file: stream,
        fileName: profile.originalname,
      });

      const url = imagekit.helper.buildSrc({
        src: response.url,
        transformation: [
          {
            width: 512,
            quality: "auto",
            format: "webp",
          },
        ],
      });

      updatedUser.profile_picture = url;
    }

    // upload cover image
    if (cover) {
      const stream = fs.createReadStream(cover.path);

      const response = await imagekit.files.upload({
        file: stream,
        fileName: cover.originalname,
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

      updatedUser.cover_photo = url;
    }

    // save the updated data
    const user = await UserModel.findByIdAndUpdate(userId, updatedUser, {
      returnDocument: "after",
      runValidators: true,
    });

    return res.json({
      success: true,
      user,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    console.log("🔴 ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    if (profile?.path) {
      await fs.promises.unlink(profile.path).catch(() => {});
    }

    if (cover?.path) {
      await fs.promises.unlink(cover.path).catch(() => {});
    }
  }
};

//! Find Users using username, email, location, name
export const discoverUsers = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { input } = req.body;

    const allUsers = await UserModel.find({
      $or: [
        { username: new RegExp(input, "i") },
        { email: new RegExp(input, "i") },
        { full_name: new RegExp(input, "i") },
        { location: new RegExp(input, "i") },
      ],
    });

    const filteredUsers = allUsers.filter(
      (user) => user._id.toString() !== userId,
    );
    return res.json({ success: true, users: filteredUsers });
  } catch (error) {
   console.error("🔴 ERROR:", error);

   return res.status(500).json({
     success: false,
     message: "Internal Server Error",
   });
  }
};

//! Follow User
export const followUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (id === userId) {
      return res.status(400).json({
        success: false,
        message: "You cannot follow yourself.",
      });
    }

    if (user.following.includes(id)) {
      return res.status(400).json({
        success: false,
        message: "You are already following this user!",
      });
    }

    user.following.push(id);

    const toUser = await UserModel.findById(id); // other user
    if (!toUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    toUser.followers.push(userId);

    await Promise.all([user.save(), toUser.save()]);

    return res.json({
      success: true,
      message: "Now you're following this user!",
    });
  } catch (error) {
    console.error("🔴 ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

//! Unfollow User
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.following = user.following.filter(
      (followingId) => followingId.toString() !== id,
    );

    // Other user
    const toUser = await UserModel.findById(id); // other user
    if (!toUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    toUser.followers = toUser.followers.filter(
      (followerId) => followerId.toString() !== userId,
    );

    await Promise.all([user.save(), toUser.save()]);

    return res.json({
      success: true,
      message: "You're no longer following this user!",
    });
  } catch (error) {
     console.error("🔴 ERROR:", error);

     return res.status(500).json({
       success: false,
       message: "Internal Server Error",
     });
  }
};
