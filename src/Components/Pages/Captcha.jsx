import React, { useCallback, useEffect, useState } from "react";

const Captcha = ({ onVerified, onClose }) => {
  const [captcha, setCaptcha] = useState("");
  const [inpt, setInpt] = useState("");

  // CAPTCHA GENERATION
  const generateCaptcha = useCallback(() => {
    let temp = "";
    const char = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#";
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * char.length);
      temp += char.charAt(randomIndex);
    }
    setCaptcha(temp);
  }, []);

  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleVerify = () => {
    if (inpt === captcha) {
      onVerified();
    } else {

      alert("Verification Failed. Please try again.");
      generateCaptcha();
      setInpt("");
    }
  };

  return (
   
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 ">
      
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xl transition-all duration-500"
        onClick={onClose} 
      />

      
      <div
        className="
  relative w-full max-w-md
  bg-[#0a0a0a]
  border border-white/10
  rounded-2xl
  p-5 sm:p-8
  shadow-2xl
  flex flex-col
  items-center
  gap-6 sm:gap-8
  animate-in zoom-in fade-in duration-300
"
      >
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-red-600/20 blur-[80px] pointer-events-none" />

        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
        >
          ✕
        </button>

    
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-red-500">
              Security Check
            </span>
          </div>
          <h2 className="text-2xl font-medium text-white tracking-tight">
            Verify You Are Human
          </h2>
          <p className="text-xs text-white/40 max-w-[250px] mx-auto leading-relaxed">
            Please enter the security code below to access the high-frequency
            data terminal.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div
            className="relative bg-white/5 border border-white/10 rounded-lg px-8 py-4 select-none cursor-default"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.03) 10px, rgba(255,255,255,0.03) 20px)", // Noise pattern
            }}
          >
          
            <div className="absolute inset-0 top-1/2 h-[1px] bg-white/20 w-full" />

            <span
              className="  text-2xl sm:text-3xl md:text-4xl
  font-mono font-bold text-white
  tracking-[0.35em] sm:tracking-[0.45em]
  drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              style={{ fontFamily: '"Courier New", Courier, monospace' }}
            >
              {captcha}
            </span>
          </div>

       
          <button
            onClick={generateCaptcha}
            className="p-3 rounded-lg border border-white/10 text-white/50 hover:text-white hover:bg-white/5 transition-colors"
            title="Refresh Code"
          >
            ↻
          </button>
        </div>

        
        <div className="w-full flex flex-col gap-4">
          <div className="relative group">
            <div className="absolute -inset-[1px] bg-gradient-to-r from-red-900 to-red-600 rounded-lg blur opacity-0 group-focus-within:opacity-40 transition duration-500" />
            <input
              value={inpt}
              onChange={(e) => setInpt(e.target.value.toUpperCase())}
              className="
                 relative w-full
                 bg-black
                 border border-white/10
                 rounded-lg
                  px-3 sm:px-4
                  py-3 text-lg sm:text-xl tracking-[0.25em] sm:tracking-[0.3em]
                  uppercase text-center text-center outline-none focus:border-red-500/50
                  transition-colors text-white"
              type="text"
              placeholder="TYPE CODE HERE"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleVerify()}
            />
          </div>

          <button
            onClick={handleVerify}
            className="w-full bg-white text-black font-bold text-xs tracking-[0.2em] uppercase py-4 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 shadow-lg hover:shadow-red-900/20"
          >
            Verify Identity
          </button>
        </div>
      </div>
    </div>
  );
};

export default Captcha;
