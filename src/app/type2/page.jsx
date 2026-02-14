"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Camera,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
  Smartphone,
  ScanLine,
  ShoppingBag,
  Info,
  Zap,
  LayoutGrid,
  User,
  Trash2,
  Star,
} from "lucide-react";

/**
 * MOCK DATA
 */
const MOCK_ITEMS = [
  {
    id: 1,
    name: "Item 1",
    price: "$245.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.",
    image:
      "https://plus.unsplash.com/premium_photo-1679811672048-9d4b810a7588?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "catergory",
    rating: 4,
  },
  {
    id: 2,
    name: "Item 2",
    price: "$42.50",
    description:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    image:
      "https://images.unsplash.com/photo-1766585748913-292eb14bb0da?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "catergory",
    rating: 5,
  },
  {
    id: 3,
    name: "Item 3",
    price: "$299.00",
    description:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem.",
    image:
      "https://images.unsplash.com/photo-1693987646600-c911a3f571b7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "catergory",
    rating: 3,
  },
  {
    id: 4,
    name: "Item 4",
    price: "$35.00",
    description:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt.",
    image:
      "https://images.unsplash.com/photo-1661915607145-f658c054dcd2?q=80&w=1338&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    category: "catergory",
    rating: 4,
  },
];

/**
 * HELPER: StarRating
 */
const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={
            star <= rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-zinc-200 text-zinc-200"
          }
        />
      ))}
    </div>
  );
};

/**
 * HOOK: useShake
 */
