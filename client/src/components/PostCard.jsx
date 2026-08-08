import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react";
import moment from "moment";
import { useState } from "react";
// import { dummyUserData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "@clerk/react";
import api from "../api/axios";
import { toast } from "react-hot-toast";

const PostCard = ({ post }) => {
  const [likes, setLikes] = useState(post.likes_count);
  const currentUser = useSelector((state) => state.user.value); // from redux
  const postWithHashTags = post.content.replace(
    /(#\w+)/g,
    "<span class='text-indigo-600'>$1</span>",
  );

  const { getToken } = useAuth();

  async function handleLike() {
    try {
      const { data } = await api.post(
        `/api/v1/post/like`,
        { postId: post._id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setLikes((prev) => {
          if (prev.includes(currentUser._id)) {
            return prev.filter((id) => id !== currentUser._id);
          } else {
            return [...prev, currentUser._id];
          }
        });
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(`🔴 ERROR:`, error);
      toast.error(error.message);
    }
  }

  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow p-4 spae-y-4 w-full max-w-2xl">
      {/* USER INFO. */}
      <div
        className="inline-flex items-center gap-3 cursor-pointer"
        onClick={() => navigate(`/profile/${post.user._id}`)}>
        <img
          src={post.user.profile_picture}
          alt="user-profile-image"
          className="w-10 h-10 rounded-full shadow"
        />
        <div className="">
          <div className="flex items-center space-x-1">
            <span className="">{post.user.full_name}</span>
            <BadgeCheck className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.username}▪️{moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>
      {/* CONTENT */}
      {post.content && (
        <div
          className="text-gray-800 text-sm whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: postWithHashTags }}
        />
      )}
      {/* IMAGES */}
      <div className="grid grid-cols-2 gap-2">
        {post.image_urls.map((image, idx) => (
          <img
            src={image}
            key={idx}
            alt="post-image"
            className={`w-full h-48 object-cover rounded-lg ${post.image_urls.length === 1 && "col-span-2 h-auto"}`}
          />
        ))}
      </div>

      {/* ACTION BTNS. */}
      <div className="flex items-center gap-4 text-gray-600 text-sm pt-2 border-t border-gray-300">
        <div className="flex items-center gap-1">
          <Heart
            onClick={handleLike}
            className={`w-4 h-4 cursor-pointer ${likes.includes(currentUser._id) && "text-red-500 fill-red-500"}`}
          />
          <span>{likes.length}</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="w-4 h-4" />
          <span>{12}</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 className="w-4 h-4" />
          <span>{7}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
