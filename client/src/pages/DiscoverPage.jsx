import { useEffect, useState } from "react";
// import { dummyConnectionsData } from "../assets/assets";
import { Search } from "lucide-react";
import UserCard from "../components/UserCard";
import Loading from "../components/Loading";
import { toast } from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "@clerk/react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../features/user/userSlice";

function DiscoverPage() {
  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { getToken } = useAuth();

  const dispatch = useDispatch();

  const handleSearch = async (evt) => {
    if (evt.key === "Enter") {
      try {
        setUsers([]);
        setLoading(true);
        const { data } = await api.post(
          `/api/v1/user/discover`,
          { input },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
            },
          },
        );

        data.success ? setUsers(data.users) : toast.error(data.message);
        setLoading(false);
        setInput("");
      } catch (error) {
        console.log(`🔴 ERROR:`, error);
        toast.error(error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken().then((token) => dispatch(fetchUser(token)));
  }, [dispatch, getToken]);

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto p-6">
        {/* TITLE */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Discover People
          </h1>
          <p className="text-slate-600">
            Connect with amazing people and grow your network.
          </p>
        </div>
        {/* SEARCH */}
        <div className="mb-8 shadow-md rounded-md border border-slate-200/60 bg-white/80">
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                className="pl-10 sm:pl-12 py-2 w-full border border-gray-300 rounded-md max-sm:text-sm"
                type="text"
                placeholder="Search people by name, username, bio, or location..."
                onChange={(evt) => setInput(evt.target.value)}
                value={input}
                onKeyUp={handleSearch}
              />
            </div>
          </div>
        </div>
        {/* USER-CARD */}
        <div className="flex flex-wrap gap-6">
          {users.map((user) => (
            <UserCard key={user._id} user={user} />
          ))}
        </div>
        {loading && <Loading height="60vh" />}
      </div>
    </div>
  );
}

export default DiscoverPage;
