import React from "react";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    { id: "01", title: "AI-INTEGRATED STABILITY LAYER" },
    { id: "02", title: "PREDICTABLE SUPPLY CURVE" },
    { id: "03", title: "OPTIMIZED FOR LIQUIDITY DEPTH" },
    { id: "04", title: "CROSS-CHAIN COMPATIBLE" },
  ];

  return (
    <section className="bg-red-600 text-white min-h-screen py-24 px-10 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        
        <div className="flex justify-between items-start mb-24">
          <div className="max-w-2xl">
            <h2 className="text-6xl font-medium tracking-tight mb-8 leading-tight">
              A Token Designed <br /> to Hold Its Value
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-md font-light">
              KOI is a next-generation liquidity token engineered to maintain
              smoother markets, reduce volatility, and offer holders a
              predictable long-term asset.
            </p>
          </div>

          <div className="text-[10px] tracking-[0.2em] font-bold uppercase mt-4">
            What is KOI
          </div>
        </div>

        

        <div className="w-full">
          {features.map((feature, index) => {
            const content = (
              <div className="group border-t border-white/30 py-10 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors px-4">
                <div className="flex items-center gap-12">
                  <span className="text-xl font-medium opacity-80">
                    {feature.id}.
                  </span>
                  <h3 className="text-3xl font-bold tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {feature.title}
                  </h3>
                </div>

                <div className="text-3xl font-light transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300">
                  ↗
                </div>
              </div>
            );

           
            if (feature.id === "01") {
              return (
                <Link to="/aiprediction" key={index}>
                  {content}
                </Link>
              );
            }

            
            return <div key={index}>{content}</div>;
          })}

         
          <div className="border-t border-white/30 w-full" />
        </div>
      </div>
    </section>
  );
};

export default Features;
