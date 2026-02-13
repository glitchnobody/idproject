"use client";
import React, { useState, forwardRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { RefreshCw, Bookmark, Share2, Download, Copy } from "lucide-react";

// Card Data
const INITIAL_CARDS = [
  {
    id: "verification",
    title: "Verification Score",
    subtitle: "Product : Banarasi Saree",
    image:
      "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
    score: 4,
    status: "your product is original",
  },
  {
    id: "trace",
    title: "Craft Trace",
    isCraftTrace: true,
    details: [
      { label: "Craft", value: "Banarasi" },
      { label: "Material", value: "Silk + Zari" },
      { label: "Technique", value: "jacquard" },
    ],
    image:
      "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "stats",
    title: "Impact stats",
    isImpactStats: true,
    impactDescription: [
      "This purchase directly supports the weaver",
      "communities of Varanasi, ensuring fair",
      "wages and providing healthcare for 4",
      "artisan families involved in this batch.",
    ],
  },
  {
    id: "digital",
    title: "Digital Handshake",
    image:
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=600&auto=format&fit=crop",
    isDigitalHandshake: true,
    batchInfo: {
      id: "BAN-SILK-2409-1187",
      date: "14 Sept 2025 | 11:42 AM",
      type: "Batch-level artisan confirmation",
    },
    artisanInfo: {
      region: "Madanpura, Varanasi, Uttar Pradesh",
      name: "Abdul Rahman",
      role: "Handloom Weaver",
    },
    team: [
      { label: "Zari Worker", name: "Shabnam Bano" },
      { label: "Warp Setup", name: "Imran Ansari" },
      { label: "Quality Check", name: "Farhan Khan" },
    ],
  },
];

const ImpactIcon = () => (
  <svg width="180" height="180" viewBox="0 0 100 100" className="mb-8">
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

const ShareCard = () => (
  <div className="absolute inset-0 w-full h-full rounded-[45px] border border-[#e8dfd5] bg-white shadow-xl p-8 flex flex-col items-center justify-center text-center">
    <div className="w-20 h-20 bg-[#fbf6f1] rounded-full flex items-center justify-center mb-6 border border-[#e8dfd5]">
      <Share2 size={32} className="text-[#8c8475]" />
    </div>
    <h2 className="text-3xl font-light text-[#8c8475] mb-2">Share the Craft</h2>
    <p className="text-[#a1998c] mb-8 max-w-[200px]">
      Let the world know your Banarasi Saree is 100% authentic.
    </p>

    <div className="grid grid-cols-2 gap-4 w-full">
      <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#fbf6f1] border border-[#e8dfd5] text-[#8c8475] active:scale-95 transition-transform">
        <Download size={20} />
        <span className="text-xs font-medium">Download</span>
      </button>
      <button className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-[#fbf6f1] border border-[#e8dfd5] text-[#8c8475] active:scale-95 transition-transform">
        <Copy size={20} />
        <span className="text-xs font-medium">Copy Link</span>
      </button>
    </div>

    <button className="mt-6 w-full py-4 bg-[#736f5e] text-white rounded-2xl font-medium shadow-lg active:scale-95 transition-transform">
      Share to Instagram
    </button>
  </div>
);

const SwipeableCard = forwardRef(
  ({ card, onSwipe, index, total, customDirection }, ref) => {
    const x = useMotionValue(0);
    const rotate = useTransform(x, [-200, 200], [-25, 25]);
    const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

    const handleDragEnd = (event, info) => {
      const threshold = 100;
      if (info.offset.x > threshold) {
        onSwipe(card.id, "right");
      } else if (info.offset.x < -threshold) {
        onSwipe(card.id, "left");
      }
    };

    return (
      <motion.div
        ref={ref}
        custom={customDirection}
        style={{
          x,
          rotate,
          zIndex: total - index,
          backgroundColor: "#fefaf6",
          opacity,
        }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        initial={{ scale: 0.8, y: 300, opacity: 0 }}
        animate={{
          scale: 1 - index * 0.04,
          y: -35 * index,
          opacity: 1,
          transition: {
            type: "spring",
            stiffness: 260,
            damping: 25,
            delay: index * 0.08,
          },
        }}
        exit={(direction) => ({
          x: direction === "right" ? 800 : direction === "left" ? -800 : 0,
          y: direction ? 0 : 800,
          rotate: direction === "right" ? 45 : direction === "left" ? -45 : 0,
          opacity: 0,
          transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] },
        })}
        className="absolute inset-0 w-full h-full rounded-[45px] border border-[#e8dfd5] shadow-xl p-8 flex flex-col items-center select-none cursor-grab active:cursor-grabbing origin-bottom overflow-hidden"
      >
        <div className="w-full text-center mb-6">
          <h2 className="text-3xl font-light text-[#8c8475] tracking-tight">
            {card.title}
          </h2>
          <div className="h-[1px] bg-[#d6cec2] w-full mt-4 mb-3" />
          {!card.isDigitalHandshake &&
            !card.isImpactStats &&
            !card.isCraftTrace && (
              <p className="text-[#a1998c] text-lg font-medium">
                {card.subtitle}
              </p>
            )}
        </div>

        {card.isDigitalHandshake ? (
          <div className="w-full flex flex-col items-center overflow-y-auto no-scrollbar">
            <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 shadow-sm border border-[#f3eee8]">
              <img
                src={card.image}
                alt="Artisan"
                className="w-full h-full object-cover pointer-events-none scale-110"
              />
            </div>
            <div className="text-center space-y-0.5 mb-6">
              <p className="text-[11px] text-[#a1998c] uppercase tracking-wider">
                Batch ID: {card.batchInfo.id}
              </p>
              <p className="text-[11px] text-[#a1998c]">
                Verified On: {card.batchInfo.date}
              </p>
            </div>
            <div className="text-center space-y-1 mb-6">
              <p className="text-[#8c8475] font-medium text-sm leading-tight">
                {card.artisanInfo.region}
              </p>
              <p className="text-[#8c8475] font-medium text-sm">
                {card.artisanInfo.name}
              </p>
              <p className="text-[#8c8475] font-medium text-sm italic">
                {card.artisanInfo.role}
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[#a1998c] text-sm font-medium mb-1">
                Other People Involved :
              </p>
              {card.team.map((person, i) => (
                <p key={i} className="text-[#8c8475] text-sm font-light">
                  {person.label}: {person.name}
                </p>
              ))}
            </div>
          </div>
        ) : card.isImpactStats ? (
          <div className="w-full flex flex-col items-center justify-center flex-1">
            <ImpactIcon />
            <div className="text-center space-y-1">
              {card.impactDescription.map((line, i) => (
                <p
                  key={i}
                  className="text-[#000] text-sm font-bold tracking-tight leading-tight uppercase"
                >
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : card.isCraftTrace ? (
          <div className="w-full flex flex-col items-center">
            <div className="text-center space-y-5 mb-10 mt-4">
              {card.details.map((detail, i) => (
                <p key={i} className="text-[#8c8475] text-2xl font-light">
                  {detail.label} : {detail.value}
                </p>
              ))}
            </div>
            <div className="w-64 h-64 rounded-xl overflow-hidden shadow-sm border border-[#f3eee8]">
              <img
                src={card.image}
                alt="Craft process loom"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>
        ) : (
          <>
            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-8 shadow-inner border border-[#f3eee8]">
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
            <div className="flex gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full border-2 border-[#45b39d] ${i < card.score ? "bg-[#45b39d]" : "bg-transparent"}`}
                />
              ))}
            </div>
            <p className="text-[#8c8475] italic text-lg tracking-wide">
              {card.status}
            </p>
          </>
        )}
      </motion.div>
    );
  },
);

SwipeableCard.displayName = "SwipeableCard";

export default function App() {
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [lastDirection, setLastDirection] = useState(null);
  const [deckKey, setDeckKey] = useState(0);

  const handleSwipe = (id, direction) => {
    setLastDirection(direction);
    setTimeout(() => {
      setCards((prev) => prev.filter((c) => c.id !== id));
    }, 0);
  };

  const resetDeck = () => {
    setLastDirection(null);
    setDeckKey((prev) => prev + 1);
    setCards([]);
    setTimeout(() => setCards([...INITIAL_CARDS]), 50);
  };

  // Calculate deck progress (0 to 4)
  const swipedCount = INITIAL_CARDS.length - cards.length;

  return (
    <div className="min-h-screen bg-[#fbf6f1] flex flex-col items-center overflow-hidden font-sans">
      <header className="w-full py-8 text-center border-b border-[#f3eee8] bg-[#fbf6f1] z-50">
        <h1 className="text-3xl font-serif text-[#6d675b] italic">
          Craft Verify
        </h1>
      </header>

      <main className="flex-1 w-full max-w-md px-6 relative mt-20 mb-8 flex flex-col items-center justify-center">
        <div className="relative w-full aspect-[3/5]">
          <ShareCard />
          <AnimatePresence
            key={deckKey}
            mode="popLayout"
            custom={lastDirection}
          >
            {cards.map((card, index) => (
              <SwipeableCard
                key={`${deckKey}-${card.id}`}
                card={card}
                index={index}
                total={cards.length}
                onSwipe={handleSwipe}
                customDirection={lastDirection}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Global Swipe Progress Dots */}
        <div className="flex gap-3 mt-12 mb-2 z-50">
          {INITIAL_CARDS.map((_, i) => {
            const isActive = i <= swipedCount;
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  backgroundColor: isActive ? "#45b39d" : "rgba(0,0,0,0)",
                  scale: isActive ? 1.1 : 1,
                }}
                className={`w-3 h-3 rounded-full border-2 border-[#45b39d] transition-colors duration-300`}
              />
            );
          })}
        </div>
      </main>

      <footer className="w-full max-w-sm flex justify-center items-center gap-6 pb-12 z-50">
        <button
          onClick={resetDeck}
          className="w-20 h-14 bg-[#736f5e] rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
        >
          <RefreshCw size={28} />
        </button>
        <button className="w-20 h-14 bg-[#736f5e] rounded-2xl flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform">
          <Bookmark size={28} />
        </button>
      </footer>

      <div className="fixed bottom-2 w-32 h-1 bg-gray-300 rounded-full opacity-50" />
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`}</style>
    </div>
  );
}
