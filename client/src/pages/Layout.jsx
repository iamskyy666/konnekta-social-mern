import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { dummyUserData } from "../assets/assets";
import Loading from "../components/Loading";

export default function Layout() {
  const user = dummyUserData; // temp

  const [sideBarOpen, setSideBarOpen] = useState(false);

  //! display this page if user is logged-in

  return user ? (
    <div className="w-full flex h-screen">
      <SideBar />
      {/* RIGHT SIDE DIV */}
      <div className="flex-1 bg-slate-500">
        <Outlet />
      </div>
      {sideBarOpen ? (
        <X
          className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md sgadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSideBarOpen(false)}
        />
      ) : (
        <Menu
          className="absolute top-3 right-3 p-2 z-100 bg-white rounded-md sgadow w-10 h-10 text-gray-600 sm:hidden"
          onClick={() => setSideBarOpen(true)}
        />
      )}
    </div>
  ) : (
    <Loading />
  );
}
