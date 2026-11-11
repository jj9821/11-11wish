"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sun, Sparkles, Compass, Heart, Infinity as InfinityIcon, ChevronDown } from "lucide-react";
import { loveConfig, WishItem } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { useLenis } from "@/components/animation/SmoothScroll";

const iconMap = {
  sun: Sun,
  sparkles: Sparkles,
  compass: Compass,
  heart: Heart,
  infinity: InfinityIcon,
};

export default function WishesScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wishItemsRef = useRef<HTMLDivElement[]>([]);
  const { scrollTo } = useLenis();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      wishItemsRef.current.forEach((item, idx) => {
        if (!item) return;

        gsap.fromTo(
          item,
          {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse",
              onEnter: () => {
                // Subtle chime as user scrolls through wishes
                soundManager.playChime(659.25 + idx * 80);
              },
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-wishes"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-8 py-32 overflow-hidden select-none"
    >
      {/* Background radial gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#211333]/20 to-transparent pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-4xl mx-auto text-center mb-24">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090D20]/80 border border-[#EBD5A5]/25 backdrop-blur-md mb-4 text-xs font-mono uppercase tracking-widest text-[#EBD5A5]">
          <Heart className="w-3.5 h-3.5 text-[#D99CB7]" />
          <span>{loveConfig.wishesHeader.badge}</span>
        </div>

        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl text-[#FFF9F2] font-light text-glow-gold leading-tight">
          {loveConfig.wishesHeader.title}
        </h2>

        <p className="mt-4 font-display-luxury italic text-lg sm:text-2xl text-[#C4A6FF]/80 max-w-2xl mx-auto">
          &ldquo;{loveConfig.wishesHeader.subtitle}&rdquo;
        </p>
      </div>

      {/* The 5 Bespoke Wish Tableaus */}
      <div className="relative z-10 max-w-4xl w-full mx-auto space-y-16 md:space-y-24">
        {loveConfig.wishes.map((wish: WishItem, idx: number) => {
          const IconComponent = iconMap[wish.iconName] || Sparkles;

          return (
            <div
              key={wish.id}
              ref={(el) => {
                if (el) wishItemsRef.current[idx] = el;
              }}
              onClick={() => soundManager.playChime(739.99 + idx * 100)}
              className="group relative rounded-3xl p-8 sm:p-12 md:p-16 border border-[#EBD5A5]/15 hover:border-[#EBD5A5]/50 bg-gradient-to-br from-[#090D20]/80 via-[#131733]/50 to-[#05050B]/90 backdrop-blur-xl transition-all duration-700 shadow-[0_15px_45px_rgba(5,5,11,0.8)] hover:shadow-[0_20px_60px_rgba(33,19,51,0.8)] cursor-pointer"
            >
              {/* Dynamic Accent Ambient Glow */}
              <div
                className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none"
                style={{ backgroundColor: wish.accent }}
              />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
                {/* Left: Number & Icon */}
                <div className="flex items-center gap-6">
                  <span
                    className="font-serif-luxury text-6xl sm:text-7xl md:text-8xl font-light tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity"
                    style={{ color: wish.accent }}
                  >
                    {wish.number}
                  </span>

                  <div
                    className="p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-inner transition-transform duration-500 group-hover:scale-110"
                    style={{ color: wish.accent }}
                  >
                    <IconComponent className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                </div>

                {/* Right: Title, Subtitle, and Description */}
                <div className="flex-1 max-w-xl text-left">
                  <h3 className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#FFF9F2] font-medium mb-1 group-hover:text-[#EBD5A5] transition-colors">
                    {wish.title}
                  </h3>
                  <p className="font-display-luxury italic text-sm sm:text-base text-[#C4A6FF]/80 mb-4">
                    {wish.subtitle}
                  </p>
                  <div
                    className="w-12 h-0.5 rounded-full mb-4 transition-all duration-500 group-hover:w-20"
                    style={{ backgroundColor: wish.accent }}
                  />
                  <p className="text-sm sm:text-base text-[#FFF9F2]/75 font-light leading-relaxed">
                    {wish.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cue to Final Scene */}
      <div className="mt-24 text-center">
        <button
          onClick={() => scrollTo("#scene-finale", { duration: 1.8 })}
          className="flex flex-col items-center gap-2 text-xs text-[#FFF9F2]/40 hover:text-[#EBD5A5] transition-colors cursor-pointer font-sans tracking-widest uppercase mx-auto"
        >
          <span>THE FINAL CONSTELLATION</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
