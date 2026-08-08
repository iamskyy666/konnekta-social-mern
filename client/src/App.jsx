import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import FeedPage from "./pages/FeedPage";
import MessagesPage from "./pages/MessagesPage";
import ChatBoxPage from "./pages/ChatBoxPage";
import ConnectionsPage from "./pages/ConnectionsPage";
import DiscoverPage from "./pages/DiscoverPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import Layout from "./pages/Layout";
import { useAuth, useUser } from "@clerk/react";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";

function App() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    //!💡 whenever our wbepage loads..
    const fetchData = async () => {
      const token = await getToken();
      dispatch(fetchUser(token));
    };
    fetchData();
  }, [getToken, user, dispatch]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={!user ? <LoginPage /> : <Layout />}>
          <Route index element={<FeedPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="messages/:userId" element={<ChatBoxPage />} />
          <Route path="connections" element={<ConnectionsPage />} />
          <Route path="discover" element={<DiscoverPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="profile/:profileId" element={<ProfilePage />} />
          <Route path="create-post" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

// 🕛 09:36:10
