"use client";

import React, { useState, useEffect } from "react";
import { VolumeX, Sparkles, FastForward, Play, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sound";

interface CelestialControlsProps {
  onSimulate: (seconds: number | null) => void;
  onTriggerAwakening: () => void;
  isAwakened: boolean;
}

export default function CelestialControls({
  onSimulate,
  onTriggerAwakening,
  isAwakened,
}: CelestialControlsProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showSimMenu, setShowSimMenu] = useState(false);
  const [simState, setSimState] = useState<string>("live");

  useEffect(() => {
    const unsub = soundManager.subscribe((active) => setIsPlaying(active));
    return () => unsub();
  }, []);

  const handleAudioToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const active = await soundManager.toggle();
    setIsPlaying(active);
  };

  const handleSimSelect = (type: "live" | "60s" | "10s" | "awaken") => {
    setSimState(type);
    setShowSimMenu(false);

    if (type === "live") {
      onSimulate(null);
    } else if (type === "60s") {
      onSimulate(60);
    } else if (type === "10s") {
      onSimulate(10);
    } else if (type === "awaken") {
      onTriggerAwakening();
    }
  };

  return (
    <>
      {/* Top Right: Minimalist Floating Audio Control */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <motion.button
          onClick={handleAudioToggle}
          aria-label={isPlaying ? "Mute celestial soundscape" : "Play celestial soundscape"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group p-3 rounded-full bg-[#080D20]/80 hover:bg-[#11152F]/90 text-[#E4E7F3] backdrop-blur-xl border border-[#F5D9A0]/25 hover:border-[#F5D9A0]/60 transition-colors shadow-2xl flex items-center justify-center cursor-pointer"
        >
          {isPlaying ? (
            <div className="flex items-center gap-0.5 h-4 px-0.5">
              {[0.4, 0.9, 0.5, 0.8].map((delay, idx) => (
                <motion.span
                  key={idx}
                  animate={{ scaleY: [0.3, 1, 0.4] }}
                  transition={{
                    duration: 0.9 + idx * 0.2,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: delay * 0.2,
                  }}
                  className="w-0.5 h-full bg-[#F5D9A0] rounded-full origin-bottom"
                />
              ))}
            </div>
          ) : (
            <VolumeX className="w-4 h-4 text-[#E4E7F3]/60 group-hover:text-[#E4E7F3]" />
          )}
        </motion.button>
      </div>

      {/* Top Left: Discreet Astronomical Simulation / Time Control Menu */}
      <div className="fixed top-6 left-6 z-50">
        <div className="relative">
          <button
            onClick={() => setShowSimMenu(!showSimMenu)}
            aria-label="Astronomical Controls"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#080D20]/80 hover:bg-[#11152F]/90 border border-[#F5D9A0]/20 hover:border-[#F5D9A0]/50 backdrop-blur-xl text-xs font-mono-astronomy text-[#E4E7F3]/80 hover:text-[#F5D9A0] transition-colors shadow-lg cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#F5D9A0]" />
            <span className="hidden sm:inline">
              MODE: {simState.toUpperCase()}
            </span>
          </button>

          <AnimatePresence>
            {showSimMenu && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-0 w-64 rounded-xl p-2.5 bg-[#080D20]/95 border border-[#F5D9A0]/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-1 text-xs font-mono-astronomy z-50"
              >
                <div className="px-2 py-1 text-[10px] text-[#7995CC] uppercase tracking-wider border-b border-[#F5D9A0]/10 mb-1">
                  Temporal Simulation
                </div>

                <button
                  onClick={() => handleSimSelect("live")}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                    simState === "live"
                      ? "bg-[#503B83]/40 text-[#F5D9A0]"
                      : "text-[#E4E7F3]/70 hover:bg-white/5 hover:text-[#E4E7F3]"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Real-Time Clock (IST)</span>
                </button>

                {!isAwakened && (
                  <>
                    <button
                      onClick={() => handleSimSelect("60s")}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        simState === "60s"
                          ? "bg-[#503B83]/40 text-[#F5D9A0]"
                          : "text-[#E4E7F3]/70 hover:bg-white/5 hover:text-[#E4E7F3]"
                      }`}
                    >
                      <FastForward className="w-3.5 h-3.5" />
                      <span>Jump to T-60s (Acceleration)</span>
                    </button>

                    <button
                      onClick={() => handleSimSelect("10s")}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer ${
                        simState === "10s"
                          ? "bg-[#503B83]/40 text-[#F5D9A0]"
                          : "text-[#E4E7F3]/70 hover:bg-white/5 hover:text-[#E4E7F3]"
                      }`}
                    >
                      <Play className="w-3.5 h-3.5" />
                      <span>Jump to T-10s (Final Countdown)</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => handleSimSelect("awaken")}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-left text-[#F5D9A0] hover:bg-[#F5D9A0]/10 transition-colors cursor-pointer font-medium"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F5D9A0]" />
                  <span>Trigger 11:11 Awakening</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
