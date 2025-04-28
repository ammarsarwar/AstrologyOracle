import { Diamond } from "lucide-react";
import { useLocation } from "wouter";

export default function Header() {
  const [, navigate] = useLocation();

  return (
    <header className="bg-[#1e1e1e] px-4 py-3 flex justify-between items-center border-b border-gray-800">
      <div 
        className="flex items-center cursor-pointer" 
        onClick={() => navigate("/")}
      >
        <div className="mr-2 text-primary">
          <Diamond size={16} />
        </div>
        <h1 className="text-sm font-bold tracking-widest">SKY ACADEMY</h1>
      </div>
      <div>
        <button className="text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </button>
      </div>
    </header>
  );
}
