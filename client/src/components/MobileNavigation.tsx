import { useLocation } from "wouter";
import { Home, Search, Heart, User } from "lucide-react";

export default function MobileNavigation() {
  const [location, navigate] = useLocation();

  return (
    <nav className="md:hidden bg-[#1e1e1e] border-t border-gray-800 p-2">
      <div className="flex justify-around">
        <button 
          className={`p-2 text-white rounded-full ${location === '/' ? 'bg-[#1a1a1a]' : ''}`}
          onClick={() => navigate("/")}
        >
          <Home size={20} />
        </button>
        <button className="p-2 text-white rounded-full">
          <Search size={20} />
        </button>
        <button 
          className="p-2 text-white rounded-full"
          onClick={() => navigate("/favorites")}
        >
          <Heart size={20} />
        </button>
        <button className="p-2 text-white rounded-full">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}
