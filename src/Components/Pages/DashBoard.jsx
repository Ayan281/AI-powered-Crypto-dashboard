import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar";

const DashBoard = ({
  data,
  setData,
  isVerified,
  setShowCaptcha,
  setPendingRoute,

}) => {
  const navigate = useNavigate();
  const focus = useRef(null);
  const inptFcs = () => {
    focus.current.focus();
  };
  useEffect(() => {
  if (!isVerified) {
    setPendingRoute("/dashboard");
    setShowCaptcha(true);
  }
}, [isVerified]);


  useEffect(() => {
    const fetchData = async () => {
      const url =
        "https://api.coingecko.com/api/v3/coins/markets" +
        "?vs_currency=usd" +
        "&order=market_cap_desc" +
        "&per_page=10" +
        "&page=1" +
        "&price_change_percentage=24h";

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "x-cg-api-key": import.meta.env.VITE_COINGECKO_API_KEY,
          },
        });

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // inptFcs();
  }, []);
  if (!data || data.length === 0)
    return (
        
      <div className="min-h-screen overflow-x-hidden    bg-[#050505] flex flex-col items-center justify-center relative z-50">
        
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-red-950/10 pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-8">
 
          <div className="relative w-16 h-16">
           
            <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />

           
            <div className="absolute inset-0 rounded-full border-[3px] border-t-red-600 border-r-transparent border-b-transparent border-l-transparent animate-spin" />

           
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-red-600 rounded-full shadow-[0_0_10px_#ef4444]" />
          </div>

        
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-white text-sm font-bold tracking-[0.3em] uppercase">
              Loading Asset Data
            </h2>

            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white/40 text-[10px] font-medium tracking-widest uppercase">
                Syncing with Exchange...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-red-500 flex flex-col">
      <NavBar
        isVerified={isVerified}
        setShowCaptcha={setShowCaptcha}
        setPendingRoute={setPendingRoute}
      />

      
      <div className="absolute top-0 -translate-x-1/2 left-1/4 w-[500px] h-[500px] bg-red-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-950/20 blur-[150px] pointer-events-none" />

      <main className="relative z-10 flex flex-col items-center pt-32 px-6 w-full max-w-[1400px] mx-auto">
    
        <div className="text-center mb-16">
          <span className="text-[10px] font-bold tracking-[0.4em] text-red-600 uppercase mb-4 block animate-pulse">
            Live Feed • 24H
          </span>
          <h1 className="text-5xl md:text-7xl font-medium tracking-tighter leading-none mb-4">
            Global{" "}
            <span className="text-white/30 italic font-light">Market</span> Data
          </h1>
        </div>

       
        <div className="relative group mb-20 w-full max-w-2xl">
          <div className="absolute -inset-[1px] bg-gradient-to-r from-red-600 via-red-900 to-red-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
          <div className="relative  flex-col lg:flex  lg:flex-row items-center bg-black border border-white/10 rounded-xl p-2 transition-all group-hover:border-white/20">
            <span className="hidden lg:pl-6 text-white/30">➜</span>
            <input
              ref={focus}
              type="text"
              placeholder="SEARCH TICKER (e.g. BTC)"
              className="flex-1 bg-transparent px-4 py-4 text-lg font-light placeholder-white/20 outline-none tracking-widest uppercase"
            />
            <button className="w-full lg:w-auto lg:ml-auto mt-4 lg:mt-0 px-10 py-3 bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition-all duration-300 rounded-lg">
              Search
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full pb-24">
          {data.map((coin) => {
            const isPositive = coin.price_change_percentage_24h >= 0;

            return (
              <div
                key={coin.id}
                onClick={() => navigate(`/dashboard/graph/${coin.id}`)}
                className="group relative p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent hover:border-red-500/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_40px_-10px_rgba(220,38,38,0.1)] overflow-hidden"
              >
              
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/0 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                  
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-white/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <img
                          src={coin.image}
                          alt={coin.name}
                          className="relative h-12 w-12 rounded-full grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold tracking-widest uppercase text-white group-hover:text-red-500 transition-colors">
                          {coin.symbol}
                        </h3>
                        <span className="text-[10px] text-white/40 tracking-wider uppercase block mt-1">
                          {coin.name}
                        </span>
                      </div>
                    </div>

                   
                    <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[9px] font-bold text-white/50 tracking-widest group-hover:border-white/20 group-hover:bg-white/10 transition-colors">
                      #{coin.market_cap_rank}
                    </span>
                  </div>

                 
                  <div className="mt-4">
                    <div className="text-3xl font-light tracking-tight mb-2 text-white/90 group-hover:text-white transition-colors">
                      ${coin.current_price.toLocaleString()}
                    </div>
                    <div
                      className={`flex items-center gap-2 text-xs font-bold tracking-widest ${
                        isPositive ? "text-emerald-400" : "text-red-500"
                      }`}
                    >
                      <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded">
                        {isPositive ? "▲" : "▼"}
                      </span>
                      {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                    </div>
                  </div>

                  
                  <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
                    <div className="flex justify-between items-center text-[10px] tracking-widest uppercase group-hover:text-white/80 transition-colors text-white/40">
                      <span>M.Cap</span>
                      <span className="font-medium">
                        ${(coin.market_cap / 1e9).toFixed(2)}B
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] tracking-widest uppercase group-hover:text-white/80 transition-colors text-white/40">
                      <span>Vol(24h)</span>
                      <span className="font-medium">
                        ${(coin.total_volume / 1e6).toFixed(0)}M
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default DashBoard;