const useShake = (onShake, threshold = 500) => {
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let lastZ = 0;
    let lastTime = 0;

    const handleMotion = (e) => {
      const current = e.accelerationIncludingGravity;
      if (!current) return;

      const currentTime = Date.now();
      if (currentTime - lastTime > 100) {
        const diffTime = currentTime - lastTime;
        lastTime = currentTime;

        const speed =
          (Math.abs(current.x + current.y + current.z - lastX - lastY - lastZ) /
            diffTime) *
          10000;

        if (speed > threshold) {
          onShake();
        }

        lastX = current.x;
        lastY = current.y;
        lastZ = current.z;
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [onShake, threshold]);
};

/**
 * COMPONENT: CameraView
 */
const CameraView = ({ onFinishScan, onCancel }) => {
  const videoRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [scanning, setScanning] = useState(true);
  const [itemsFound, setItemsFound] = useState(0);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        setHasPermission(false);
      }
    };
    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!scanning) return;

    const interval = setInterval(() => {
      if (itemsFound < MOCK_ITEMS.length) {
        setItemsFound((prev) => prev + 1);
      } else {
        setScanning(false);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [scanning, itemsFound]);

  return (
    <div className="relative h-full w-full bg-white flex flex-col items-center justify-between overflow-hidden">
      <button
        onClick={onCancel}
        className="absolute top-8 left-6 z-30 w-10 h-10 bg-black/50 backdrop-blur rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
      >
        <X size={20} />
      </button>

      {hasPermission ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-zinc-100 flex flex-col items-center justify-center p-6 text-center">
          <Camera size={48} className="text-zinc-400 mb-4" />
          <p className="text-zinc-400 text-sm">Lorem ipsum camera</p>
        </div>
      )}

      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="w-full h-full border-[20px] border-black/5 relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-scan"></div>
          <div className="absolute top-4 left-4 w-8 h-8 border-t-4 border-l-4 border-white/80 rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-t-4 border-r-4 border-white/80 rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-4 border-l-4 border-white/80 rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-4 border-r-4 border-white/80 rounded-br-lg"></div>
        </div>
      </div>

      <div className="relative z-20 w-full p-6 pt-12 flex justify-between items-start bg-gradient-to-b from-black/20 to-transparent">
        <div className="ml-10">
          <h2 className="text-zinc-800 font-semibold text-lg drop-shadow-sm bg-white/80 px-2 py-1 rounded backdrop-blur-sm">
            Lorem ipsum...
          </h2>
          <p className="text-blue-600 text-sm font-mono flex items-center gap-2 mt-1 bg-white/80 px-2 py-1 rounded w-fit backdrop-blur-sm">
            <ScanLine size={14} className="animate-pulse" />
            LOREM ACTIVE
          </p>
        </div>
        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-zinc-200 shadow-sm">
          <p className="text-zinc-800 text-xs font-bold">{itemsFound} Lorem</p>
        </div>
      </div>

      <div className="relative z-20 w-full p-6 pb-8 bg-gradient-to-t from-white via-white/80 to-transparent">
        <div className="flex flex-col items-center gap-4">
          {itemsFound > 0 && (
            <div className="bg-blue-600 text-white text-xs px-4 py-2 rounded-full animate-bounce shadow-lg">
              {itemsFound} lorem ipsum dolor
            </div>
          )}

          <button
            onClick={onFinishScan}
            disabled={itemsFound === 0}
            className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-300 ${
              itemsFound > 0
                ? "bg-white border-blue-500 scale-110 shadow-xl"
                : "bg-transparent border-zinc-300 opacity-50 cursor-not-allowed"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-full ${itemsFound > 0 ? "bg-blue-600" : "bg-zinc-200"}`}
            ></div>
          </button>

          <p className="text-zinc-500 text-xs">Lorem ipsum dolor sit amet</p>
        </div>
      </div>
    </div>
  );
};

/**
 * COMPONENT: BottomNavbar
 */
const BottomNavbar = ({ currentView, onChangeView }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white border-t border-zinc-200 flex items-center justify-around z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
      <button
        onClick={() => onChangeView("liked")}
        className={`flex flex-col items-center gap-1 w-16 ${currentView === "liked" ? "text-red-500" : "text-zinc-400"}`}
      >
        <Heart
          size={22}
          className={currentView === "liked" ? "fill-current" : ""}
        />
        <span className="text-[10px] font-medium">Liked</span>
      </button>

      <div className="relative -top-6 group">
        <button
          onClick={() => onChangeView("scan")}
          className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/40 border-4 border-white transform transition-transform active:scale-95 group-hover:scale-105"
        >
          <Camera size={24} />
        </button>
      </div>

      <button className="flex flex-col items-center gap-1 w-16 text-zinc-400">
        <User size={22} />
        <span className="text-[10px] font-medium">profile</span>
      </button>
    </div>
  );
};

/**
 * COMPONENT: LikedItemsView
 */
const LikedItemsView = ({ savedIds, items, onOpenDetail, onToggleSave }) => {
  const savedItems = items.filter((item) => savedIds.has(item.id));

  return (
    <div className="h-full w-full bg-zinc-50 flex flex-col relative pb-20">
      <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white z-10 sticky top-0 shadow-sm border-b border-zinc-100">
        <h2 className="text-xl font-bold text-zinc-800">Lorem Ipsum</h2>
        <span className="text-sm font-medium text-zinc-500">
          {savedItems.length} Lorem
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {savedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-zinc-400">
            <Heart size={48} className="mb-4 opacity-20" />
            <p>Lorem ipsum dolor sit</p>
          </div>
        ) : (
          savedItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onOpenDetail(item)}
              className="bg-white p-3 rounded-2xl flex gap-4 shadow-sm border border-zinc-100 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="w-20 h-20 rounded-xl bg-zinc-100 flex-shrink-0 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-bold text-zinc-800 leading-tight mb-1">
                  {item.name}
                </h3>
                <p className="text-sm text-zinc-500 mb-2">{item.category}</p>
                <div className="flex items-center justify-between">
                  <StarRating rating={item.rating} />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(item);
                    }}
                    className="p-2 text-zinc-400 hover:text-red-500"
                  >
                    <Heart size={16} className="fill-red-500 text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

/**
 * COMPONENT: CardDeck
 */
const CardDeck = ({ items, onOpenDetail, savedIds, onToggleSave }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastAction, setLastAction] = useState(null);

  const currentItem = items[currentIndex];

  const handleToggle = useCallback(() => {
    onToggleSave(currentItem);
    const isSaving = !savedIds.has(currentItem.id);
    setLastAction(isSaving ? "saved" : "unsaved");
    setTimeout(() => setLastAction(null), 800);
  }, [currentItem, savedIds, onToggleSave]);

  // Handle iOS permission on first interaction
  const requestMotionPermission = useCallback(async () => {
    if (
      typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function"
    ) {
      try {
        const permissionState = await DeviceMotionEvent.requestPermission();
        if (permissionState === "granted") {
          // Permission granted
        }
      } catch (e) {
        console.error("Motion permission error:", e);
      }
    }
  }, []);

  const handleHeartClick = (e) => {
    e.stopPropagation();
    handleToggle();
    requestMotionPermission();
  };

  const handleSimulateShake = (e) => {
    e.stopPropagation();
    handleToggle();
  };

  useShake(() => {
    if (!savedIds.has(currentItem.id)) {
      handleToggle();
      if (navigator.vibrate) navigator.vibrate(200);
    }
  });

  const nextCard = () => {
    if (currentIndex < items.length - 1) {
      setCurrentIndex((c) => c + 1);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex((c) => c - 1);
    }
  };

  const isSaved = savedIds.has(currentItem.id);

  return (
    <div className="h-full w-full bg-zinc-50 flex flex-col relative pb-20">
      <div className="px-6 pt-12 pb-4 flex justify-between items-center bg-white z-10 sticky top-0 border-b border-zinc-100">
        <h2 className="text-xl font-bold text-zinc-800">Lorem Ipsum</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-zinc-500">
            {currentIndex + 1} / {items.length}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
        {lastAction === "saved" && (
          <div className="absolute z-50 flex flex-col items-center animate-fade-up pointer-events-none">
            <Heart
              size={80}
              className="fill-red-500 text-red-500 drop-shadow-xl"
            />
            <span className="text-red-500 font-bold text-lg mt-2 bg-white/80 px-3 py-1 rounded-full backdrop-blur-sm">
              Lorem!
            </span>
          </div>
        )}

        <div
          className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group border border-zinc-200 relative"
          onClick={() => onOpenDetail(currentItem)}
        >
          <div className="relative h-64 overflow-hidden bg-zinc-100">
            <img
              src={currentItem.image}
              alt={currentItem.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-zinc-900 shadow-sm">
              {currentItem.category}
            </div>
          </div>

          <div className="p-5">
            <div className=" flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-zinc-900 leading-tight pr-4">
                {currentItem.name}
              </h3>
              <div className=" flex flex-col justify-end items-end">
                <span className="text-xs">Rating</span>
                <StarRating rating={currentItem.rating} />
              </div>
            </div>

            <p className="text-zinc-500 text-sm line-clamp-2 mb-4">
              {currentItem.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-blue-500 font-medium">
              <Info size={14} />
              <span>Learn More</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 pb-28 bg-white border-t border-zinc-100">
        <div className="flex items-center justify-between gap-4 max-w-sm mx-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevCard();
            }}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} className="text-zinc-600" />
          </button>

          <div className="flex flex-col items-center">
            <button
              onClick={handleHeartClick}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 transform active:scale-90 ${
                isSaved
                  ? "bg-red-500 text-white shadow-red-500/30"
                  : "bg-white text-zinc-400 border border-zinc-200"
              }`}
            >
              <Heart size={28} className={isSaved ? "fill-current" : ""} />
            </button>
            <button
              onClick={handleSimulateShake}
              className="flex items-center gap-1 mt-2 text-zinc-400 text-[10px] uppercase tracking-wider font-semibold hover:text-blue-500 transition-colors cursor-pointer"
            >
              <Heart size={10} />
              <span>Shake to like</span>
            </button>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextCard();
            }}
            disabled={currentIndex === items.length - 1}
            className="w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} className="text-zinc-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * COMPONENT: DetailsDrawer
 */
