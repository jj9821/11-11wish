"use client";

import React, { useState } from "react";
import SmoothScroll from "@/components/animation/SmoothScroll";
import StarField from "@/components/animation/StarField";
import CustomCursor from "@/components/animation/CustomCursor";
import MusicToggle from "@/components/ui/MusicToggle";
import ProgressIndicator from "@/components/ui/ProgressIndicator";

import IntroScene from "@/components/experience/IntroScene";
import WishScene from "@/components/experience/WishScene";
import RevealScene from "@/components/experience/RevealScene";
import LetterScene from "@/components/experience/LetterScene";
import MemoryGallery from "@/components/experience/MemoryGallery";
import WishesScene from "@/components/experience/WishesScene";
import FinaleScene from "@/components/experience/FinaleScene";

import { loveConfig } from "@/config/love-config";
import { Heart } from "lucide-react";

export default function Home() {
  const [isConstellationActive, setIsConstellationActive] = useState(false);

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#05050B] text-[#FFF9F2] selection:bg-[#211333] selection:text-[#EBD5A5] overflow-x-hidden">
        {/* Interactive Deep Space Canvas Starfield */}
        <StarField
          showConstellation={isConstellationActive}
          constellationProgress={isConstellationActive ? 1 : 0}
          density="medium"
          interactive={true}
        />

        {/* Floating Controls & Overlays */}
        <CustomCursor />
        <MusicToggle />
        <ProgressIndicator />

        {/* The 7 Cinematic Narrative Scenes */}
        <div className="relative z-10 flex flex-col w-full">
          {/* Scene 01: The Introduction */}
          <IntroScene />

          {/* Scene 02: The Wish */}
          <WishScene />

          {/* Scene 03: The Unexpected Reveal ("BUT I WISH FOR YOU.") */}
          <RevealScene />

          {/* Scene 04: The 3D Letter */}
          <LetterScene />

          {/* Scene 05: Our Little Universe (Memory Gallery) */}
          <MemoryGallery />

          {/* Scene 06: Five Little Wishes */}
          <WishesScene />

          {/* Scene 07: The Grand Finale (Heart Constellation) */}
          <FinaleScene onConstellationActivate={setIsConstellationActive} />

          {/* Minimal Romantic Colophon */}
          <footer className="relative z-10 py-12 px-4 text-center border-t border-[#EBD5A5]/10 text-xs font-mono text-[#FFF9F2]/40 tracking-widest uppercase">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span>FOR {loveConfig.names.herName}</span>
              <Heart className="w-3 h-3 text-[#D99CB7] fill-[#D99CB7]" />
              <span>FROM {loveConfig.names.myName}</span>
            </div>
            <p className="text-[10px] text-[#FFF9F2]/25">
              11:11 // DEDICATED TO EVERY WISH THAT LED TO YOU
            </p>
          </footer>
        </div>
      </main>
    </SmoothScroll>
  );
}
