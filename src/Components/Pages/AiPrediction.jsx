import React, { useEffect, useRef, useState } from "react";
import NavBar from "../NavBar";

const AiPrediction = () => {
  const [data, setData] = useState(null);
  const [inpt, setInpt] = useState("BTCUSDT");
  const refInput = useRef(null);
 
  

  const fetchData = async (ticker) => {
    if (!ticker) return;
    const url = `https://real-time-crypto-price-api.p.rapidapi.com/v1/crypto/ai-based-analysis/trading-signal-analysis?ticker=${ticker}&market=BINANCE&interval=1D`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
        "x-rapidapi-host": "real-time-crypto-price-api.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
      setData(null);
    }
  };

  useEffect(() => {
    fetchData(inpt);
    refInput.current?.focus();
  }, []);
  const getRecColor = (rec) => {
    if (!rec) return "text-white";
    const r = rec.toUpperCase();
    if (r.includes("BUY")) return "text-emerald-400";
    if (r.includes("SELL")) return "text-red-500";
    if (r.includes("HOLD")) return "text-yellow-500";
    return "text-white";
  };
  const getRsiColor = (rsi) => {
    if (!rsi) return "text-white";
    if (rsi < 30) return "text-emerald-400";
    if (rsi > 70) return "text-red-500";
    return "text-yellow-400";
  };
  const getMacdColor = (macd) => {
    if (macd === undefined || macd === null) return "text-white";
    if (macd > 0) return "text-emerald-400";
    if (macd < 0) return "text-red-500";
    return "text-yellow-400";
  };
  const getSmaColor = (sma50, sma200) => {
    if (!sma50 || !sma200) return "text-white";
    return sma50 > sma200 ? "text-emerald-400" : "text-red-500";
  };

  return (
    <div className="min-h-screen bg-black text-white relative font-sans selection:bg-red-500 flex flex-col">
      <NavBar />

    
      <div className="absolute top-20 left-0 w-[500px] h-[500px] bg-red-600/10 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[150px] pointer-events-none" />

      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 py-20">
        <div className="w-full max-w-5xl">
         
          <div className="mb-12">
            <span className="block text-[10px] font-bold tracking-[0.4em] text-red-600 uppercase mb-4">
              AI Analysis Engine
            </span>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight leading-none">
              Market{" "}
              <span className="text-white/30 italic font-light">
                Intelligence
              </span>
            </h1>
          </div>

         
          <div className="relative group mb-16">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-900 rounded-lg blur opacity-20 group-focus-within:opacity-50 transition duration-500" />

            <div className="relative flex-col md:flex  md:flex-row items-center bg-black border border-white/10 rounded-lg p-2">
              <input
              ref={refInput}
                type="text"
                value={inpt}
                onChange={(e) => setInpt(e.target.value.toUpperCase())}
                placeholder="ENTER TICKER (e.g. BTCUSDT)"
                className="flex-1 bg-transparent px-6 py-4 text-xl md:text-2xl font-light placeholder-white/20 outline-none tracking-widest uppercase"
                onKeyDown={(e) => e.key === "Enter" && fetchData(inpt)}
              />

              <button
                onClick={() => fetchData(inpt)}
                className="w-full md:w-auto md:ml-auto mt-4 md:mt-0 px-8 py-4 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Analyze
              </button>
            </div>
          </div>


          {data?.data ? (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Main Recommendation Card */}
              <div className="col-span-12 md:col-span-6 p-10 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm flex flex-col justify-between relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-32 bg-red-600/10 blur-[80px] group-hover:bg-red-600/20 transition-all duration-500" />

                <div>
                  <h3 className="text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2">
                    AI Verdict
                  </h3>
                  <div
                    className={`text-6xl md:text-7xl font-black tracking-tighter ${getRecColor(data.data.recommendation)}`}
                  >
                    {data.data.recommendation || "NEUTRAL"}
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] tracking-widest text-red-400 uppercase">
                    Live Analysis
                  </span>
                </div>
              </div>

             
              <div className="col-span-12 md:col-span-6 grid grid-cols-2 gap-6">
                {/* RSI */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-center hover:border-red-600/30 transition-colors">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                    RSI Strength
                  </span>
                  <span
                    className={`text-3xl font-light ${getRsiColor(data.data.latest_values?.rsi)}`}
                  >
                    {data.data.latest_values?.rsi?.toFixed(2) || "—"}
                  </span>
                </div>

                {/* MACD */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-center hover:border-red-600/30 transition-colors">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                    MACD
                  </span>
                  <span
                    className={`text-xl md:text-3xl font-light ${getMacdColor(data.data.latest_values?.macd)}`}
                  >
                    {data.data.latest_values?.macd?.toFixed(4) || "—"}
                  </span>
                </div>

                {/* SMA 50 */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-center hover:border-red-600/30 transition-colors">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                    SMA (50)
                  </span>
                  <span
                    className={`text-xl md:text-3xl font-light ${getSmaColor(data.data.latest_values?.sma_50, data.data.latest_values?.sma_200)}`}
                  >
                    {data.data.latest_values?.sma_50?.toFixed(2) || "—"}
                  </span>
                </div>

                {/* SMA 200 */}
                <div className="p-6 rounded-2xl border border-white/10 bg-white/[0.02] flex flex-col justify-center hover:border-red-600/30 transition-colors">
                  <span className="text-[10px] tracking-[0.2em] uppercase text-white/40 mb-2">
                    SMA (200)
                  </span>
                  <span
                    className={`text-xl md:text-3xl font-light ${getSmaColor(data.data.latest_values?.sma_50, data.data.latest_values?.sma_200)}`}
                  >
                    {data.data.latest_values?.sma_200?.toFixed(2) || "—"}
                  </span>
                </div>
              </div>
            </div>
          ) : (
          
            <div className="border border-dashed border-white/10 rounded-2xl h-[300px] flex flex-col items-center justify-center text-white/20">
              <span className="text-4xl mb-4 opacity-50">⊹</span>
              <p className="text-sm tracking-widest uppercase">
                Enter a ticker to initialize scan
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AiPrediction;
