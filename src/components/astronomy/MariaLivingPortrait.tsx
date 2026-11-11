"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { mediaManifest } from "@/config/media-manifest";
import { Sparkles, Maximize2, X } from "lucide-react";
import Image from "next/image";

interface MariaLivingPortraitProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function MariaLivingPortrait({
  className = "",
  size = "md",
  showLabel = true,
}: MariaLivingPortraitProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);

  const videoAsset = mediaManifest.videos["maria-motion-loop"];
  const stillAsset = mediaManifest.images["img-3659-still"];

  const sizeClasses = {
    sm: "w-28 h-28 sm:w-36 sm:h-36",
    md: "w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60",
    lg: "w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80",
  }[size];

  return (
    <>
      <div className={`relative flex flex-col items-center ${className}`}>
        {/* Outer Astronomical Astrolabe Rings */}
        <div className={`relative ${sizeClasses} rounded-full p-2`}>
          {/* Rotating Celestial Gold Border */}
          <div className="absolute inset-0 rounded-full border border-[#F5D9A0]/35 box-glow-gold animate-spin-slow pointer-events-none" />
          <div className="absolute inset-1.5 rounded-full border border-dashed border-[#E4E7F3]/20 animate-spin-reverse-slow pointer-events-none" />

          {/* Core Lens Container */}
          <div
            onClick={() => setIsExpanded(true)}
            className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_40px_rgba(245,217,160,0.35)] cursor-pointer group bg-[#080D20] border border-[#F5D9A0]/50"
            title="Click to view full portrait"
          >
            {!hasVideoError ? (
              <video
                ref={videoRef}
                src={videoAsset.filePath}
                poster={videoAsset.posterImage}
                muted
                playsInline
                autoPlay
                loop
                onError={() => setHasVideoError(true)}
                className="w-full h-full object-cover scale-110 group-hover:scale-120 transition-transform duration-700"
              />
            ) : (
              <Image
                src={stillAsset.filePath}
                alt="Maria"
                fill
                className="object-cover scale-110 group-hover:scale-120 transition-transform duration-700"
              />
            )}

            {/* Inner soft golden vignette */}
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_25px_rgba(8,13,32,0.8)] pointer-events-none" />

            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-[#080D20]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Maximize2 className="w-5 h-5 text-[#F5D9A0]" />
            </div>
          </div>
        </div>

        {/* Delicate Astronomical Tag Below */}
        {showLabel && (
          <div className="mt-3 flex items-center gap-1.5 text-[10px] sm:text-xs font-mono-astronomy text-[#F5D9A0]/80 tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-[#F5D9A0]" />
            <span>MARIA // LIVING STARLIGHT</span>
          </div>
        )}
      </div>

      {/* Expanded Cinematic Lightbox Modal */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#03040A]/95 backdrop-blur-2xl"
          >
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 p-3 rounded-full bg-[#080D20]/80 text-[#E4E7F3] hover:text-[#F5D9A0] border border-[#F5D9A0]/30 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full rounded-3xl overflow-hidden glass-astronomy-elevated border border-[#F5D9A0]/40 shadow-[0_0_80px_rgba(245,217,160,0.3)]"
            >
              <div className="relative w-full aspect-[3/4] bg-black">
                <video
                  src={videoAsset.filePath}
                  poster={videoAsset.posterImage}
                  muted
                  playsInline
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080D20] via-transparent to-transparent opacity-75 pointer-events-none" />
              </div>

              <div className="p-6 text-center">
                <h3 className="font-serif-luxury text-2xl text-[#F5D9A0] font-normal mb-1">
                  Maria
                </h3>
                <p className="font-display-luxury italic text-xs text-[#7995CC]/90">
                  &ldquo;The wish I would make, every single time.&rdquo;
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
