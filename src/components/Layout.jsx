import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import React from "react";
function Layout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
