"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Only enable on desktop mouse devices
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches || reducedMotion) {
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (target) {
        const clickable = target.closest("button, a, [role='button'], input, .cursor-pointer");
        setIsPointer(!!clickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updateMousePosition, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, reducedMotion]);

  if (!isVisible || reducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Outer subtle aura */}
      <motion.div
        animate={{
          x: mousePosition.x - (isPointer ? 16 : 10),
          y: mousePosition.y - (isPointer ? 16 : 10),
          scale: isPointer ? 1.6 : 1,
          opacity: isPointer ? 0.8 : 0.45,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.2,
        }}
        className="w-5 h-5 rounded-full border border-[#EBD5A5]/60 shadow-[0_0_12px_rgba(235,213,165,0.4)]"
      />

      {/* Center pinpoint starlight spark */}
      <motion.div
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{
          type: "spring",
          stiffness: 1000,
          damping: 40,
          mass: 0.1,
        }}
        className="w-1 h-1 rounded-full bg-[#FFF9F2] shadow-[0_0_8px_#EBD5A5]"
      />
    </div>
  );
}
