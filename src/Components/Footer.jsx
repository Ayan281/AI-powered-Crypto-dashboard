import React from "react";

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-32 pb-12 overflow-hidden">

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full flex flex-col items-center pointer-events-none">
  
        <div
          className="w-[600px] h-[300px] rounded-t-full relative z-10"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 100%, #450a0a 0deg, #E31E24 45deg, #f87171 90deg, #7f1d1d 150deg, #450a0a 180deg)",
            boxShadow: "0 -20px 50px rgba(227, 30, 36, 0.3)",
          }}
        >
          <div className="absolute inset-x-0 top-8 flex justify-center">
            <span className="text-[14px] font-bold tracking-[0.8em] text-red-200/40 uppercase">
              New Standard
            </span>
          </div>
        </div>


        <h2 className="text-[18vw] font-black tracking-tighter leading-none text-white/10 mt-[-150px] z-20 select-none">
          By AyanAzmi
        </h2>
      </div>

      <div className="relative z-30 max-w-7xl mx-auto px-16">
        <div className="flex justify-between items-start mb-40">
          <div className="max-w-md">
            <span className="text-red-600 text-[10px] font-bold tracking-widest uppercase mb-6 block">
              Let's Invest
            </span>
            <h3 className="text-6xl font-medium tracking-tight leading-tight mb-8">
              The Future of <br />
              <span className="italic font-light">Digital</span> Liquidity{" "}
              <br />
              Starts Now.
            </h3>
            <p className="text-white/50 text-sm max-w-[240px] leading-relaxed">
              Stronger markets. Smarter stability. Powered by AI.
            </p>
          </div>

          <div className="flex flex-col gap-6 items-end pt-12">
            <a
              href="#"
              className="group flex items-center gap-2 text-[11px] font-bold tracking-[0.2em] uppercase"
            >
              Whitepaper{" "}
              <span className="rotate-45 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                ↑
              </span>
            </a>
            <a
              href="#"
              className="text-[11px] font-bold tracking-[0.2em] uppercase border-b-2 border-red-600 pb-1 hover:text-red-500 transition-colors"
            >
              Join Early Access
            </a>
          </div>
        </div>

        
        <div className="flex justify-between items-center border-t border-white/10 pt-8">
          <div className="flex gap-8 text-[11px] text-white/40 uppercase tracking-widest font-medium">
            <a href="#" className="hover:text-white transition-colors">
              About Us
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Pricing
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Blog
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="italic font-bold opacity-90 text-2xl font-black tracking-tighter text-red-600 text-2xl font-black tracking-tighter text-red-600 mr-8">
              CorruptCurrency
            </div>
            <button className="bg-red-950/30 border border-red-900/50 rounded-full px-6 py-2 flex items-center gap-3 hover:bg-red-600 transition-all group">
              <span className="text-[14px] text-red-500 group-hover:text-white">
                📞
              </span>
              <span className="text-[10px] font-bold tracking-widest uppercase">
                Contact Us
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
