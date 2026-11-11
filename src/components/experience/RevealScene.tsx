"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, ChevronDown } from "lucide-react";
import { loveConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import { useLenis } from "@/components/animation/SmoothScroll";

export default function RevealScene() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const luminousBgRef = useRef<HTMLDivElement | null>(null);
  const hookRef = useRef<HTMLParagraphElement | null>(null);
  const premiseRef = useRef<HTMLParagraphElement | null>(null);
  const linesRef = useRef<HTMLDivElement | null>(null);
  const climaxContainerRef = useRef<HTMLDivElement | null>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const continueButtonRef = useRef<HTMLDivElement | null>(null);

  const { scrollTo } = useLenis();

  // Split climax text into individual characters for letter-by-letter reveal
  const climaxChars = loveConfig.narrative.revealClimax.split("");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Initially hide all elements
      gsap.set(hookRef.current, { opacity: 0, y: 30, filter: "blur(8px)" });
      gsap.set(premiseRef.current, { opacity: 0, y: 30, filter: "blur(8px)" });
      gsap.set(linesRef.current ? linesRef.current.children : [], {
        opacity: 0,
        y: 25,
      });
      gsap.set(luminousBgRef.current, { opacity: 0 });
      gsap.set(lettersRef.current, {
        opacity: 0,
        scale: 1.35,
        filter: "blur(14px)",
        y: 20,
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 25 });
      gsap.set(continueButtonRef.current, { opacity: 0, y: 20 });

      // Build ScrollTrigger timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 65%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });

      // 1. "Can I tell you something?"
      tl.to(hookRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.4,
        ease: "power3.out",
        onStart: () => soundManager.playChime(659.25),
      })
        // 2. "Everyone makes a wish at 11:11."
        .to(
          premiseRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.4,
            ease: "power3.out",
          },
          "+=0.4"
        )
        // 3. Stagger: Some wish for happiness, success, future
        .to(
          linesRef.current ? linesRef.current.children : [],
          {
            opacity: 1,
            y: 0,
            stagger: 0.8,
            duration: 1.1,
            ease: "power2.out",
          },
          "+=0.4"
        )
        // 4. Background blooms into luminous cosmic glow
        .to(
          luminousBgRef.current,
          {
            opacity: 1,
            duration: 2.2,
            ease: "power2.inOut",
          },
          "+=0.5"
        )
        // 5. Letter-by-letter reveal: "BUT I WISH FOR YOU."
        .to(
          lettersRef.current,
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            stagger: 0.05,
            duration: 1.2,
            ease: "power4.out",
            onStart: () => {
              soundManager.playWishBurst();
            },
          },
          "-=1.2"
        )
        // 6. Emotional subtitle & continue button
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "+=0.2"
        )
        .to(
          continueButtonRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="scene-reveal"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 py-32 overflow-hidden select-none"
    >
      {/* Dynamic Luminous Cosmic Background that blooms on reveal */}
      <div
        ref={luminousBgRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-1000"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-radial from-[#211333]/70 via-[#090D20]/80 to-[#05050B]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-radial from-[#EBD5A5]/15 via-[#C4A6FF]/10 to-transparent blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Intro question */}
        <p
          ref={hookRef}
          className="font-display-luxury italic text-xl sm:text-2xl md:text-3xl text-[#C4A6FF]/80 mb-6 font-light"
        >
          {loveConfig.narrative.revealHook}
        </p>

        {/* Premise */}
        <p
          ref={premiseRef}
          className="font-serif-luxury text-2xl sm:text-3xl md:text-4xl text-[#FFF9F2]/90 font-light mb-10 tracking-wide"
        >
          {loveConfig.narrative.revealPremise}
        </p>

        {/* The 3 wishes others make */}
        <div
          ref={linesRef}
          className="space-y-3 font-sans text-base sm:text-lg md:text-xl text-[#FFF9F2]/60 font-light tracking-wider uppercase mb-16"
        >
          <p className="transition-all hover:text-[#FFF9F2]">
            &ldquo;{loveConfig.narrative.revealStagger1}&rdquo;
          </p>
          <p className="transition-all hover:text-[#FFF9F2]">
            &ldquo;{loveConfig.narrative.revealStagger2}&rdquo;
          </p>
          <p className="transition-all hover:text-[#FFF9F2]">
            &ldquo;{loveConfig.narrative.revealStagger3}&rdquo;
          </p>
        </div>

        {/* The Grand Emotional Confession: "BUT I WISH FOR YOU." */}
        <div
          ref={climaxContainerRef}
          className="my-6 flex flex-wrap items-center justify-center gap-x-1.5 sm:gap-x-3 gap-y-2 text-center"
        >
          {climaxChars.map((char, index) => {
            if (char === " ") {
              return (
                <span
                  key={index}
                  className="inline-block w-3 sm:w-6"
                  aria-hidden="true"
                />
              );
            }
            return (
              <span
                key={index}
                ref={(el) => {
                  if (el) lettersRef.current[index] = el;
                }}
                className="inline-block font-serif-luxury font-medium text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-[#EBD5A5] text-glow-gold-lg select-none tracking-tight transform-gpu"
              >
                {char}
              </span>
            );
          })}
        </div>

        {/* Romantic Subtitle */}
        <p
          ref={subtitleRef}
          className="mt-8 font-serif-luxury italic text-xl sm:text-2xl md:text-3xl text-[#FFF9F2]/90 max-w-2xl leading-relaxed"
        >
          &ldquo;{loveConfig.narrative.revealSubtitle}&rdquo;
        </p>

        {/* Continue Button to Scene 04 Letter */}
        <div ref={continueButtonRef} className="mt-14 flex flex-col items-center gap-3">
          <button
            onClick={() => scrollTo("#scene-letter", { duration: 1.8 })}
            className="group relative px-8 py-3.5 rounded-full overflow-hidden border border-[#EBD5A5]/35 hover:border-[#EBD5A5] bg-[#090D20]/70 hover:bg-[#211333]/90 backdrop-blur-xl text-xs font-sans tracking-[0.25em] uppercase text-[#FFF9F2] transition-all duration-300 shadow-[0_0_30px_rgba(235,213,165,0.2)] hover:shadow-[0_0_40px_rgba(235,213,165,0.4)] cursor-pointer"
          >
            <span className="relative z-10 flex items-center gap-2.5 font-medium">
              <Heart className="w-3.5 h-3.5 text-[#EBD5A5] fill-[#EBD5A5]" />
              <span>A LETTER FOR YOU</span>
            </span>
          </button>

          <ChevronDown className="w-4 h-4 text-[#FFF9F2]/40 animate-bounce mt-2" />
        </div>
      </div>
    </section>
  );
}