const DetailsDrawer = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed bottom-0 left-0 right-0 max-w-md mx-auto h-[85%] bg-white rounded-t-[2.5rem] shadow-2xl z-50 transition-transform duration-500 cubic-bezier(0.32, 0.72, 0, 1) ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-full flex justify-center pt-3 pb-1" onClick={onClose}>
          <div className="w-12 h-1.5 bg-zinc-300 rounded-full"></div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:text-zinc-800"
        >
          <X size={18} />
        </button>

        <div className="h-full overflow-y-auto pb-20 p-8 no-scrollbar">
          <div className="aspect-square w-full rounded-2xl overflow-hidden mb-6 bg-zinc-100 relative">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400" />
              Verified
            </div>
          </div>

          <div className="flex justify-between items-start mb-2">
            <h2 className="text-2xl font-bold text-zinc-900 w-3/4">
              {item.name}
            </h2>
            <div className="pt-1">
              <StarRating rating={item.rating} />
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-zinc-400">
              Lorem ipsum dolor sit amet
            </span>
          </div>

          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-2">
            Lorem
          </h3>
          <p className="text-zinc-600 leading-relaxed mb-8">
            {item.description}
          </p>

          <h3 className="text-sm font-bold text-zinc-900 uppercase tracking-wider mb-2">
            Ipsum
          </h3>
          <div className="bg-zinc-50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Lorem</span>
              <span className="font-medium text-zinc-900">{item.category}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Ipsum</span>
              <span className="font-medium text-zinc-900">Consectetur</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-zinc-500">Dolor</span>
              <span className="font-medium text-green-600">Sit Amet</span>
            </div>
          </div>

          <button className="w-full mt-8 bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/30 hover:bg-blue-700 transition-colors active:scale-95 transform duration-150">
            Lorem Ipsum
          </button>
        </div>
      </div>
    </>
  );
};

