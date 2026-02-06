import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ isVerified, setShowCaptcha, setPendingRoute }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleProtectedNav = (path) => {
    if (isVerified) {
      navigate(path);
    } else {
      setPendingRoute(path);
      setShowCaptcha(true);
    }
    setMenuOpen(false);
  };

  return (
    <nav className="absolute top-0 w-full z-50 text-white">
      
      <div className="flex items-center justify-between px-4 py-4 md:px-12 md:py-6 text-sm">

        
        <div className="hidden md:flex space-x-4 md:space-x-8 opacity-80">
          <Link to="/" className="text-lg hover:text-red-500 transition">
            Home
          </Link>

          <button
            onClick={() => handleProtectedNav("/dashboard")}
            className="text-lg hover:text-red-500 transition"
          >
            Dashboard
          </button>

          <Link to="/community" className="text-lg hover:text-red-500 transition">
            Community
          </Link>
        </div>

        
        <div className="text-2xl font-black tracking-tighter text-red-600">
          CorruptCurrency
        </div>

        
        <div className="hidden md:block">
          <Link to="/aiprediction">
            <button className="border border-white/20 rounded-full px-5 py-2 flex items-center gap-2 hover:bg-white hover:text-black transition duration-300">
              <span className="text-[10px] rotate-45">↑</span>
              AiPrediction
            </button>
          </Link>
        </div>

        
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-sm w-full flex flex-col items-center gap-6 py-6 text-lg">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          <button onClick={() => handleProtectedNav("/dashboard")}>
            Dashboard
          </button>

          <Link to="/community" onClick={() => setMenuOpen(false)}>
            Community
          </Link>

          <Link to="/aiprediction" onClick={() => setMenuOpen(false)}>
            AiPrediction
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
