"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Sparkles, Heart, ChevronDown } from "lucide-react";
import { loveConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { useLenis } from "@/components/animation/SmoothScroll";

export default function LetterScene() {
  const [isOpen, setIsOpen] = useState(false);
  const letterRef = useRef<HTMLDivElement | null>(null);
  const { scrollTo } = useLenis();

  const handleToggle = () => {
    if (!isOpen) {
      soundManager.playLetterOpen();
      setIsOpen(true);
      // Give time for envelope flap animation, then smoothly scroll letter into center view
      setTimeout(() => {
        letterRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 400);
    } else {
      soundManager.playChime(739.99);
      setIsOpen(false);
    }
  };

  return (
    <section
      id="scene-letter"
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-28 overflow-hidden select-none"
    >
      {/* Background warm illumination when letter opens */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-radial from-[#3B252E]/35 via-[#090D20]/50 to-[#05050B]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-radial from-[#EBD5A5]/12 via-[#D99CB7]/8 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl w-full mx-auto flex flex-col items-center text-center">
        {/* Floating pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#090D20]/80 border border-[#EBD5A5]/25 backdrop-blur-md mb-8 text-xs font-mono uppercase tracking-widest text-[#EBD5A5]"
        >
          <Mail className="w-3.5 h-3.5 text-[#EBD5A5]" />
          <span>{loveConfig.letter.floatingPill}</span>
        </motion.div>

        {/* 3D Envelope Container */}
        <div className="relative w-full max-w-md perspective-1000 my-6">
          <motion.div
            animate={{
              y: isOpen ? 0 : [0, -10, 0],
              rotateZ: isOpen ? 0 : [0, 0.8, -0.8, 0],
            }}
            transition={{
              duration: 5,
              repeat: isOpen ? 0 : Infinity,
              ease: "easeInOut",
            }}
            className="relative w-full mx-auto"
          >
            {/* The Envelope Box */}
            <div className="relative w-full h-56 sm:h-64 rounded-xl bg-gradient-to-br from-[#12162C] via-[#0D1024] to-[#080A18] border border-[#EBD5A5]/30 shadow-[0_20px_50px_rgba(5,5,11,0.9),0_0_35px_rgba(235,213,165,0.15)] overflow-hidden">
              {/* Gold foil decorative border */}
              <div className="absolute inset-2 rounded-lg border border-[#EBD5A5]/15 pointer-events-none" />

              {/* Envelope Triangular Fold Lines */}
              <svg
                viewBox="0 0 400 240"
                className="absolute inset-0 w-full h-full pointer-events-none"
              >
                {/* Left fold */}
                <path
                  d="M0 240 L170 125 L0 0 Z"
                  fill="rgba(255,255,255,0.015)"
                  stroke="rgba(235,213,165,0.15)"
                  strokeWidth="0.8"
                />
                {/* Right fold */}
                <path
                  d="M400 240 L230 125 L400 0 Z"
                  fill="rgba(255,255,255,0.015)"
                  stroke="rgba(235,213,165,0.15)"
                  strokeWidth="0.8"
                />
                {/* Bottom flap */}
                <path
                  d="M0 240 L200 120 L400 240 Z"
                  fill="rgba(9, 13, 32, 0.4)"
                  stroke="rgba(235,213,165,0.2)"
                  strokeWidth="1"
                />
              </svg>

              {/* Center Wax Seal (Monogram Stamp) */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.4 }}
                    transition={{ duration: 0.35 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-tr from-[#991B1B] via-[#DC2626] to-[#F87171] border-2 border-[#EBD5A5] shadow-[0_0_20px_rgba(220,38,38,0.6),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center cursor-pointer group"
                    onClick={handleToggle}
                  >
                    <span className="font-serif-luxury font-bold text-xs text-[#FFF9F2] tracking-widest text-glow-white">
                      11:11
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Top Flap (3D opening fold) */}
            <motion.div
              style={{ transformOrigin: "top center" }}
              animate={{
                rotateX: isOpen ? -180 : 0,
                zIndex: isOpen ? 5 : 20,
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="absolute top-0 left-0 right-0 h-28 sm:h-32 pointer-events-none"
            >
              <svg viewBox="0 0 400 130" className="w-full h-full drop-shadow-md">
                <polygon
                  points="0,0 400,0 200,125"
                  fill="#151934"
                  stroke="rgba(235,213,165,0.3)"
                  strokeWidth="1"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>

        {/* Action Button: OPEN / FOLD */}
        <div className="my-6">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={handleToggle}
            className="group relative px-8 py-3.5 rounded-full overflow-hidden border border-[#EBD5A5]/40 hover:border-[#EBD5A5] bg-gradient-to-r from-[#090D20] via-[#211333] to-[#090D20] text-xs font-sans tracking-[0.25em] uppercase text-[#FFF9F2] shadow-[0_0_30px_rgba(235,213,165,0.25)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#EBD5A5]" />
              <span>
                {isOpen
                  ? loveConfig.letter.closeButtonText
                  : loveConfig.letter.openButtonText}
              </span>
            </span>
          </motion.button>
        </div>

        {/* Unfolded Romantic Letter */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              ref={letterRef}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 w-full max-w-2xl text-left rounded-2xl p-7 sm:p-10 md:p-12 bg-gradient-to-b from-[#0F142D] via-[#090D20] to-[#05050B] border border-[#EBD5A5]/35 shadow-[0_0_80px_rgba(235,213,165,0.18)]"
            >
              {/* Header inside letter */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#EBD5A5]/20 text-xs font-mono tracking-wider text-[#EBD5A5]/80">
                <span>{loveConfig.letter.date}</span>
                <span className="flex items-center gap-1.5">
                  <Heart className="w-3 h-3 text-[#D99CB7] fill-[#D99CB7]" />
                  <span>FOR {loveConfig.names.herName.toUpperCase()}</span>
                </span>
              </div>

              {/* Salutation */}
              <h3 className="font-serif-luxury text-2xl sm:text-3xl text-[#EBD5A5] font-normal mb-6">
                {loveConfig.letter.salutation}
              </h3>

              {/* Paragraphs with line-by-line staggered entry */}
              <div className="space-y-4 font-serif-luxury text-base sm:text-lg md:text-xl text-[#FFF9F2]/90 leading-relaxed font-light">
                {loveConfig.letter.paragraphs.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.15 * idx }}
                    className={
                      p === "You."
                        ? "text-2xl sm:text-3xl md:text-4xl text-[#EBD5A5] font-normal py-2 text-glow-gold"
                        : ""
                    }
                  >
                    {p}
                  </motion.p>
                ))}
              </div>

              {/* Sign Off & Signature */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15 * loveConfig.letter.paragraphs.length + 0.3,
                }}
                className="mt-10 pt-6 border-t border-[#EBD5A5]/20 flex flex-col items-end text-right"
              >
                <p className="font-display-luxury italic text-lg sm:text-xl text-[#C4A6FF] mb-2">
                  {loveConfig.letter.signOff}
                </p>
                <p className="font-serif-luxury text-base sm:text-lg text-[#FFF9F2]/80">
                  {loveConfig.letter.signature}
                </p>
                <p className="font-serif-luxury text-xl sm:text-2xl text-[#EBD5A5] font-medium tracking-wide">
                  {loveConfig.names.myName}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll cue to next section */}
        <div className="mt-14">
          <button
            onClick={() => scrollTo("#scene-universe", { duration: 1.8 })}
            className="flex flex-col items-center gap-1.5 text-xs text-[#FFF9F2]/40 hover:text-[#EBD5A5] transition-colors cursor-pointer font-sans tracking-widest uppercase"
          >
            <span>OUR LITTLE UNIVERSE</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
