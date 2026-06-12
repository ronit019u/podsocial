import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, MessageCircleMore, Mic, Radio } from "lucide-react";
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="w-full px-5 py-4 border-b border-gray-800 bg-gray-900 sticky top-0 z-50">
      <div className="flex items-center justify-between mx-auto">
        <div className=" flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Mic className="w-5 h-5 border-b text-blue-500 border-blue-500"/>
          <span className="text-white font-semibold text-lg hidden md:block ml-3">PodSocial</span>
        </div>
        <div className="flex items-center gap-1 md:gap-1">
        {user ? (
          <>
            <span className="text-gray-200 text-sm ">Hello, {user.name}</span>
            <Button 
            variant="ghost" 
            className="text-gray-300" 
            onClick={() => navigate("/podcast")}>
              <Radio />
              <span className="hidden md:block">Share Podcast </span>
              </Button>
            <Button variant="ghost"className="text-gray-300" onClick={() => navigate("/chat")}>
              <MessageCircleMore  />
               <span className="hidden md:block">Chats</span>
              </Button>
            <Button variant="ghost" className="text-red-400 hover:text-red-500"  onClick={handleLogout}>
              <LogOut />
              <span className="hidden md:block">Log Out</span>
              </Button>
          </>
        ) : (
          <>
            <Button variant="ghost" className="text-gray-300 hover:text-blue-500" onClick={() => navigate("/login")}>Login</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-blue-500" onClick={() => navigate("/register")}>Register</Button>
          </>
        )}
        </div>
      </div>
      
    </nav>
    
  );
}