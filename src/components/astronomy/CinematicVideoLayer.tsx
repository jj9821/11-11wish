"use client";

import React, { useEffect, useRef } from "react";
import { mediaManifest } from "@/config/media-manifest";
import { AstronomyPhase } from "./DeepSpaceCanvas";

interface CinematicVideoLayerProps {
  phase: AstronomyPhase;
}

export default function CinematicVideoLayer({ phase }: CinematicVideoLayerProps) {
  const ambientVideoRef = useRef<HTMLVideoElement | null>(null);
  const awakeningVideoRef = useRef<HTMLVideoElement | null>(null);

  const ambientAsset = mediaManifest.videos["deep-nebula-ambient"];
  const awakeningAsset = mediaManifest.videos["galaxy-awakening"];

  // Play ambient nebula during observatory & accelerating phases
  useEffect(() => {
    const video = ambientVideoRef.current;
    if (!video) return;

    if (phase === "observatory" || phase === "accelerating" || phase === "imminent") {
      video.play().catch(() => {
        // Autoplay policy or low power mode - poster image handles visual presentation
      });
    } else {
      // Pause to save decoding resources on mobile during heavy galaxy awakening
      video.pause();
    }
  }, [phase]);

  // Play awakening video during the 11:11 transformation
  useEffect(() => {
    const video = awakeningVideoRef.current;
    if (!video) return;

    if (phase === "awakening" || phase === "galaxy") {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [phase]);

  const showAwakeningVideo = phase === "awakening" || phase === "galaxy";
  const showAmbientVideo =
    phase === "observatory" || phase === "accelerating" || phase === "imminent";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Deep Space Ambient Nebula Video Loop */}
      <div
        className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
          showAmbientVideo ? (phase === "accelerating" || phase === "imminent" ? "opacity-60" : "opacity-35") : "opacity-0"
        }`}
      >
        <video
          ref={ambientVideoRef}
          src={ambientAsset.filePath}
          poster={ambientAsset.posterImage}
          muted
          playsInline
          loop
          autoPlay
          className="w-full h-full object-cover mix-blend-screen scale-105 transition-transform duration-10000"
          style={{
            filter: "contrast(1.15) brightness(0.9)",
          }}
        />
        {/* Radial Vignette Mask so text is always 100% legible */}
        <div className="absolute inset-0 bg-radial from-transparent via-[#03040A]/60 to-[#03040A]" />
      </div>

      {/* 2. Supernova & Galaxy Awakening Cinematic Video */}
      <div
        className={`absolute inset-0 transition-opacity duration-1200 ease-in-out ${
          showAwakeningVideo ? "opacity-85" : "opacity-0"
        }`}
      >
        <video
          ref={awakeningVideoRef}
          src={awakeningAsset.filePath}
          poster={awakeningAsset.posterImage}
          muted
          playsInline
          className="w-full h-full object-cover mix-blend-screen scale-110"
          style={{
            filter: "contrast(1.2) brightness(1.1)",
          }}
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#03040A]/40 to-[#03040A]" />
      </div>

      {/* Film grain subtle overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
