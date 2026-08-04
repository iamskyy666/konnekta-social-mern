import imagekit from "../configs/imageKit.js";
import UserModel from "../models/user.model.js";
import fs from "fs";

//! Get User Data using userId
export const getUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    return res.json({ success: true, user });
  } catch (error) {
    console.log(`🔴 ERROR:`, error);
    return res.json({ success: false, message: error.message });
  }
};

//! Update User Data using userId
export const updateUserData = async (req, res) => {
  try {
    const { userId } = await req.auth();
    let { username, bio, location, full_name } = req.body;
    const temp_user = await UserModel.findById(userId);

    // !username && (username = temp_user.username);

    // REFACTORED: Use existing username if none was provided
    if (!username) {
      username = temp_user.username;
    }

    if (temp_user.username !== username) {
      const user = await UserModel.findOne({ username });
      if (user) {
        // we won't change the username if it's already taken
        username = temp_user.username;
      }
    }

    // REFACTORED: Ensure authenticated user exists
    if (!temp_user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const updatedUser = {
      username,
      bio,
      location,
      full_name,
    };

    // const profile = req.files.profile && req.files.profile[0];
    // const cover = req.files.cover && req.files.cover[0];

    const profile = req.files?.profile?.[0];
    const cover = req.files?.cover?.[0];

    // upload image online, using imagekit.
    if (profile) {
      // const buffer = fs.readFileSync(profile.path);
      const stream = fs.createReadStream(profile.path);

      // If you have access to Node `fs` we recommend using `fs.createReadStream()`:
      const response = await imagekit.files.upload({
        // file: buffer,
        file: stream,
        fileName: profile.originalname,
      });

      // REFACTORED: Remove temporary file after successful upload
      await fs.promises.unlink(profile.path);

      //   const url = imagekit.helper.buildSrc({
      //     path: response.filePath,

      //     transformation: [
      //       {
      //         width: 512,
      //         quality: "auto",
      //         format: "webp",
      //       },
      //     ],
      //   });
      const url = imagekit.helper.buildSrc({
        // REFACTORED: Latest ImageKit SDK uses `src` instead of `path`
        src: response.filePath,

        transformation: [
          {
            width: 512,
            quality: "auto",
            format: "webp",
          },
        ],
      });
      console.log(response.filePath);
      updatedUser.profile_picture = url;
    }

    // upload cover-pic
    if (cover) {
      // const buffer = fs.readFileSync(cover.path);
      const stream = fs.createReadStream(cover.path);

      // If you have access to Node `fs` we recommend using `fs.createReadStream()`:
      const response = await imagekit.files.upload({
        // file: buffer,
        file: stream,
        fileName: cover.originalname,
      });

      // REFACTORED: Remove temporary file after successful upload
      await fs.promises.unlink(cover.path);

      //   const url = imagekit.helper.buildSrc({
      //     path: response.filePath,

      //     transformation: [
      //       {
      //         width: 1280,
      //         quality: "auto",
      //         format: "webp",
      //       },
      //     ],
      //   });

      const url = imagekit.helper.buildSrc({
        // REFACTORED: Latest ImageKit SDK uses `src` instead of `path`
        src: response.filePath,

        transformation: [
          {
            width: 1280,
            quality: "auto",
            format: "webp",
          },
        ],
      });
      console.log(response.filePath);
      updatedUser.cover_photo = url;
    }

    // save the updated data
    const user = await UserModel.findByIdAndUpdate(userId, updatedUser, {
      new: true,
    });

    res.json({ success: true, user, message: "Profile updated successfully!" });
  } catch (error) {
    console.log(`🔴 ERROR:`, error);
    return res.json({ success: false, message: error.message });
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

    const filteredUsers = allUsers.filter((user) => user._id !== userId);
    return res.json({ success: true, users: filteredUsers });
  } catch (error) {
    console.log(`🔴 ERROR:`, error);
    return res.json({ success: false, message: error.message });
  }
};

//! Follow User
export const followUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const user = await UserModel.findById(userId);

    if (user.following.includes(id)) {
      return res.json({
        success: false,
        message: "You are already following this user!",
      });
    }

    user.following.push(id);

    await user.save();

    const toUser = await UserModel.findById(id); // other user
    toUser.followers.push(userId);

    await toUser.save();

    return res.json({
      success: true,
      message: "Now you're following this user!",
    });
  } catch (error) {
    console.log(`🔴 ERROR:`, error);
    return res.json({ success: false, message: error.message });
  }
};

//! Unfollow User
export const unfollowUser = async (req, res) => {
  try {
    const { userId } = await req.auth();
    const { id } = req.body;

    const user = await UserModel.findById(userId);

    user.following = user.following.filter((user) => user !== id);

    await user.save();

    // Other user
    const toUser = await UserModel.findById(id); // other user
    toUser.followers = toUser.followers.filter((user) => user !== userId);
    await toUser.save();

    return res.json({
      success: true,
      message: "You're no longer following this user!",
    });
  } catch (error) {
    console.log(`🔴 ERROR:`, error);
    return res.json({ success: false, message: error.message });
  }
};
