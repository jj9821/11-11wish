"use client";

import React, { useState, useEffect } from "react";
import { VolumeX, Music, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { soundManager, AVAILABLE_TRACKS, AudioTrack } from "@/lib/sound";

export default function BackgroundMusicController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<AudioTrack>(AVAILABLE_TRACKS[0]);
  const [showPlaylist, setShowPlaylist] = useState(false);

  useEffect(() => {
    const unsub = soundManager.subscribe((active, track) => {
      setIsPlaying(active);
      setCurrentTrack(track);
    });

    const unlockAudio = () => {
      soundManager.init();
    };
    window.addEventListener("click", unlockAudio, { once: true });
    window.addEventListener("touchstart", unlockAudio, { once: true });

    return () => {
      unsub();
      window.removeEventListener("click", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const active = await soundManager.toggle();
    setIsPlaying(active);
  };

  const handleSelectTrack = (track: AudioTrack) => {
    soundManager.setTrack(track);
    setShowPlaylist(false);
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex items-center gap-3 select-none">
      {/* Current Song Display & Playlist Dropdown Trigger */}
      <div className="relative">
        <motion.button
          onClick={() => setShowPlaylist(!showPlaylist)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-[#080D20]/80 hover:bg-[#11152F]/90 border border-[#F5D9A0]/25 text-xs text-[#E4E7F3] backdrop-blur-xl shadow-xl cursor-pointer"
        >
          <Music className="w-3.5 h-3.5 text-[#F5D9A0]" />
          <span className="font-mono-astronomy tracking-wider max-w-[170px] truncate">
            {currentTrack.title}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#7995CC] transition-transform duration-300 ${
              showPlaylist ? "rotate-180" : ""
            }`}
          />
        </motion.button>

        {/* Playlist Selector Dropdown */}
        <AnimatePresence>
          {showPlaylist && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 w-64 rounded-2xl p-2 bg-[#080D20]/95 border border-[#F5D9A0]/30 backdrop-blur-2xl shadow-2xl flex flex-col gap-1 z-50"
            >
              <div className="px-3 py-1.5 text-[10px] font-mono-astronomy text-[#7995CC] tracking-widest uppercase border-b border-[#F5D9A0]/10 mb-1">
                Maria & Joel // Celestial Playlist
              </div>

              {AVAILABLE_TRACKS.map((track) => {
                const isSelected = track.id === currentTrack.id;
                return (
                  <button
                    key={track.id}
                    onClick={() => handleSelectTrack(track)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-mono-astronomy transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[#503B83]/40 text-[#F5D9A0]"
                        : "text-[#E4E7F3]/75 hover:bg-white/5 hover:text-[#E4E7F3]"
                    }`}
                  >
                    <div>
                      <p className="font-medium tracking-wide">{track.title}</p>
                      <p className="text-[10px] text-[#7995CC]">{track.artist}</p>
                    </div>
                    {isSelected && isPlaying && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5D9A0] shadow-[0_0_8px_#F5D9A0] animate-pulse" />
                    )}
                  </button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Main Play / Mute Toggle Button with Soundwave Visualizer */}
      <motion.button
        onClick={handleToggle}
        aria-label={isPlaying ? "Mute music" : "Play music"}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group p-3 rounded-full bg-[#080D20]/80 hover:bg-[#11152F]/90 text-[#E4E7F3] backdrop-blur-xl border border-[#F5D9A0]/25 hover:border-[#F5D9A0]/60 transition-colors shadow-2xl flex items-center justify-center cursor-pointer"
      >
        {isPlaying ? (
          <div className="flex items-center gap-0.5 h-4 px-0.5">
            {[0.4, 0.9, 0.5, 0.8].map((delay, idx) => (
              <motion.span
                key={idx}
                animate={{ scaleY: [0.25, 1, 0.25] }}
                transition={{
                  duration: 0.85 + idx * 0.18,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: delay * 0.15,
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
  );
}
