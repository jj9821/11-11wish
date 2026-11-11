"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Moon, Star } from "lucide-react";
import { loveConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { useLenis } from "@/components/animation/SmoothScroll";

export default function WishScene() {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [countdownFinished, setCountdownFinished] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const { scrollTo } = useLenis();
  const sceneRef = useRef<HTMLDivElement | null>(null);

  const startCountdown = () => {
    if (hasStarted) return;
    setHasStarted(true);
    setCountdown(11);
    soundManager.playChime(587.33);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
        // Pitch rises as countdown approaches 1
        const pitchTable: Record<number, number> = {
          10: 659.25,
          9: 739.99,
          8: 830.61,
          7: 880.0,
          6: 987.77,
          5: 1046.5,
          4: 1174.66,
          3: 1318.51,
          2: 1479.98,
        };
        soundManager.playChime(pitchTable[countdown - 1] || 1000);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 1) {
      const finishTimer = setTimeout(() => {
        setCountdownFinished(true);
        soundManager.playWishBurst();

        // Celestial stardust explosion
        try {
          confetti({
            particleCount: 75,
            spread: 90,
            origin: { y: 0.6 },
            colors: ["#EBD5A5", "#FFF9F2", "#C4A6FF", "#D99CB7"],
            disableForReducedMotion: true,
          });
        } catch {
          // Ignore
        }
      }, 1200);
      return () => clearTimeout(finishTimer);
    }
  }, [countdown]);

  const handleWishDone = () => {
    soundManager.playChime(1567.98);
    scrollTo("#scene-reveal", { offset: 0, duration: 2 });
  };

  return (
    <section
      id="scene-wish"
      ref={sceneRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-24 overflow-hidden select-none"
    >
      {/* Background Cosmic Sky Ambient Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090D20]/40 to-transparent pointer-events-none" />

      {/* Realistic Textured 3D Moon with Atmospheric Depth */}
      <div className="relative mb-10 flex items-center justify-center">
        {/* Outer Lunar Corona Glow */}
        <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-radial from-[#FFF9F2]/20 via-[#EBD5A5]/10 to-transparent blur-2xl animate-pulse pointer-events-none" />
        
        {/* Moon Sphere */}
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden shadow-[inset_-25px_-20px_50px_rgba(5,5,11,0.9),0_0_50px_rgba(235,213,165,0.45)] bg-gradient-to-tr from-[#090D20] via-[#5A5D7A] to-[#FFF9F2] transition-transform duration-1000 hover:scale-105">
          {/* Subtle Lunar Maria Crater Details */}
          <div className="absolute inset-0 opacity-40 mix-blend-multiply">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="35" cy="40" r="14" fill="#2A2D40" opacity="0.6" />
              <circle cx="65" cy="30" r="10" fill="#2A2D40" opacity="0.5" />
              <circle cx="50" cy="65" r="18" fill="#2A2D40" opacity="0.55" />
              <circle cx="25" cy="65" r="8" fill="#2A2D40" opacity="0.4" />
              <circle cx="75" cy="60" r="9" fill="#2A2D40" opacity="0.45" />
            </svg>
          </div>
          {/* Crescent highlight rim */}
          <div className="absolute inset-0 rounded-full border border-[#FFF9F2]/40" />
        </div>
      </div>

      {/* Main Narrative Area */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-xs font-mono uppercase tracking-[0.3em] text-[#EBD5A5]/80 mb-3 flex items-center gap-2"
        >
          <Moon className="w-3.5 h-3.5 text-[#EBD5A5]" />
          <span>SCENE 02 // THE MOMENT</span>
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl text-[#FFF9F2] font-light mb-4 text-glow-gold"
        >
          {loveConfig.narrative.wishPromptTitle}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-display-luxury italic text-lg sm:text-xl md:text-2xl text-[#C4A6FF]/90 font-light max-w-lg mb-10 leading-relaxed"
        >
          &ldquo;{loveConfig.narrative.wishPromptSubtitle}&rdquo;
        </motion.p>

        {/* Countdown / Interactive Wish Experience */}
        {!hasStarted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={startCountdown}
              className="group relative px-8 py-3.5 rounded-full overflow-hidden border border-[#EBD5A5]/40 hover:border-[#EBD5A5] bg-gradient-to-r from-[#090D20]/80 via-[#211333]/90 to-[#090D20]/80 backdrop-blur-xl text-xs font-sans tracking-[0.25em] uppercase text-[#FFF9F2] transition-all duration-300 shadow-[0_0_30px_rgba(235,213,165,0.2)] hover:shadow-[0_0_50px_rgba(235,213,165,0.4)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2.5 font-medium">
                <Sparkles className="w-4 h-4 text-[#EBD5A5] animate-spin" style={{ animationDuration: "6s" }} />
                <span>START WISH COUNTDOWN</span>
              </span>
            </button>
          </motion.div>
        )}

        {/* Active Countdown Display */}
        {hasStarted && !countdownFinished && countdown !== null && (
          <div className="h-32 flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={countdown}
                initial={{ opacity: 0, scale: 0.4, filter: "blur(14px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.6, filter: "blur(18px)" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif-luxury text-7xl sm:text-8xl md:text-9xl text-[#EBD5A5] font-light text-glow-gold-lg"
              >
                {countdown}
              </motion.div>
            </AnimatePresence>
            <p className="text-xs font-mono text-[#FFF9F2]/50 tracking-widest uppercase mt-2">
              Whisper your wish to the universe...
            </p>
          </div>
        )}

        {/* Finished Countdown -> Reveal "Did you make a wish?" + "I DID ✨" */}
        {countdownFinished && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 mt-4"
          >
            <div className="flex items-center gap-2 text-sm font-mono text-[#EBD5A5] tracking-widest uppercase">
              <Star className="w-4 h-4 text-[#EBD5A5] fill-[#EBD5A5]" />
              <span>THE UNIVERSE HAS LISTENED</span>
              <Star className="w-4 h-4 text-[#EBD5A5] fill-[#EBD5A5]" />
            </div>

            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#FFF9F2] font-normal">
              {loveConfig.narrative.wishConfirmationQuestion}
            </h3>

            <motion.button
              onClick={handleWishDone}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="group relative px-9 py-4 rounded-full overflow-hidden bg-gradient-to-r from-[#EBD5A5] via-[#FFF9F2] to-[#EBD5A5] text-[#05050B] font-sans font-semibold text-xs tracking-[0.25em] uppercase shadow-[0_0_40px_rgba(235,213,165,0.6)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{loveConfig.narrative.wishConfirmationButton}</span>
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
