import React, { useState, useRef } from "react";
import NavBar from "./NavBar";
import Features from "./Features";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const HomePage = ({ isVerified, setShowCaptcha, setPendingRoute }) => {
 
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [shine, setShine] = useState({ x: 50, y: 50 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    
    
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

   
    const rotateX = (y / (rect.height / 2)) * -15;
    const rotateY = (x / (rect.width / 2)) * 15;

  
    const shineX = ((e.clientX - rect.left) / rect.width) * 100;
    const shineY = ((e.clientY - rect.top) / rect.height) * 100;

    setRotate({ x: rotateX, y: rotateY });
    setShine({ x: shineX, y: shineY });
  };

  const handleMouseLeave = () => {
   
    setRotate({ x: 0, y: 0 });
    setShine({ x: 50, y: 50 });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white relative font-sans selection:bg-red-500">
      <NavBar
        isVerified={isVerified}
        setShowCaptcha={setShowCaptcha}
        setPendingRoute={setPendingRoute} />

      <main className="relative z-10 pt-32 flex flex-col items-center min-h-screen">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-red-400/30 blur-[150px] pointer-events-none" />

        <div className="text-center z-20 mb-10">
          <h1 className="text-7xl md:text-[110px] font-medium tracking-tighter leading-[0.9] text-white">
            New AI Standard <br />
            <span className="italic font-extralight opacity-90">Digital Liquidity</span>
          </h1>
        </div>

        <div className="relative w-full max-w-7xl flex items-center justify-center lg:justify-between px-6 md:px-16 mt-[-20px]">

          {/* Left Column */}
          <div className="w-full md:w-1/4 flex flex-col gap-8 md:gap-12 items-center md:items-start">

            <div className="hidden md:block relative w-25 h-25 md:w-28 md:h-28">

              <div className="absolute inset-0 border border-dashed border-white/20 rounded-full animate-spin-slow" />
              <Link to ="/dashboard">
              <button>
              <div className=" absolute inset-0 flex items-center justify-center text-center p-4">
                <span className="text-[9px]  md:text-[8px] uppercase tracking-widest leading-tight">Check Now..</span>
              </div></button></Link>

            </div>
            <div className="hidden md:flex flex-col gap-5 items-start">

              <a href="#" className="group text-[10px] pr-[20px]md:text-[15px] font-bold tracking-[0.2em] uppercase">
                Check Now <span className="rotate-45 inline-block group-hover:translate-x-1 transition-transform">↑</span>
              </a>
              <a href="#" className="text-[11px] font-bold tracking-[0.2em] uppercase border-b-2 border-red-600 pb-1">
                Join Early Access
              </a>
            </div>
          </div>

          {/*COIN */}
          <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative  group cursor-pointer perspective-1000"
            style={{ perspective: "1200px" }}
          >
          
            <div 
              className="absolute inset-0 bg-red-600 rounded-full blur-[100px] opacity-40 transition-opacity duration-500 group-hover:opacity-70"
              style={{
                transform: `translate3d(${rotate.y * 2}px, ${rotate.x * 2}px, -50px)`
              }}
            />
            
            <div 
              className="relative  w-[400px] h-[400px]  md:w-[500px] md:h-[500px] rounded-full border-b-[12px] border-red-950 shadow-2xl flex items-center justify-center overflow-hidden transition-transform duration-200 ease-out"
              style={{
                transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
                background: 'conic-gradient(from 180deg at 50% 50%, #450a0a 0deg, #E31E24 45deg, #f87171 90deg, #7f1d1d 150deg, #450a0a 180deg, #E31E24 220deg, #ef4444 270deg, #7f1d1d 310deg, #450a0a 360deg)'
              }}
            >
              
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, white 0%, transparent 60%)`,
                }}
              />

              <div className="absolute inset-4 rounded-full border-[1px] border-white/20 shadow-inner" />
              <div className="text-center z-10 select-none">
                <span className="block text-[8px] md:text-[12px] tracking-[0.6em] font-bold text-red-200/60 mb-4 uppercase">New Standard</span>
                <h2 className="text-[100px] md:text-[150px] font-black tracking-tighter text-red-950 leading-none drop-shadow-2xl">$Coin</h2>
              </div>
            </div>
          </div>

          
        <div className="hidden lg:flex lg:w-1/4 flex-col items-end text-right gap-12">

            <p className="text-[13px] text-white/50 leading-relaxed max-w-[220px]">
              Built for the next era of crypto utility. AI-enhanced, stability-first, and optimized for real-world adoption.
            </p>
            <div className="flex items-center gap-6">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">Limit Early Access</span>
                  <span className="text-3xl font-bold tracking-tighter">85%</span>
               </div>
               <div className="relative w-14 h-14">
                  <svg className="w-full h-full -rotate-90">
                    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-white/10" />
                    <circle cx="28" cy="28" r="24" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="150" strokeDashoffset="30" className="text-white opacity-80" />
                  </svg>
               </div>
            </div>
          </div>
        </div>

       
        <div className="absolute bottom-0 w-full grid-cols-2 grid md:grid-cols-4 border-t border-white/10 bg-gradient-to-t from-red-600/70 to-transparent backdrop-blur-lg">
          {[{ label: "Early Access Holders", value: "50K+" }, { label: "Supported Networks & Assets", value: "100+" }, { label: "Liquidity Under AI Monitoring", value: "$500M+" }, { label: "Only 2 Millions Coins", value: "2M+" }].map((stat, idx) => (
            <div key={idx} className="p-8 border-r border-white/5 last:border-0 flex flex-col items-center justify-center hover:bg-white/5 transition-colors cursor-default">
              <span className="text-3xl font-bold mb-1">{stat.value}</span>
              <span className="text-[10px] text-white/50 uppercase tracking-widest text-center">{stat.label}</span>
            </div>
          ))}
        </div>
      </main>

      <Features />
      <Footer />

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;