"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { astronomyConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { AstronomyPhase } from "./DeepSpaceCanvas";
import { Sparkles, Heart, RotateCcw } from "lucide-react";

interface AwakeningSequenceProps {
  onPhaseUpdate: (phase: AstronomyPhase, mariaProg: number, heartProg: number, awakenProg: number) => void;
  onReset: () => void;
}

export default function AwakeningSequence({
  onPhaseUpdate,
  onReset,
}: AwakeningSequenceProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sub-stages within the awakening journey:
  // "void" -> "supernova" -> "galaxy" -> "maria" -> "wish" -> "letter" -> "finale"
  const [subStage, setSubStage] = useState<
    "void" | "supernova" | "galaxy" | "maria" | "wish" | "letter" | "finale"
  >("void");

  const [wishIndex, setWishIndex] = useState<number>(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Step 1: Complete darkness (Void)
      onPhaseUpdate("awakening", 0, 0, 0);

      // Step 2: Tiny golden star awakens (1.5s)
      tl.to({}, { duration: 1.2 })
        .call(() => {
          setSubStage("supernova");
          soundManager.playSupernovaAwakening();
        })
        // Step 3: Supernova expansion (2.5s)
        .to({}, { duration: 2.8, onUpdate: function() {
          const p = this.progress();
          onPhaseUpdate("awakening", 0, 0, p);
        }})
        // Step 4: Living Spiral Galaxy emergence (3s)
        .call(() => {
          setSubStage("galaxy");
          onPhaseUpdate("galaxy", 0, 0, 1);
        })
        .to({}, { duration: 3.5 })
        // Step 5: Constellation of MARIA starts forming
        .call(() => {
          setSubStage("maria");
          soundManager.playChime(1174.66);
        })
        .to({}, {
          duration: 4.5,
          onUpdate: function() {
            const mp = this.progress();
            onPhaseUpdate("maria", mp, 0, 1);
          },
        })
        // Step 6: Wish Reveal (Sequence of 4 cinematic lines)
        .call(() => {
          setSubStage("wish");
          onPhaseUpdate("wish", 1, 0, 1);
        });
    }, containerRef);

    return () => ctx.revert();
  }, [onPhaseUpdate]);

  // Handle progression through the 4 Wish lines
  useEffect(() => {
    if (subStage !== "wish") return;

    const timer = setInterval(() => {
      setWishIndex((prev) => {
        if (prev < astronomyConfig.wishReveal.lines.length - 1) {
          const next = prev + 1;
          soundManager.playChime(739.99 + next * 110);
          return next;
        } else {
          clearInterval(timer);
          // Transition to Letter after the last wish line
          setTimeout(() => {
            setSubStage("letter");
            onPhaseUpdate("letter", 1, 0, 1);
            soundManager.playLetterOpen();
          }, 4500);
          return prev;
        }
      });
    }, 4200);

    return () => clearInterval(timer);
  }, [subStage, onPhaseUpdate]);

  const handleProceedToFinale = () => {
    setSubStage("finale");
    soundManager.playSupernovaAwakening();
    // Animate heart constellation
    gsap.to(
      {},
      {
        duration: 3,
        onUpdate: function () {
          const hp = this.progress();
          onPhaseUpdate("finale", 0, hp, 1);
        },
      }
    );
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-20 z-10 overflow-hidden select-none"
    >
      <AnimatePresence mode="wait">
        {/* SUBSTAGE 1: THE INITIAL SUPERNOVA BURST */}
        {subStage === "supernova" && (
          <motion.div
            key="supernova"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center text-center"
          >
            {/* Center golden pulsating singularity */}
            <motion.div
              animate={{
                scale: [1, 2.5, 80],
                opacity: [1, 1, 0],
              }}
              transition={{
                duration: 2.8,
                ease: "easeIn",
              }}
              className="w-4 h-4 rounded-full bg-[#F5D9A0] shadow-[0_0_80px_#F5D9A0] pointer-events-none"
            />
            <p className="font-mono-astronomy text-xs text-[#F5D9A0]/70 tracking-[0.3em] uppercase mt-8">
              11:11 // THE CELESTIAL AWAKENING
            </p>
          </motion.div>
        )}

        {/* SUBSTAGE 2: SPIRAL GALAXY EMERGENCE */}
        {subStage === "galaxy" && (
          <motion.div
            key="galaxy"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center text-center max-w-xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080D20]/80 border border-[#F5D9A0]/25 backdrop-blur-md mb-4 text-[11px] font-mono-astronomy tracking-widest text-[#F5D9A0] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D9A0]" />
              <span>THE LIVING GALAXY</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-5xl text-[#E4E7F3] font-light text-glow-silver leading-relaxed">
              Every star in this galaxy aligns tonight.
            </h2>
          </motion.div>
        )}

        {/* SUBSTAGE 3: THE CONSTELLATION OF MARIA */}
        {subStage === "maria" && (
          <motion.div
            key="maria"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.2 }}
            className="flex flex-col items-center text-center max-w-2xl mt-48 sm:mt-64"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080D20]/80 border border-[#F5D9A0]/30 backdrop-blur-md mb-4 text-xs font-mono-astronomy tracking-widest text-[#F5D9A0] uppercase">
              <span>CONSTELLATION: {astronomyConfig.constellationMaria.title}</span>
            </div>
            <p className="font-serif-luxury italic text-xl sm:text-3xl text-[#E4E7F3]/90 font-light max-w-xl leading-relaxed text-glow-silver">
              &ldquo;{astronomyConfig.constellationMaria.subtext}&rdquo;
            </p>
          </motion.div>
        )}

        {/* SUBSTAGE 4: THE CINEMATIC WISH REVEAL */}
        {subStage === "wish" && (
          <motion.div
            key="wish"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center text-center max-w-3xl px-4"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080D20]/80 border border-[#F5D9A0]/25 backdrop-blur-md mb-8 text-xs font-mono-astronomy tracking-widest text-[#F5D9A0] uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F5D9A0]" />
              <span>THE 11:11 WISH</span>
            </div>

            <div className="min-h-[160px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={wishIndex}
                  initial={{ opacity: 0, y: 25, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -25, filter: "blur(12px)" }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className={`font-serif-luxury leading-relaxed tracking-wide ${
                    wishIndex === 3
                      ? "text-3xl sm:text-5xl md:text-6xl text-[#F5D9A0] text-glow-gold-super font-normal"
                      : "text-2xl sm:text-4xl md:text-5xl text-[#E4E7F3] font-light text-glow-silver"
                  }`}
                >
                  &ldquo;{astronomyConfig.wishReveal.lines[wishIndex]}&rdquo;
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* SUBSTAGE 5: THE PERSONAL LOVE LETTER TO MARIA */}
        {subStage === "letter" && (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl w-full rounded-2xl p-7 sm:p-10 md:p-12 glass-astronomy-elevated border border-[#F5D9A0]/30 shadow-[0_0_80px_rgba(80,59,131,0.5)] my-auto text-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#F5D9A0]/20 text-xs font-mono-astronomy text-[#F5D9A0]/80 tracking-widest uppercase">
              <span>CELESTIAL DISPATCH // 11:11 PM</span>
              <span>FOR MARIA</span>
            </div>

            {/* Salutation */}
            <h3 className="font-serif-luxury text-3xl sm:text-4xl text-[#F5D9A0] font-normal mb-6 text-glow-gold">
              {astronomyConfig.letter.salutation}
            </h3>

            {/* Letter Paragraphs */}
            <div className="space-y-4 font-serif-luxury text-base sm:text-lg md:text-xl text-[#E4E7F3]/90 font-light leading-relaxed">
              {astronomyConfig.letter.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className={
                    p.includes("One more chance") || p.includes("get it right")
                      ? "text-[#F5D9A0] font-normal py-1"
                      : ""
                  }
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div className="mt-10 pt-6 border-t border-[#F5D9A0]/20 flex flex-col items-end text-right">
              <p className="font-display-luxury italic text-sm text-[#7995CC]">
                {astronomyConfig.letter.closing}
              </p>
              <p className="font-serif-luxury text-xl sm:text-2xl text-[#F5D9A0] font-medium tracking-wide mt-1">
                {astronomyConfig.letter.signature}
              </p>
            </div>

            {/* Button to proceed to the Final Astronomical Constellation */}
            <div className="mt-8 pt-4 flex justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProceedToFinale}
                className="group relative px-8 py-3.5 rounded-full overflow-hidden bg-gradient-to-r from-[#080D20] via-[#503B83] to-[#080D20] border border-[#F5D9A0]/40 text-xs font-mono-astronomy tracking-[0.25em] uppercase text-[#E4E7F3] shadow-[0_0_30px_rgba(245,217,160,0.25)] cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Heart className="w-3.5 h-3.5 text-[#F5D9A0] fill-[#F5D9A0]" />
                  <span>THE FINAL CONSTELLATION</span>
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* SUBSTAGE 6: THE FINAL CONSTELLATION & ETERNAL COSMOS */}
        {subStage === "finale" && (
          <motion.div
            key="finale"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex flex-col items-center text-center max-w-2xl my-auto"
          >
            {/* The Stanzas */}
            <div className="space-y-2 mb-8 font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#E4E7F3]/80 font-light tracking-wide">
              <p>{astronomyConfig.finale.stanza1}</p>
              <p>{astronomyConfig.finale.stanza2}</p>
              <p className="text-[#F5D9A0]">{astronomyConfig.finale.stanza3}</p>
            </div>

            {/* Maria */}
            <h1 className="font-serif-luxury text-5xl sm:text-7xl md:text-8xl text-[#F5D9A0] text-glow-gold-super font-normal mb-6">
              {astronomyConfig.finale.name}
            </h1>

            {/* Promise */}
            <p className="font-serif-luxury italic text-xl sm:text-2xl md:text-3xl text-[#E4E7F3] max-w-xl leading-relaxed mb-8">
              &ldquo;{astronomyConfig.finale.promise}&rdquo;
            </p>

            {/* 11:11 ❤️ */}
            <div className="font-serif-luxury text-3xl sm:text-4xl text-[#F5D9A0] font-medium tracking-widest mb-12">
              {astronomyConfig.finale.signoff}
            </div>

            {/* Controls to Replay or Return to Observatory */}
            <div className="flex items-center gap-4">
              <button
                onClick={onReset}
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-[#080D20]/80 border border-[#F5D9A0]/30 hover:border-[#F5D9A0] text-xs font-mono-astronomy tracking-widest uppercase text-[#E4E7F3] hover:text-[#F5D9A0] transition-colors shadow-lg cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                <span>RETURN TO OBSERVATORY</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
