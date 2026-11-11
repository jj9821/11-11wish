"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MapPin, Calendar, Sparkles, ChevronLeft, ChevronRight, Eye } from "lucide-react";
import { loveConfig } from "@/config/love-config";
import { soundManager } from "@/lib/sound";
import ImageLightbox from "@/components/ui/ImageLightbox";

export default function MemoryGallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Only apply heavy horizontal pinning on desktop
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 120);

      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
          pin: true,
          scrub: 1.2,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  const handleCardClick = (index: number) => {
    soundManager.playChime(1046.5);
    setSelectedPhotoIndex(index);
  };

  const scrollTrackBy = (amount: number) => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <>
      <section
        id="scene-universe"
        ref={sectionRef}
        className="relative w-full min-h-screen flex flex-col justify-center py-20 overflow-hidden bg-gradient-to-b from-transparent via-[#090D20]/60 to-transparent"
      >
        {/* Section Header */}
        <div className="relative z-10 px-6 sm:px-12 md:px-20 max-w-5xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#090D20]/80 border border-[#EBD5A5]/25 backdrop-blur-md mb-4 text-xs font-mono uppercase tracking-widest text-[#EBD5A5]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#EBD5A5]" />
            <span>{loveConfig.memoriesHeader.badge}</span>
          </motion.div>

          <h2 className="font-serif-luxury text-3xl sm:text-5xl md:text-6xl text-[#FFF9F2] font-normal leading-tight text-glow-gold">
            {loveConfig.memoriesHeader.title}
          </h2>

          <p className="mt-4 font-display-luxury italic text-base sm:text-xl text-[#C4A6FF]/80 max-w-2xl">
            {loveConfig.memoriesHeader.subtitle}
          </p>
        </div>

        {/* Desktop Navigation Arrows */}
        <div className="hidden lg:flex items-center gap-3 px-6 sm:px-12 md:px-20 mb-6">
          <button
            onClick={() => scrollTrackBy(-500)}
            aria-label="Scroll gallery left"
            className="p-3 rounded-full bg-[#090D20]/80 border border-[#EBD5A5]/20 text-[#FFF9F2] hover:text-[#EBD5A5] hover:border-[#EBD5A5]/60 transition-colors cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollTrackBy(500)}
            aria-label="Scroll gallery right"
            className="p-3 rounded-full bg-[#090D20]/80 border border-[#EBD5A5]/20 text-[#FFF9F2] hover:text-[#EBD5A5] hover:border-[#EBD5A5]/60 transition-colors cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <span className="text-xs font-mono tracking-widest text-[#FFF9F2]/40 ml-2 uppercase">
            Scroll or drag to explore
          </span>
        </div>

        {/* Gallery Cards Container */}
        <div
          ref={trackRef}
          className="relative z-10 flex gap-6 sm:gap-8 px-6 sm:px-12 md:px-20 overflow-x-auto lg:overflow-x-visible no-scrollbar pb-8 cursor-grab active:cursor-grabbing"
        >
          {loveConfig.memories.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              onClick={() => handleCardClick(index)}
              className="relative flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] rounded-2xl overflow-hidden glass-panel group cursor-pointer shadow-[0_15px_40px_rgba(5,5,11,0.8)] border border-[#EBD5A5]/20 hover:border-[#EBD5A5]/60 transition-all duration-500"
            >
              {/* Image Frame */}
              <div className="relative w-full h-[360px] sm:h-[420px] overflow-hidden bg-black">
                <Image
                  src={item.image}
                  alt={item.alt || item.title}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 340px, 380px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090D20] via-transparent to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-500" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono tracking-wider text-[#EBD5A5]">
                  <span className="px-2.5 py-1 rounded-full bg-[#05050B]/70 backdrop-blur-md border border-[#EBD5A5]/20">
                    MEMORY #{index + 1}
                  </span>
                  <span className="p-1.5 rounded-full bg-[#05050B]/70 backdrop-blur-md border border-[#EBD5A5]/20 text-[#FFF9F2]/70 group-hover:text-[#EBD5A5]">
                    <Eye className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>

              {/* Card Meta & Caption */}
              <div className="p-5 sm:p-6 bg-gradient-to-b from-[#090D20] to-[#05050B]">
                <div className="flex items-center gap-3 text-xs text-[#EBD5A5]/80 font-mono tracking-wider mb-2">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {item.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                </div>

                <h3 className="font-serif-luxury text-xl sm:text-2xl text-[#FFF9F2] group-hover:text-[#EBD5A5] transition-colors font-medium mb-1">
                  {item.title}
                </h3>
                <p className="font-display-luxury italic text-xs sm:text-sm text-[#C4A6FF]/80 mb-3">
                  {item.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-[#FFF9F2]/70 font-light line-clamp-2">
                  &ldquo;{item.caption}&rdquo;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <ImageLightbox
        items={loveConfig.memories}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(index) => setSelectedPhotoIndex(index)}
      />
    </>
  );
}
