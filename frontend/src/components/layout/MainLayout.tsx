import Navbar from "@/components/layout/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <Outlet />
    </div>
  );
}