import React from "react";
import SideBar from "./sideBar";

const DashLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar className="hidden md:block" /> {/* Sidebar */}
      <main className="flex-1 p-6 md:ml-64 pt-16 md:pt-6">{children}</main>
    </div>
  );
};

export default DashLayout;
