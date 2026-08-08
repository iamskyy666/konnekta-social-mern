import { Route, Routes, useLocation } from "react-router-dom";
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
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchUser } from "./features/user/userSlice";
import { fetchConnections } from "./features/connections/connectionsSlice";
import { addMessage } from "./features/messages/messagesSlice";

function App() {
  const { user } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // SSE
  const pathNameRef = useRef(pathname);

  // Keep the latest pathname inside the ref
  useEffect(() => {
    pathNameRef.current = pathname;
  }, [pathname]);

  // Fetch initial user + connections data
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const token = await getToken();

      dispatch(fetchUser(token));
      dispatch(fetchConnections(token));
    };

    fetchData();
  }, [getToken, user, dispatch]);

  // SSE connection
  useEffect(() => {
    if (!user) return;

    console.log(`🔵 Connecting to SSE for user: ${user.id}`);

    const eventSrc = new EventSource(
      `${import.meta.env.VITE_BASEURL}/api/v1/message/${user.id}`,
      // {
      //   withCredentials: true,
      // },
    );

    eventSrc.onopen = () => {
      console.log("🟢 SSE connection established");
    };

    eventSrc.onmessage = (event) => {
      try {
        console.log("📩 SSE message received:", event.data);

        const message = JSON.parse(event.data);

        if (
          pathNameRef.current ===
          `/messages/${message.from_user_id._id}`
        ) {
          dispatch(addMessage(message));
        } else {
          // TODO: Notification component
          console.log("🔔 New message notification:", message);
        }
      } catch (error) {
        console.error("🔴 Error processing SSE message:", error);
      }
    };

    eventSrc.onerror = (error) => {
      console.error("🔴 SSE connection error:", error);
    };

    return () => {
      console.log("🟡 Closing SSE connection");
      eventSrc.close();
    };
  }, [user, dispatch]);

  return (
    <>
      <Toaster />

      <Routes>
        <Route
          path="/"
          element={!user ? <LoginPage /> : <Layout />}
        >
          <Route index element={<FeedPage />} />

          <Route
            path="messages"
            element={<MessagesPage />}
          />

          <Route
            path="messages/:userId"
            element={<ChatBoxPage />}
          />

          <Route
            path="connections"
            element={<ConnectionsPage />}
          />

          <Route
            path="discover"
            element={<DiscoverPage />}
          />

          <Route
            path="profile"
            element={<ProfilePage />}
          />

          <Route
            path="profile/:profileId"
            element={<ProfilePage />}
          />

          <Route
            path="create-post"
            element={<CreatePostPage />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;

