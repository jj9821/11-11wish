"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MapPin, Calendar } from "lucide-react";
import { MemoryItem } from "@/config/love-config";
import { soundManager } from "@/lib/sound";

interface ImageLightboxProps {
  items: MemoryItem[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  items,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const isOpen = currentIndex !== null && currentIndex >= 0 && currentIndex < items.length;
  const currentItem = isOpen ? items[currentIndex] : null;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
        soundManager.playChime(987.77);
      } else if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
        soundManager.playChime(739.99);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || !currentItem) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-[#05050B]/95 backdrop-blur-2xl"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close photo view"
          className="absolute top-6 right-6 z-50 p-3 rounded-full bg-[#090D20]/80 text-[#FFF9F2] hover:text-[#EBD5A5] border border-[#EBD5A5]/25 hover:border-[#EBD5A5]/60 transition-colors shadow-2xl cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex - 1 + items.length) % items.length);
            soundManager.playChime(739.99);
          }}
          aria-label="Previous image"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#090D20]/80 text-[#FFF9F2] hover:text-[#EBD5A5] border border-[#EBD5A5]/20 hover:border-[#EBD5A5]/60 transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate((currentIndex + 1) % items.length);
            soundManager.playChime(987.77);
          }}
          aria-label="Next image"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#090D20]/80 text-[#FFF9F2] hover:text-[#EBD5A5] border border-[#EBD5A5]/20 hover:border-[#EBD5A5]/60 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Content Container */}
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, scale: 0.94, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="max-w-4xl w-full max-h-[85vh] flex flex-col md:flex-row rounded-2xl overflow-hidden bg-[#090D20]/90 border border-[#EBD5A5]/25 shadow-[0_0_50px_rgba(33,19,51,0.8)]"
        >
          {/* Image */}
          <div className="relative w-full md:w-3/5 h-[340px] md:h-[540px] bg-black">
            <Image
              src={currentItem.image}
              alt={currentItem.alt || currentItem.title}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#090D20] via-transparent to-transparent md:hidden" />
          </div>

          {/* Details / Caption */}
          <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-gradient-to-b from-[#090D20] to-[#05050B]">
            <div>
              <div className="flex items-center gap-4 text-xs text-[#EBD5A5]/80 font-mono tracking-wider uppercase mb-3">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {currentItem.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {currentItem.location}
                </span>
              </div>

              <h3 className="font-serif-luxury text-2xl md:text-3xl font-medium text-[#FFF9F2] mb-1">
                {currentItem.title}
              </h3>
              <p className="text-sm font-display-luxury italic text-[#C4A6FF]/80 mb-5">
                {currentItem.subtitle}
              </p>

              <div className="w-12 h-px bg-[#EBD5A5]/30 mb-5" />

              <p className="text-sm sm:text-base text-[#FFF9F2]/85 font-light leading-relaxed">
                &ldquo;{currentItem.caption}&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#EBD5A5]/15 flex items-center justify-between text-xs text-[#FFF9F2]/40 font-mono">
              <span>
                MEMORY {currentIndex + 1} OF {items.length}
              </span>
              <span>11:11 ARCHIVE</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