/**
 * MAIN COMPONENT: App
 */
export default function App() {
  const [view, setView] = useState("scan"); // 'scan' | 'deck' | 'liked'
  const [selectedItem, setSelectedItem] = useState(null);

  // Hoisted state for saved items, initialized as empty
  const [savedIds, setSavedIds] = useState(new Set());

  const handleFinishScan = () => {
    setView("deck");
  };

  const handleOpenDetail = (item) => {
    setSelectedItem(item);
  };

  const handleCloseDetail = () => {
    setSelectedItem(null);
  };

  const handleToggleSave = (item) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(item.id)) {
        next.delete(item.id);
      } else {
        next.add(item.id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center font-sans text-zinc-900">
      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up {
          animation: fade-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>

      {/* Main Container - No Frame */}
      <div className="relative w-full max-w-md bg-white shadow-2xl overflow-hidden h-screen">
        {view === "scan" && (
          <CameraView
            onFinishScan={handleFinishScan}
            onCancel={() => setView("deck")}
          />
        )}

        {view === "deck" && (
          <CardDeck
            items={MOCK_ITEMS}
            onOpenDetail={handleOpenDetail}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
          />
        )}

        {view === "liked" && (
          <LikedItemsView
            items={MOCK_ITEMS}
            savedIds={savedIds}
            onOpenDetail={handleOpenDetail}
            onToggleSave={handleToggleSave}
          />
        )}

        {/* BottomNavbar - Visible unless scanning */}
        {view !== "scan" && (
          <BottomNavbar currentView={view} onChangeView={setView} />
        )}

        {/* Global Drawer */}
        <DetailsDrawer
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={handleCloseDetail}
        />
      </div>
    </div>
  );
}
