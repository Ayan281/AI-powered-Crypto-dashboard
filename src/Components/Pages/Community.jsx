import React, { useState } from "react";
import NavBar from "../NavBar";

const Community = () => {
  const clearAll = () => {
    setCoin("");
    setContent("");
    setTitle("");
    setSentiment("");
  };
  const timeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if (seconds < 10) return "Just now";
    if (seconds < 360) return `${Math.floor(seconds / 60)} min ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hr ago`;
    return `${Math.floor(seconds / 86400)} day(s) ago`;
  };

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coin, setCoin] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [discussions, setDiscussions] = useState([]);
  const [reply, setReply] = useState(null);
  const [changes, setChanges] = useState("");
  const [replies, setReplies] = useState({});

  const replyFncn = () => {
    setChanges("scroll-y-auto h-[400px]");
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !content || !coin || !sentiment) return;

    const newDiscussion = {
      id: Date.now(),
      title,
      content,
      coin,
      sentiment,
      createdAt: Date.now(),
    };

    setDiscussions((prev) => [newDiscussion, ...prev]);
    clearAll();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-500 flex flex-col">
      <NavBar />

      <div className="fixed top-20 right-0 w-[600px] h-[600px] bg-red-900/10 blur-[120px] pointer-events-none" />

      <main className="flex-grow flex items-center justify-center p-6 pt-24 relative z-10">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex flex-col gap-6">
            <div>
              <span className="text-[10px] font-bold tracking-[0.3em] text-red-600 uppercase mb-2 block">
                Community Intel
              </span>
              <h1 className="text-4xl font-medium tracking-tight mb-2">
                Start a Discussion
              </h1>
              <p className="text-white/40 text-sm">
                Share your market analysis, predictions, or technical
                breakdowns.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="group">
                <input
                  className="w-full bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-lg placeholder-white/20 outline-none focus:border-red-600/50 transition-colors"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Discussion Title"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <select
                    value={coin}
                    onChange={(e) => setCoin(e.target.value)}
                    className="w-full h-full appearance-none bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-3 text-sm text-white/80 outline-none focus:border-white/30 cursor-pointer"
                  >
                    <option value="" disabled>
                      Select Asset
                    </option>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="SOL">Solana (SOL)</option>
                    <option value="ADA">Solana (ADA)</option>
                    <option value="BNB">Solana (BNB)</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none text-xs">
                    ▼
                  </div>
                </div>

                <div className="flex gap-2">
                  {[
                    {
                      val: "bullish",
                      label: "Bullish",
                      color:
                        "bg-green-500/10 text-green-400 border-green-500/20",
                    },
                    {
                      val: "neutral",
                      label: "Neutral",
                      color: "bg-gray-800 text-gray-300 border-white/10",
                    },
                    {
                      val: "bearish",
                      label: "Bearish",
                      color: "bg-red-500/10 text-red-400 border-red-500/20",
                    },
                  ].map((s) => (
                    <button
                      key={s.val}
                      type="button"
                      onClick={() => setSentiment(s.val)}
                      className={`px-4 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all
                        ${sentiment === s.val ? s.color + " border-opacity-100" : "bg-[#0a0a0a] border-white/10 text-white/40 hover:bg-white/5"}
                      `}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                className="w-full h-[250px] bg-[#0a0a0a] border border-white/10 rounded-xl px-5 py-4 text-sm leading-relaxed placeholder-white/20 outline-none focus:border-red-600/50 transition-colors resize-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What is your analysis? (Markdown supported)"
              />

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="px-8 py-3 bg-white text-black font-bold text-xs tracking-[0.2em] uppercase rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Post Intel
                </button>
                <button
                  onClick={clearAll}
                  type="button"
                  className="px-6 py-3 text-xs font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
                >
                  Discard
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-col gap-6 max-h-[85vh] overflow-y-auto pr-2 custom-scrollbar">
            {discussions.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full border border-dashed border-white/10 rounded-3xl p-10 text-white/20">
                <div className="text-4xl mb-4 opacity-50">📡</div>
                <p className="text-xs tracking-[0.2em] uppercase font-bold text-center">
                  No Discussions yet <br /> Be the first to start
                </p>
              </div>
            )}

            {discussions.map((post) => (
              <div
                key={post.id}
                className="group relative w-full bg-[#0f0f0f] hover:bg-[#141414] border border-white/5 rounded-2xl p-6 transition-all duration-300"
              >
                <div
                  className={`absolute left-0 top-6 bottom-6 w-[2px] rounded-r-full 
        ${
          post.sentiment === "bullish"
            ? "bg-green-500"
            : post.sentiment === "bearish"
              ? "bg-red-500"
              : "bg-yellow-500/50"
        }`}
                />

                <div className="pl-4 flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-snug mb-1">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] font-bold tracking-widest uppercase text-white/30">
                      <span className="text-white/60">{post.coin}</span>
                      <span>•</span>
                      <span>{timeAgo(post.createdAt)}</span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-widest border border-white/5
          ${
            post.sentiment === "bullish"
              ? "text-green-400 bg-green-500/5"
              : post.sentiment === "bearish"
                ? "text-red-400 bg-red-500/5"
                : "text-yellow-400 bg-yellow-500/20"
          }`}
                  >
                    {post.sentiment}
                  </span>
                </div>

                <div className="pl-4 mb-6">
                  <p className="text-sm text-gray-300 font-light leading-relaxed whitespace-pre-wrap">
                    {post.content}
                  </p>
                </div>

                <div className="pl-4 border-t border-white/5 pt-4 flex items-center justify-between">
                  <button
                    onClick={() => {
                      replyFncn();
                      setReply(reply === post.id ? null : post.id);
                    }}
                    className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors group/btn"
                  >
                    <span className="text-lg leading-none transform group-hover/btn:-translate-y-0.5 transition-transform">
                      ↩
                    </span>
                    {replies[post.id] ? "View Thread" : "Reply"}
                  </button>
                </div>

                {reply === post.id && (
                  <div className="pl-4 mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
                    <textarea
                      className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 outline-none focus:border-red-600/50 transition-colors resize-none h-[80px]"
                      value={replies[post.id] || ""}
                      onChange={(e) =>
                        setReplies((prev) => ({
                          ...prev,
                          [post.id]: e.target.value,
                        }))
                      }
                      placeholder="Post your rebuttal..."
                      autoFocus
                    />
                    <div className="flex justify-end gap-3 mt-2">
                      <button
                        onClick={() => setReply(null)}
                        className="text-[10px] font-bold uppercase tracking-widest text-white/30 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setReply(null)}
                        className="px-4 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded hover:bg-red-600 hover:text-white transition-colors"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}

                {replies[post.id] && reply !== post.id && (
                  <div className="pl-4 mt-4">
                    <div className="relative pl-4 border-l-2 border-white/10 py-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-4 h-4 rounded-full bg-red-600 flex items-center justify-center text-[8px] font-bold text-white">
                          Y
                        </div>
                        <span className="text-[10px] font-bold uppercase text-white/50 tracking-widest">
                          You
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {replies[post.id]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
