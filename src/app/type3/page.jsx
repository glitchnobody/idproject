"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Mic,
  Send,
  History,
  Scan,
  User,
  RotateCcw,
  Share2,
  Bookmark,
  X,
  ChevronRight,
  Download,
  Copy,
  Info,
} from "lucide-react";

// --- DATA & CONTENT ---
const PRODUCT_DATA = {
  id: "verification",
  title: "Banarasi Saree",
  image:
    "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
  score: 4,
  status: "Your product is original",
  details: {
    trace: {
      craft: "Banarasi",
      material: "Silk + Zari",
      technique: "jacquard",
      image:
        "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=600&auto=format&fit=crop",
      condensed:
        "This Banarasi Saree is crafted from Silk + Zari using a traditional jacquard technique.",
    },
    impact: {
      description:
        "This purchase directly supports the weaver communities of Varanasi, ensuring fair wages and providing healthcare for 4 artisan families involved in this batch.",
      condensed:
        "Your purchase supports 4 artisan families in Varanasi with fair wages and healthcare.",
      iconColor: "#9a8d71",
    },
    handshake: {
      batch: "BAN-SILK-2409-1187",
      date: "14 Sept 2025 | 11:42 AM",
      type: "Batch-level artisan confirmation",
      region: "Madanpura, Varanasi, Uttar Pradesh",
      artisan: "Abdul Rahman",
      role: "Handloom Weaver",
      condensed:
        "Verified by Abdul Rahman, a Handloom Weaver from Madanpura, Varanasi.",
      team: [
        { label: "Zari Worker", name: "Shabnam Bano" },
        { label: "Warp Setup", name: "Imran Ansari" },
        { label: "Quality Check", name: "Farhan Khan" },
      ],
    },
  },
};

// --- HELPER COMPONENTS ---

const VerificationDots = ({ score }) => (
  <div className="flex gap-1 mt-1.5">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`w-3 h-3 rounded-full border border-[#45b39d] ${i < score ? "bg-[#45b39d]" : "bg-transparent"}`}
      />
    ))}
  </div>
);

const ImpactGraphic = () => (
  <svg width="100" height="100" viewBox="0 0 100 100" className="mb-4">
    <circle
      cx="50"
      cy="50"
      r="45"
      fill="#dadada"
      stroke="#000"
      strokeWidth="0.5"
    />
    <circle cx="50" cy="50" r="28" fill="#000" />
    <path
      d="M40 75 L95 75 L95 40 L60 40 L40 60 Z"
      fill="#9a8d71"
      stroke="#000"
      strokeWidth="0.5"
    />
    <rect
      x="70"
      y="55"
      width="10"
      height="6"
      fill="#000"
      transform="rotate(-20 75 58)"
    />
  </svg>
);

