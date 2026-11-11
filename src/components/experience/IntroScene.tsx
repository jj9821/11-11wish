"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { loveConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { useLenis } from "@/components/animation/SmoothScroll";

export default function IntroScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const digitsRef = useRef<HTMLDivElement | null>(null);
  const sparkRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLParagraphElement | null>(null);
  const text2Ref = useRef<HTMLParagraphElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);
  const flashOverlayRef = useRef<HTMLDivElement | null>(null);

  const { scrollTo } = useLenis();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // Initial state: spark starts small in center
      gsap.set(sparkRef.current, { scale: 0, opacity: 0 });
      gsap.set(digitsRef.current ? digitsRef.current.children : [], {
        y: 40,
        opacity: 0,
        filter: "blur(12px)",
      });
      gsap.set([text1Ref.current, text2Ref.current, scrollCueRef.current], {
        y: 20,
        opacity: 0,
      });

      // 1. Center spark blooms
      tl.to(sparkRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1.8,
        ease: "power2.inOut",
      })
        .to(sparkRef.current, {
          scale: 30,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
        })
        // 2. Digits reveal individually
        .to(
          digitsRef.current ? digitsRef.current.children : [],
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            stagger: 0.18,
            duration: 1.4,
            ease: "power4.out",
            onStart: () => {
              soundManager.playChime(1174.66);
            },
          },
          "-=0.6"
        )
        // 3. Subtitle lines stagger in
        .to(
          text1Ref.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
          },
          "-=0.4"
        )
        .to(
          text2Ref.current,
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
          },
          "-=0.6"
        )
        // 4. Scroll cue fades in
        .to(
          scrollCueRef.current,
          {
            y: 0,
            opacity: 1,
            duration: 1,
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleIlluminationClick = () => {
    soundManager.playChime(1318.51);
    // Cinematic flash of light
    if (flashOverlayRef.current) {
      gsap.fromTo(
        flashOverlayRef.current,
        { opacity: 0.85 },
        { opacity: 0, duration: 1.4, ease: "power2.out" }
      );
    }
    scrollTo("#scene-wish", { offset: 0, duration: 2 });
  };

  const digits = ["1", "1", ":", "1", "1"];

  return (
    <section
      id="scene-intro"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden select-none"
    >
      {/* Cinematic Flash Overlay */}
      <div
        ref={flashOverlayRef}
        className="pointer-events-none fixed inset-0 z-40 bg-[#FFF9F2] opacity-0"
        aria-hidden="true"
      />

      {/* Atmospheric center glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-[#EBD5A5]/10 via-[#211333]/20 to-transparent blur-3xl pointer-events-none" />

      {/* Center Golden Spark that expands initially */}
      <div
        ref={sparkRef}
        className="absolute w-6 h-6 rounded-full bg-[#EBD5A5] shadow-[0_0_60px_#EBD5A5] pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Subtle pill tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090D20]/60 border border-[#EBD5A5]/20 backdrop-blur-md mb-8 text-xs font-mono tracking-widest text-[#EBD5A5]/90 uppercase"
        >
          <Sparkles className="w-3 h-3 text-[#EBD5A5]" />
          <span>{`${loveConfig.anniversary.label} • ${loveConfig.anniversary.date}`}</span>
        </motion.div>

        {/* 11:11 Typography - Enormous, Luminous, Individual Digits */}
        <div
          ref={digitsRef}
          onClick={handleIlluminationClick}
          className="flex items-center justify-center font-serif-luxury font-light tracking-tight text-[18vw] sm:text-[16vw] md:text-[13rem] leading-none text-[#FFF9F2] text-glow-gold-lg cursor-pointer transition-transform hover:scale-[1.01]"
          title="Click to illuminate"
        >
          {digits.map((char, idx) => (
            <span
              key={idx}
              className={`inline-block px-0.5 sm:px-1 select-none transition-all duration-300 hover:text-[#EBD5A5] ${
                char === ":" ? "text-[#EBD5A5]/90 animate-pulse" : ""
              }`}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Subtitles */}
        <div className="mt-8 space-y-3 font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#FFF9F2]/90 font-light">
          <p ref={text1Ref} className="italic tracking-wide">
            &ldquo;{loveConfig.narrative.introLine1}&rdquo;
          </p>
          <p
            ref={text2Ref}
            className="text-lg sm:text-xl md:text-2xl text-[#EBD5A5] font-normal tracking-wider"
          >
            {loveConfig.narrative.introLine2}
          </p>
        </div>

        {/* Action Button & Scroll Indicator */}
        <div
          ref={scrollCueRef}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <button
            onClick={handleIlluminationClick}
            className="group relative px-7 py-3 rounded-full overflow-hidden border border-[#EBD5A5]/40 hover:border-[#EBD5A5] bg-[#090D20]/50 hover:bg-[#211333]/80 backdrop-blur-md text-xs font-sans tracking-[0.25em] uppercase text-[#FFF9F2] transition-all duration-500 shadow-[0_0_25px_rgba(235,213,165,0.15)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2 font-medium">
              <span>MAKE A WISH</span>
              <Sparkles className="w-3.5 h-3.5 text-[#EBD5A5] transition-transform group-hover:rotate-45" />
            </span>
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-[#EBD5A5]/20 to-transparent transition-transform duration-700" />
          </button>

          <button
            onClick={() => scrollTo("#scene-wish", { duration: 1.8 })}
            className="flex flex-col items-center gap-1.5 text-xs text-[#FFF9F2]/40 hover:text-[#EBD5A5] transition-colors mt-2 cursor-pointer font-sans tracking-widest uppercase"
          >
            <span className="text-[10px]">SCROLL TO WISH</span>
            <ChevronDown className="w-4 h-4 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
