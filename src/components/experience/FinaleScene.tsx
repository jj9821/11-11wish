"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { RotateCcw } from "lucide-react";
import { loveConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { useLenis } from "@/components/animation/SmoothScroll";

interface FinaleSceneProps {
  onConstellationActivate?: (active: boolean) => void;
}

export default function FinaleScene({
  onConstellationActivate,
}: FinaleSceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const line1Ref = useRef<HTMLParagraphElement | null>(null);
  const line2Ref = useRef<HTMLParagraphElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const promiseRef = useRef<HTMLParagraphElement | null>(null);
  const restartButtonRef = useRef<HTMLDivElement | null>(null);

  const [hasTriggeredConstellation, setHasTriggeredConstellation] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(timeRef.current, { opacity: 0, scale: 0.8, filter: "blur(12px)" });
      gsap.set(line1Ref.current, { opacity: 0, y: 25 });
      gsap.set(line2Ref.current, { opacity: 0, y: 25 });
      gsap.set(headingRef.current, { opacity: 0, scale: 0.9, filter: "blur(10px)" });
      gsap.set(promiseRef.current, { opacity: 0, y: 25 });
      gsap.set(restartButtonRef.current, { opacity: 0, y: 20 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            setHasTriggeredConstellation(true);
            onConstellationActivate?.(true);
            soundManager.playWishBurst();
          },
          onLeaveBack: () => {
            onConstellationActivate?.(false);
          },
        },
      });

      // 1. 11:11 appears
      tl.to(timeRef.current, {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out",
        onStart: () => soundManager.playChime(1174.66),
      })
        // 2. "Out of all the wishes in the universe..."
        .to(
          line1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "+=0.4"
        )
        // 3. "You're still my favourite."
        .to(
          line2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "+=0.5"
        )
        // 4. "Happy 11:11, my love."
        .to(
          headingRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.6,
            ease: "power3.out",
            onStart: () => soundManager.playChime(1479.98),
          },
          "+=0.5"
        )
        // 5. Final promise
        .to(
          promiseRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: "power3.out",
          },
          "+=0.4"
        )
        // 6. Restart button
        .to(
          restartButtonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onConstellationActivate]);

  const handleRestart = () => {
    soundManager.playWishBurst();
    try {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: 0.7 },
        colors: ["#EBD5A5", "#FFF9F2", "#C4A6FF", "#D99CB7"],
      });
    } catch {
      // Ignore
    }
    scrollTo("#scene-intro", { duration: 2.2 });
  };

  return (
    <section
      id="scene-finale"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-36 overflow-hidden select-none"
    >
      {/* Dynamic Cosmic Constellation Aura */}
      <div className="absolute inset-0 bg-radial from-[#211333]/40 via-[#090D20]/70 to-[#05050B] pointer-events-none" />

      {/* Visual Glowing Constellation Heart Geometry */}
      <div className="relative mb-12 flex items-center justify-center">
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.75, 1, 0.75],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center"
        >
          {/* Heart constellation line work */}
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full text-[#EBD5A5] drop-shadow-[0_0_25px_rgba(235,213,165,0.7)]"
          >
            {/* Constellation lines */}
            <path
              d="M100,165 L45,110 Q25,85 25,60 Q25,30 55,30 Q80,30 100,55 Q120,30 145,30 Q175,30 175,60 Q175,85 155,110 Z"
              fill="none"
              stroke="rgba(235, 213, 165, 0.4)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            {/* Cross constellation celestial threads */}
            <line x1="100" y1="55" x2="100" y2="165" stroke="rgba(196, 166, 255, 0.25)" strokeWidth="1" />
            <line x1="55" y1="30" x2="145" y2="30" stroke="rgba(196, 166, 255, 0.25)" strokeWidth="1" />
            <line x1="45" y1="110" x2="155" y2="110" stroke="rgba(196, 166, 255, 0.25)" strokeWidth="1" />

            {/* Glowing Constellation Star Nodes */}
            {[
              [100, 165],
              [45, 110],
              [25, 60],
              [55, 30],
              [100, 55],
              [145, 30],
              [175, 60],
              [155, 110],
            ].map(([cx, cy], i) => (
              <g key={i}>
                <circle cx={cx} cy={cy} r="3" fill="#FFF9F2" />
                <circle cx={cx} cy={cy} r="6" fill="none" stroke="#EBD5A5" strokeWidth="0.8" opacity="0.6" />
              </g>
            ))}
          </svg>

          {/* Golden shooting star trail cutting through heart */}
          <motion.div
            initial={{ x: -120, y: -80, opacity: 0 }}
            animate={
              hasTriggeredConstellation
                ? {
                    x: [ -120, 140 ],
                    y: [ -80, 100 ],
                    opacity: [ 0, 1, 0 ],
                  }
                : {}
            }
            transition={{
              duration: 2.2,
              repeat: Infinity,
              repeatDelay: 5,
              ease: "easeOut",
            }}
            className="absolute w-24 h-0.5 bg-gradient-to-r from-transparent via-[#EBD5A5] to-white rotate-45 pointer-events-none shadow-[0_0_15px_#EBD5A5]"
          />
        </motion.div>
      </div>

      {/* Narrative Finale */}
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Luminous 11:11 */}
        <div
          ref={timeRef}
          className="font-serif-luxury text-6xl sm:text-7xl md:text-8xl text-[#FFF9F2] text-glow-gold font-light mb-6"
        >
          {loveConfig.finale.time}
        </div>

        {/* Narrative lines */}
        <p
          ref={line1Ref}
          className="font-serif-luxury italic text-xl sm:text-2xl md:text-3xl text-[#FFF9F2]/80 mb-2 font-light"
        >
          &ldquo;{loveConfig.finale.line1}&rdquo;
        </p>

        <p
          ref={line2Ref}
          className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#EBD5A5] mb-8 font-normal"
        >
          {loveConfig.finale.line2}
        </p>

        {/* Grand Emotional Headline */}
        <h2
          ref={headingRef}
          className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#FFF9F2] text-glow-gold-lg font-normal mb-8 leading-tight"
        >
          {loveConfig.finale.heading}
        </h2>

        {/* Final Promise */}
        <p
          ref={promiseRef}
          className="font-serif-luxury italic text-lg sm:text-2xl text-[#C4A6FF]/90 max-w-2xl leading-relaxed mb-12"
        >
          &ldquo;{loveConfig.finale.promise}&rdquo;
        </p>

        {/* Anniversary Tag */}
        <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#EBD5A5]/80 uppercase mb-12">
          <span>{loveConfig.anniversary.date}</span>
          <span>•</span>
          <span>{loveConfig.names.myName} & {loveConfig.names.herName}</span>
        </div>

        {/* "MAKE ANOTHER WISH" Button */}
        <div ref={restartButtonRef}>
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRestart}
            className="group relative px-9 py-4 rounded-full overflow-hidden bg-gradient-to-r from-[#EBD5A5] via-[#FFF9F2] to-[#EBD5A5] text-[#05050B] font-sans font-semibold text-xs tracking-[0.25em] uppercase shadow-[0_0_50px_rgba(235,213,165,0.7)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2.5">
              <RotateCcw className="w-3.5 h-3.5 text-[#05050B] transition-transform duration-500 group-hover:-rotate-180" />
              <span>{loveConfig.finale.restartButtonText}</span>
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
}
