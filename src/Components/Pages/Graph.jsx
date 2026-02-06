import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LineChart from "./LineChart";
import NavBar from "../NavBar";

const Graph = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}?market_data=true&sparkline=true`,
        );
        const data = await res.json();
        setCoin(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCoin();
  }, [id]);

  const [graphData, setGraphData] = useState(null);

  useEffect(() => {
    const fetchGraph = async () => {
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`,
        );
        const data = await res.json();

        const chartData = {
          labels: data.prices.map((p) => new Date(p[0]).toLocaleDateString()),
          datasets: [
            {
              label: "Price (USD)",
              data: data.prices.map((p) => p[1]),
              borderColor: "#ff2e2e",
              backgroundColor: "rgba(255, 46, 46, 0.1)",
              borderWidth: 3,
              pointRadius: 0,
              pointHoverRadius: 6,
              tension: 0.4,
              yAxisID: "crypto1",
            },
            {
              label: "Market Cap",
              data: data.market_caps.map((p) => p[1]),
              borderColor: "#06b6d4",
              backgroundColor: "rgba(6, 182, 212, 0.1)",
              borderWidth: 3,
              pointRadius: 0,
              tension: 0.4,
              yAxisID: "crypto2",
              yAxisLabel: "Y-Axis",
            },
          ],
        };

        setGraphData(chartData);
      } catch (err) {
        console.error(err);
      }
    };
    if (coin) fetchGraph();
  }, [id, coin]);
  const isMobile = window.innerWidth < 640;

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: !isMobile,
        position: "top",
        labels: {
          boxWidth: 12,
          font: {
            size: isMobile ? 10 : 12,
            weight: "bold",
          },
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (ctx) => {
            const value = ctx.raw;
            if (ctx.dataset.yAxisID === "crypto1") {
              return ` Price: $${value.toLocaleString()}`;
            }
            return ` Market Cap: $${(value / 1_000_000).toFixed(1)}M`;
          },
        },
      },
    },

    elements: {
      line: {
        tension: 0.35,
        borderWidth: isMobile ? 2 : 3,
      },
      point: {
        radius: 0,
        hoverRadius: isMobile ? 4 : 6,
      },
    },

    scales: {
      x: {
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: isMobile ? 4 : 10,
          font: {
            size: isMobile ? 10 : 12,
          },
        },
      },

      crypto1: {
        type: "linear",
        position: "left",
        grid: {
          color: "rgba(255,255,255,0.05)",
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
          callback: (value) => `$${value.toLocaleString()}`,
        },
      },

      crypto2: {
        type: "linear",
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          font: {
            size: isMobile ? 10 : 12,
          },
          callback: (value) => `$${(value / 1_000_000).toFixed(1)}M`,
        },
      },
    },

    animation: {
      duration: 600,
      easing: "easeOutQuart",
    },
  };

  if (!coin)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-900/20 blur-[100px] animate-pulse pointer-events-none" />

        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
          <div
            className="absolute inset-0 border-t-2 border-r-2 border-red-600/40 rounded-full animate-spin"
            style={{ animationDuration: "2s" }}
          ></div>

          <div
            className="absolute inset-4 border-b-2 border-l-2 border-red-500 rounded-full animate-spin"
            style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
          ></div>

          <div className="absolute inset-0 bg-red-600/10 rounded-full animate-ping"></div>

          <div className="w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E31E24]"></div>
        </div>

        <div className="text-center z-10">
          <h2 className="text-white font-bold tracking-[0.5em] text-xl mb-2 animate-pulse">
            INITIALIZING
          </h2>
          <div className="text-red-500/50 text-[10px] font-mono tracking-widest uppercase">
            Decrypting Market Data...
          </div>
        </div>
      </div>
    );

  const isPositive = coin.market_data.price_change_percentage_24h >= 0;

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500 pb-20">
      <div className="pt-10">
        <NavBar />
      </div>


      <div className="fixed top-0 left-0 w-full h-[500px] bg-red-900/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10">
        
        <button
          onClick={() => navigate("/dashboard")}
          className=" mb-5 lg:mb-8 flex items-center gap-2  text-md lg:text-lg font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors"
        >
          <span className=" text-sm lg:text-xl">←</span> Back to Feed
        </button>

      
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12 border-b border-gray-800 pb-10">
          <div className="flex items-center gap-6">
            <img
              src={coin.image.large}
              alt={coin.name}
              className="w-20 h-20 rounded-full bg-white/5 p-1"
            />
            <div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2 text-white">
                {coin.name}
              </h1>
              <div className="flex items-center gap-3">
                <span className="bg-white/10 px-3 py-1 rounded text-xs font-bold tracking-widest text-white">
                  {coin.symbol.toUpperCase()}
                </span>
                <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">
                  Rank #{coin.market_cap_rank}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-1">
              Current Price
            </p>
            <div className="text-5xl font-medium text-white mb-2">
              ${coin.market_data.current_price.usd.toLocaleString()}
            </div>
            <div
              className={`inline-flex items-center gap-2 px-3 py-1 rounded font-bold text-sm tracking-wide ${
                isPositive
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}
            >
              <span>{isPositive ? "▲" : "▼"}</span>
              {coin.market_data.price_change_percentage_24h.toFixed(2)}% (24H)
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {[
            {
              label: "Market Cap",
              value: `$${coin.market_data.market_cap.usd.toLocaleString()}`,
            },
            {
              label: "Total Volume",
              value: `$${coin.market_data.total_volume.usd.toLocaleString()}`,
            },
            {
              label: "24h High",
              value: `$${coin.market_data.high_24h.usd.toLocaleString()}`,
              color: "text-green-400",
            },
            {
              label: "24h Low",
              value: `$${coin.market_data.low_24h.usd.toLocaleString()}`,
              color: "text-red-400",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#111] border border-gray-800 p-6 rounded-xl hover:border-gray-600 transition-colors"
            >
              <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                {stat.label}
              </p>
              <p
                className={`text-2xl font-semibold ${stat.color || "text-white"}`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 shadow-2xl relative">
          <div className="absolute top-6 left-6 flex items-center gap-3">
            <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]"></div>
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              7 Day Performance
            </span>
          </div>

          <div className="h-[280px] sm:h-[350px] md:h-[500px] w-full mt-10">
            {graphData ? (
              <LineChart
                chartData={graphData}
                multiAxis={true}
                options={options}
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 font-bold tracking-widest">
                LOADING CHART...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;
