"use client";

import React, { useEffect, useState } from "react";
import { VolumeX, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager } from "@/lib/sound";
import { loveConfig } from "@/config/love-config";

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const unsubscribe = soundManager.subscribe((active) => {
      setIsPlaying(active);
    });

    // Gentle prompt to unlock audio on first interaction
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        soundManager.init();
      }
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });
    window.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      unsubscribe();
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const active = await soundManager.toggle();
    setIsPlaying(active);
    if (active) {
      soundManager.playChime(1174.66);
    }
  };

  return (
    <div
      className="fixed top-6 right-6 z-50 flex items-center gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#090D20]/80 backdrop-blur-md border border-[#EBD5A5]/20 text-xs text-[#FFF9F2]/80 shadow-lg"
          >
            <Sparkles className="w-3 h-3 text-[#EBD5A5]" />
            <span className="font-sans font-light tracking-wider">
              {isPlaying ? loveConfig.audio.title : "Soundscape: Muted"}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleToggle}
        aria-label={isPlaying ? "Mute soundtrack" : "Play soundtrack"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group p-3 rounded-full bg-[#090D20]/80 hover:bg-[#211333]/90 text-[#FFF9F2] backdrop-blur-xl border border-[#EBD5A5]/25 hover:border-[#EBD5A5]/60 transition-colors shadow-xl flex items-center justify-center cursor-pointer"
      >
        {/* Animated aura ring when playing */}
        {isPlaying && (
          <motion.span
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 rounded-full bg-[#EBD5A5]/15 blur-sm"
          />
        )}

        {/* Music visualizer bars */}
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-4 px-0.5">
            {[0.4, 0.8, 0.5, 0.9].map((delay, idx) => (
              <motion.span
                key={idx}
                animate={{
                  scaleY: [0.3, 1, 0.4],
                }}
                transition={{
                  duration: 0.8 + idx * 0.2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: delay * 0.2,
                }}
                className="w-0.5 h-full bg-[#EBD5A5] rounded-full origin-bottom"
              />
            ))}
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-[#FFF9F2]/60 group-hover:text-[#FFF9F2]" />
        )}
      </motion.button>
    </div>
  );
}
