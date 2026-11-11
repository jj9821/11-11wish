"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLenis } from "@/components/animation/SmoothScroll";

interface SceneStep {
  id: string;
  number: string;
  label: string;
}

const scenes: SceneStep[] = [
  { id: "scene-intro", number: "01", label: "The Introduction" },
  { id: "scene-wish", number: "02", label: "The Wish" },
  { id: "scene-reveal", number: "03", label: "The Confession" },
  { id: "scene-letter", number: "04", label: "The Letter" },
  { id: "scene-universe", number: "05", label: "Our Universe" },
  { id: "scene-wishes", number: "06", label: "Five Wishes" },
  { id: "scene-finale", number: "07", label: "The Constellation" },
];

export default function ProgressIndicator() {
  const [activeScene, setActiveScene] = useState<string>("scene-intro");
  const [hoveredScene, setHoveredScene] = useState<string | null>(null);
  const { scrollTo } = useLenis();

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
          setActiveScene(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: [0.3, 0.6],
    });

    scenes.forEach((scene) => {
      const el = document.getElementById(scene.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScrollTo = (id: string) => {
    scrollTo(`#${id}`, { offset: 0, duration: 1.6 });
  };

  return (
    <nav
      aria-label="Scene progress"
      className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-4"
    >
      {/* Subtle constellation line connecting dots */}
      <div className="absolute top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-[#EBD5A5]/20 to-transparent pointer-events-none" />

      {scenes.map((scene) => {
        const isActive = activeScene === scene.id;
        const isHovered = hoveredScene === scene.id;

        return (
          <div
            key={scene.id}
            className="relative flex items-center justify-end group py-1"
            onMouseEnter={() => setHoveredScene(scene.id)}
            onMouseLeave={() => setHoveredScene(null)}
          >
            {/* Label Tooltip */}
            {(isHovered || isActive) && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-7 pointer-events-none whitespace-nowrap flex items-center gap-2 px-2.5 py-1 rounded bg-[#090D20]/90 border border-[#EBD5A5]/25 text-[11px] tracking-wider uppercase backdrop-blur-md shadow-lg"
              >
                <span className="text-[#EBD5A5] font-serif-luxury font-semibold">
                  {scene.number}
                </span>
                <span className="text-[#FFF9F2]/90 font-sans">{scene.label}</span>
              </motion.div>
            )}

            {/* Constellation Star Dot */}
            <button
              onClick={() => handleScrollTo(scene.id)}
              aria-label={`Jump to ${scene.label}`}
              className="relative w-5 h-5 flex items-center justify-center cursor-pointer transition-transform focus:outline-none"
            >
              {isActive && (
                <motion.span
                  layoutId="active-dot-ring"
                  className="absolute inset-0 rounded-full border border-[#EBD5A5] shadow-[0_0_12px_rgba(235,213,165,0.7)]"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-2 h-2 bg-[#EBD5A5] shadow-[0_0_8px_#EBD5A5]"
                    : "w-1.5 h-1.5 bg-[#FFF9F2]/30 group-hover:bg-[#FFF9F2]/80 group-hover:scale-125"
                }`}
              />
            </button>
          </div>
        );
      })}
    </nav>
  );
}