export default function App() {
  const [view, setView] = useState("home");
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const chatEndRef = useRef(null);
  const drawerRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (view === "chat") scrollToBottom();
  }, [messages, view]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;
    if (view === "home") setView("chat");

    const newMsg = { id: Date.now(), type: "user", content: text };
    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          isProductResult: true,
          data: PRODUCT_DATA,
        },
      ]);
    }, 600);
  };

  const handlePillClick = (type) => {
    const userMsg = {
      id: Date.now(),
      type: "user",
      content: `Tell me about the ${type}.`,
    };
    setMessages((prev) => [...prev, userMsg]);

    let content = "";
    if (type === "Trace") content = PRODUCT_DATA.details.trace.condensed;
    if (type === "Impact") content = PRODUCT_DATA.details.impact.condensed;
    if (type === "Artist") content = PRODUCT_DATA.details.handshake.condensed;

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          type: "bot",
          content: content,
        },
      ]);
    }, 500);
  };

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      handleSend("Scanning product...");
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen bg-[#fbf6f1] font-sans text-[#6d675b] overflow-hidden">
      {/* App Header */}
      <header className="px-6 py-5 flex justify-center items-center bg-[#fbf6f1] border-b border-[#f3eee8] sticky top-0 z-50">
        <h1 className="text-2xl font-serif italic text-[#8c8475]">
          Craft Verify
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-y-auto no-scrollbar pb-32">
        <AnimatePresence mode="wait">
          {view === "home" ? (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center px-8"
            >
              <div className="grid grid-cols-3 gap-6 w-full max-w-sm">
                <div className="flex flex-col items-center gap-2">
                  <button className="w-full aspect-square bg-white border-2 border-[#e8dfd5] rounded-3xl flex items-center justify-center shadow-sm active:scale-95 transition-all">
                    <User size={32} className="text-[#8c8475]" />
                  </button>
                  <span className="text-xs font-medium">Profile</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button
                    onClick={startScan}
                    className="w-full aspect-square bg-white border-2 border-[#e8dfd5] rounded-3xl flex items-center justify-center shadow-sm active:scale-95 transition-all"
                  >
                    <Scan size={32} className="text-[#8c8475]" />
                  </button>
                  <span className="text-xs font-medium uppercase tracking-widest">
                    Scan
                  </span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <button className="w-full aspect-square bg-white border-2 border-[#e8dfd5] rounded-3xl flex items-center justify-center shadow-sm active:scale-95 transition-all">
                    <History size={32} className="text-[#8c8475]" />
                  </button>
                  <span className="text-xs font-medium">History</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-6 py-8 space-y-6"
            >
              <AnimatePresence>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.isProductResult ? (
                      <div className="bg-white border-2 border-[#e8dfd5] rounded-[30px] p-5 shadow-sm max-w-[90%] w-full">
                        <div className="flex flex-col items-center text-center">
                          <p className="text-[10px] uppercase tracking-[0.2em] text-[#a1998c] mb-2">
                            Verification Result
                          </p>
                          <h3 className="text-xl font-medium text-[#6d675b] leading-tight mb-3">
                            {msg.data.title}
                          </h3>

                          <div
                            onClick={() => setIsDrawerOpen(true)}
                            className="w-48 aspect-[4/3] rounded-2xl overflow-hidden border border-[#f3eee8] mb-4 shadow-sm cursor-pointer hover:border-[#45b39d] transition-colors group"
                          >
                            <img
                              src={msg.data.image}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              alt="Product"
                            />
                          </div>

                          <VerificationDots score={msg.data.score} />
                          <p className="mt-4 text-[#8c8475] italic text-md mb-6">
                            {msg.data.status}
                          </p>

                          <div className="flex flex-wrap justify-center gap-2 w-full">
                            <button
                              onClick={() => handlePillClick("Impact")}
                              className="px-4 py-2 bg-[#fbf6f1] border border-[#e8dfd5] rounded-full text-xs font-medium text-[#8c8475] active:bg-[#736f5e] active:text-white transition-colors"
                            >
                              Impact
                            </button>
                            <button
                              onClick={() => handlePillClick("Artist")}
                              className="px-4 py-2 bg-[#fbf6f1] border border-[#e8dfd5] rounded-full text-xs font-medium text-[#8c8475] active:bg-[#736f5e] active:text-white transition-colors"
                            >
                              Artist
                            </button>
                            <button
                              onClick={() => handlePillClick("Trace")}
                              className="px-4 py-2 bg-[#fbf6f1] border border-[#e8dfd5] rounded-full text-xs font-medium text-[#8c8475] active:bg-[#736f5e] active:text-white transition-colors"
                            >
                              Trace
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`max-w-[80%] px-5 py-3 rounded-2xl text-sm ${
                          msg.type === "user"
                            ? "bg-[#736f5e] text-white rounded-tr-none"
                            : "bg-white border border-[#e8dfd5] text-[#6d675b] rounded-tl-none shadow-sm"
                        }`}
                      >
                        {msg.content}
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              <div ref={chatEndRef} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Input Bar */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-[#fbf6f1] via-[#fbf6f1] to-transparent pointer-events-none z-40">
        <div className="max-w-md mx-auto flex items-center gap-3 bg-white border-2 border-[#e8dfd5] rounded-full p-2 pr-4 shadow-2xl pointer-events-auto">
          <div className="flex-1 flex items-center bg-[#fbf6f1] rounded-full px-4 h-12 border border-[#e8dfd5]/50">
            <input
              type="text"
              placeholder="Ask anything..."
              className="flex-1 bg-transparent border-none outline-none text-sm text-[#6d675b] placeholder-[#a1998c]"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
            />
            <button className="text-[#a1998c] ml-2">
              <Mic size={20} />
            </button>
          </div>
          <button
            onClick={startScan}
            className="w-12 h-12 bg-[#736f5e] text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
          >
            <Camera size={22} />
          </button>
        </div>
      </div>

      {/* Full Info Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[60]"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 h-[85vh] bg-[#fbf6f1] border-t border-[#e8dfd5] rounded-t-[50px] z-[70] shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="w-full flex justify-center py-4">
                <div className="w-16 h-1.5 bg-[#d6cec2] rounded-full" />
              </div>

              <div
                ref={drawerRef}
                className="flex-1 overflow-y-auto px-8 pb-12 no-scrollbar scroll-smooth"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-light text-[#8c8475]">
                    Full Verification
                  </h2>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 rounded-full bg-white border border-[#e8dfd5]"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="bg-white border border-[#e8dfd5] rounded-[40px] p-8 mb-6 shadow-sm">
                  <h3 className="text-2xl font-light text-[#8c8475] text-center mb-6">
                    Craft Trace
                  </h3>
                  <div className="h-[1px] bg-[#d6cec2] w-full mb-8" />
                  <div className="text-center space-y-4 mb-8 text-xl font-light">
                    <p>Craft : {PRODUCT_DATA.details.trace.craft}</p>
                    <p>Material : {PRODUCT_DATA.details.trace.material}</p>
                    <p>Technique : {PRODUCT_DATA.details.trace.technique}</p>
                  </div>
                  <img
                    src={PRODUCT_DATA.details.trace.image}
                    className="w-full aspect-square rounded-2xl object-cover border border-[#f3eee8]"
                  />
                </div>

                <div className="bg-white border border-[#e8dfd5] rounded-[40px] p-8 mb-6 shadow-sm flex flex-col items-center text-center">
                  <h3 className="text-2xl font-light text-[#8c8475] mb-6">
                    Impact stats
                  </h3>
                  <div className="h-[1px] bg-[#d6cec2] w-full mb-8" />
                  <ImpactGraphic />
                  <p className="text-[#000] text-sm font-bold uppercase leading-relaxed max-w-[240px]">
                    {PRODUCT_DATA.details.impact.description}
                  </p>
                </div>

                <div className="bg-white border border-[#e8dfd5] rounded-[40px] p-8 mb-10 shadow-sm text-center">
                  <h3 className="text-2xl font-light text-[#8c8475] mb-6">
                    Digital Handshake
                  </h3>
                  <div className="h-[1px] bg-[#d6cec2] w-full mb-8" />
                  <div className="w-48 aspect-square rounded-xl overflow-hidden border border-[#f3eee8] mx-auto mb-6">
                    <img
                      src="https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=300&auto=format&fit=crop"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 mb-8 text-[11px] text-[#a1998c] uppercase tracking-wider">
                    <p>Batch ID: {PRODUCT_DATA.details.handshake.batch}</p>
                    <p>Verified On: {PRODUCT_DATA.details.handshake.date}</p>
                  </div>
                  <div className="space-y-1.5 mb-8 text-[#8c8475] text-sm font-medium">
                    <p>{PRODUCT_DATA.details.handshake.region}</p>
                    <p>{PRODUCT_DATA.details.handshake.artisan}</p>
                    <p className="italic">
                      {PRODUCT_DATA.details.handshake.role}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[#a1998c] text-xs font-bold uppercase mb-2">
                      Team Involved
                    </p>
                    {PRODUCT_DATA.details.handshake.team.map((person, i) => (
                      <p key={i} className="text-[#8c8475] text-sm font-light">
                        {person.label}: {person.name}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button className="flex flex-col items-center gap-2 p-5 rounded-3xl bg-white border border-[#e8dfd5] text-[#8c8475] active:scale-95 transition-all">
                    <Download size={22} />
                    <span className="text-[10px] font-bold uppercase">
                      Download
                    </span>
                  </button>
                  <button className="flex flex-col items-center gap-2 p-5 rounded-3xl bg-white border border-[#e8dfd5] text-[#8c8475] active:scale-95 transition-all">
                    <Copy size={22} />
                    <span className="text-[10px] font-bold uppercase">
                      Copy Link
                    </span>
                  </button>
                </div>
                <button className="w-full py-5 bg-[#736f5e] text-white rounded-3xl font-bold uppercase shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                  <Share2 size={20} /> Share to Instagram
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Scanning Overlay */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center backdrop-blur-md"
          >
            <div className="relative w-72 h-72 border-4 border-white/20 rounded-[40px] overflow-hidden">
              <motion.div
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 w-full h-1 bg-[#45b39d] shadow-[0_0_20px_#45b39d] z-10"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Scan size={64} className="text-white/40" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}
