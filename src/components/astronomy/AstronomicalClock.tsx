"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { astronomyConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { AstronomyPhase } from "./DeepSpaceCanvas";
import { Sparkles, Compass } from "lucide-react";

interface AstronomicalClockProps {
  onPhaseChange: (phase: AstronomyPhase) => void;
  onAwaken: () => void;
  overrideSeconds?: number | null; // For time-travel/simulation
}

export default function AstronomicalClock({
  onPhaseChange,
  onAwaken,
  overrideSeconds = null,
}: AstronomicalClockProps) {
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState<AstronomyPhase>("observatory");
  const lastSecondRef = useRef<number | null>(null);

  // Target timestamp in ms
  const targetTimeMs = new Date(astronomyConfig.observatory.targetTimeISO).getTime();

  useEffect(() => {
    let animId: number;

    const tick = () => {
      let remaining: number;

      if (overrideSeconds !== null) {
        // Simulation mode
        remaining = overrideSeconds * 1000;
      } else {
        const now = Date.now();
        remaining = Math.max(0, targetTimeMs - now);
      }

      setTimeRemaining(remaining);

      const sec = Math.ceil(remaining / 1000);

      // Sound and phase triggers
      if (remaining <= 0) {
        if (currentPhase !== "awakening") {
          setCurrentPhase("awakening");
          onPhaseChange("awakening");
          onAwaken();
        }
      } else if (remaining <= 10000) {
        if (currentPhase !== "imminent") {
          setCurrentPhase("imminent");
          onPhaseChange("imminent");
        }
        if (lastSecondRef.current !== sec && sec <= 10 && sec >= 1) {
          lastSecondRef.current = sec;
          soundManager.playGravitationalPulse(55 + (11 - sec) * 8);
        }
      } else if (remaining <= 60000) {
        if (currentPhase !== "accelerating") {
          setCurrentPhase("accelerating");
          onPhaseChange("accelerating");
          soundManager.startDeepSpaceDrone(55);
        }
      } else {
        if (currentPhase !== "observatory") {
          setCurrentPhase("observatory");
          onPhaseChange("observatory");
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [overrideSeconds, targetTimeMs, currentPhase, onPhaseChange, onAwaken]);

  // Break down remaining time into hours, minutes, seconds, milliseconds
  const totalSeconds = Math.floor(timeRemaining / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((timeRemaining % 1000) / 10);

  const isLast60s = timeRemaining <= 60000 && timeRemaining > 0;
  const isLast30s = timeRemaining <= 30000 && timeRemaining > 0;
  const isLast10s = timeRemaining <= 10000 && timeRemaining > 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden select-none">
      {/* Top Observatory Coordinates & Header */}
      <div className="absolute top-10 left-6 right-6 flex flex-col sm:flex-row items-center justify-between text-xs font-mono-astronomy text-[#E4E7F3]/60 tracking-widest uppercase gap-3 z-20">
        <div className="flex items-center gap-3">
          <Compass className="w-4 h-4 text-[#F5D9A0]" />
          <span>CELESTIAL OBSERVATORY // 11:11 PM IST</span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-[#7995CC]">
          <span>RA: {astronomyConfig.observatory.coordinates.rightAscension}</span>
          <span>•</span>
          <span>DEC: {astronomyConfig.observatory.coordinates.declination}</span>
          <span>•</span>
          <span>EPOCH: {astronomyConfig.observatory.coordinates.epoch}</span>
        </div>
      </div>

      {/* Main Central Astronomical Instrument / Dial */}
      <div className="relative w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] flex items-center justify-center my-auto">
        {/* Outer Orbital Ring with Degree Ticks */}
        <div
          className={`absolute inset-0 rounded-full border transition-all duration-1000 ${
            isLast30s
              ? "border-[#F5D9A0]/60 box-glow-gold"
              : "border-[#E4E7F3]/15"
          } ${isLast60s ? "animate-spin-slow" : ""}`}
        >
          {/* Degree Ticks */}
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-[#E4E7F3]/30 origin-bottom"
              style={{
                transform: `rotate(${i * 15}deg) translateY(-2px)`,
                transformOrigin: "center 170px sm:center 240px md:center 280px",
              }}
            />
          ))}
        </div>

        {/* Second Concentric Ring: Astrolabe Declination Ring */}
        <div
          className={`absolute inset-6 sm:inset-10 rounded-full border transition-all duration-1000 ${
            isLast30s
              ? "border-[#F5D9A0]/40"
              : "border-[#7995CC]/20"
          } ${isLast60s ? "animate-spin-reverse-slow" : ""}`}
        />

        {/* Third Inner Ring: Equinoctial Track */}
        <div className="absolute inset-14 sm:inset-20 rounded-full border border-dashed border-[#E4E7F3]/15" />

        {/* Moon Phase Indicator orbiting on perimeter */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: isLast60s ? 15 : 60,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center">
            {/* Textured Moon sphere */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#11152F] via-[#7995CC] to-[#E4E7F3] shadow-[0_0_15px_rgba(228,231,243,0.5)] border border-[#E4E7F3]/50" />
            <span className="text-[9px] font-mono-astronomy text-[#E4E7F3]/70 mt-1 tracking-tighter">
              LUNA
            </span>
          </div>
        </motion.div>

        {/* Celestial Dial Center Content */}
        <div className="relative z-10 flex flex-col items-center text-center max-w-sm px-4">
          {/* Subtle Dedication Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#080D20]/70 border border-[#F5D9A0]/20 backdrop-blur-md mb-4 text-[11px] font-mono-astronomy tracking-[0.25em] text-[#F5D9A0] uppercase">
            <Sparkles className="w-3 h-3 text-[#F5D9A0]" />
            <span>{astronomyConfig.observatory.dedication}</span>
          </div>

          {/* Main Astronomical Countdown */}
          {!isLast10s ? (
            <div className="flex flex-col items-center">
              <div className="flex items-baseline justify-center font-mono-astronomy text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-[#E4E7F3] text-glow-silver">
                <span>{String(hours).padStart(2, "0")}</span>
                <span className="text-[#F5D9A0] animate-pulse px-1">:</span>
                <span>{String(minutes).padStart(2, "0")}</span>
                <span className="text-[#F5D9A0] animate-pulse px-1">:</span>
                <span className={isLast60s ? "text-[#F5D9A0] text-glow-gold" : ""}>
                  {String(seconds).padStart(2, "0")}
                </span>
              </div>

              {/* Milliseconds and Target Subtext */}
              <div className="mt-2 flex items-center gap-2 font-mono-astronomy text-xs sm:text-sm text-[#7995CC] tracking-widest uppercase">
                <span>.{String(milliseconds).padStart(2, "0")}s REMAINING</span>
                <span>{"//"}</span>
                <span className="text-[#F5D9A0]">{astronomyConfig.observatory.targetTimeLabel}</span>
              </div>
            </div>
          ) : (
            <div className="h-28 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={seconds}
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(16px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.6, filter: "blur(20px)" }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="font-serif-luxury text-7xl sm:text-8xl md:text-9xl text-[#F5D9A0] text-glow-gold-super font-normal"
                >
                  {seconds === 0 ? "11:11" : seconds}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {/* Observatory Status Text */}
          <div className="mt-6 text-center">
            <h2 className="font-serif-luxury text-lg sm:text-xl md:text-2xl text-[#E4E7F3]/90 font-light tracking-wide">
              {isLast10s
                ? astronomyConfig.countdown.statusTenSeconds
                : isLast30s
                ? astronomyConfig.countdown.statusThirtySeconds
                : isLast60s
                ? astronomyConfig.countdown.statusSixtySeconds
                : astronomyConfig.observatory.headline}
            </h2>
            <p className="font-display-luxury italic text-xs sm:text-sm text-[#7995CC]/80 mt-1">
              &ldquo;{astronomyConfig.observatory.subheadline}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Status Ticker */}
      <div className="absolute bottom-10 left-6 right-6 flex items-center justify-between text-xs font-mono-astronomy text-[#E4E7F3]/40 tracking-widest uppercase z-20">
        <span>STATUS: {currentPhase.toUpperCase()}</span>
        <span className="hidden sm:inline">ALIGNED WITH NOVEMBER 11, 2026 // 11:11 PM IST</span>
      </div>
    </div>
  );
}
