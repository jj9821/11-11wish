"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { astronomyConfig } from "@/config/love-config";
import ImageLightbox from "@/components/ui/ImageLightbox";
import { Eye, Sparkles } from "lucide-react";

interface PeripheralMemoryGalleryProps {
  className?: string;
  isAwakened?: boolean;
}

interface PeripheralFrame {
  id: string;
  imageIndex: number;
  positionDesktop: string;
  positionMobile?: string;
  dimensionsDesktop: string;
  dimensionsMobile?: string;
  rotation: number;
  floatDelay: number;
  visibleOnMobile: boolean;
}

export default function PeripheralMemoryGallery({
  className = "",
  isAwakened = false,
}: PeripheralMemoryGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const memories = astronomyConfig.memories;

  // Carefully positioned 8 peripheral frames strictly surrounding the outer edges
  const frames: PeripheralFrame[] = [
    // 1. Top-Left
    {
      id: "frame-top-left",
      imageIndex: 0, // couple_sweet_selfie.jpg
      positionDesktop: "left-6 lg:left-10 top-20 xl:top-24",
      positionMobile: "left-3 top-16",
      dimensionsDesktop: "w-32 lg:w-40 h-28 lg:h-34",
      dimensionsMobile: "w-20 h-20",
      rotation: -2.5,
      floatDelay: 0,
      visibleOnMobile: true,
    },
    // 2. Top-Right
    {
      id: "frame-top-right",
      imageIndex: 1, // IMG_5175.jpg
      positionDesktop: "right-6 lg:right-10 top-20 xl:top-24",
      positionMobile: "right-3 top-16",
      dimensionsDesktop: "w-32 lg:w-36 h-40 lg:h-48",
      dimensionsMobile: "w-20 h-26",
      rotation: 2.2,
      floatDelay: 0.8,
      visibleOnMobile: true,
    },
    // 3. Middle-Upper Left
    {
      id: "frame-mid-upper-left",
      imageIndex: 2, // IMG_3574.jpg (monochrome)
      positionDesktop: "left-4 lg:left-8 top-[36%] xl:top-[38%]",
      dimensionsDesktop: "w-32 lg:w-40 h-28 lg:h-32",
      rotation: 1.5,
      floatDelay: 1.4,
      visibleOnMobile: false,
    },
    // 4. Middle-Lower Left
    {
      id: "frame-mid-lower-left",
      imageIndex: 3, // IMG_3578.jpg (monochrome)
      positionDesktop: "left-6 lg:left-10 top-[56%] xl:top-[58%]",
      dimensionsDesktop: "w-32 lg:w-38 h-28 lg:h-32",
      rotation: -1.8,
      floatDelay: 2.1,
      visibleOnMobile: false,
    },
    // 5. Middle-Upper Right
    {
      id: "frame-mid-upper-right",
      imageIndex: 4, // PXL_20230826 (summer)
      positionDesktop: "right-4 lg:right-8 top-[36%] xl:top-[38%]",
      dimensionsDesktop: "w-32 lg:w-36 h-40 lg:h-48",
      rotation: -1.5,
      floatDelay: 0.5,
      visibleOnMobile: false,
    },
    // 6. Middle-Lower Right
    {
      id: "frame-mid-lower-right",
      imageIndex: 5, // moment_cherished
      positionDesktop: "right-6 lg:right-10 top-[56%] xl:top-[58%]",
      dimensionsDesktop: "w-32 lg:w-36 h-36 lg:h-42",
      rotation: 2.4,
      floatDelay: 1.8,
      visibleOnMobile: false,
    },
    // 7. Bottom-Left
    {
      id: "frame-bottom-left",
      imageIndex: 2, // IMG_3574
      positionDesktop: "left-8 lg:left-14 bottom-14 xl:bottom-16",
      positionMobile: "left-3 bottom-14",
      dimensionsDesktop: "w-32 lg:w-40 h-28 lg:h-32",
      dimensionsMobile: "w-22 h-20",
      rotation: 2.0,
      floatDelay: 1.2,
      visibleOnMobile: true,
    },
    // 8. Bottom-Right
    {
      id: "frame-bottom-right",
      imageIndex: 4, // IMG_3659
      positionDesktop: "right-8 lg:right-14 bottom-14 xl:bottom-16",
      positionMobile: "right-3 bottom-14",
      dimensionsDesktop: "w-32 lg:w-38 h-38 lg:h-46",
      dimensionsMobile: "w-20 h-26",
      rotation: -2.2,
      floatDelay: 2.6,
      visibleOnMobile: true,
    },
  ];

  return (
    <>
      {/* Peripheral Memory Frames Container */}
      <aside
        aria-label="Peripheral Memory Frames"
        className={`fixed inset-0 pointer-events-none z-20 ${className}`}
      >
        {frames.map((frame) => {
          const memory = memories[frame.imageIndex % memories.length];
          const isHovered = hoveredId === frame.id;

          return (
            <div
              key={frame.id}
              className={`absolute ${frame.positionDesktop} ${
                frame.visibleOnMobile ? "flex" : "hidden md:flex"
              } pointer-events-auto select-none`}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [-3, 3, -3],
                  rotate: [
                    frame.rotation - 0.6,
                    frame.rotation + 0.6,
                    frame.rotation - 0.6,
                  ],
                }}
                transition={{
                  opacity: { duration: 1.4, delay: frame.floatDelay * 0.2 },
                  scale: { duration: 1.4 },
                  y: {
                    duration: 5 + frame.floatDelay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: frame.floatDelay,
                  },
                  rotate: {
                    duration: 7 + frame.floatDelay,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: frame.floatDelay,
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 0,
                  zIndex: 30,
                  transition: { duration: 0.3 },
                }}
                onClick={() => setSelectedPhotoIndex(frame.imageIndex % memories.length)}
                onMouseEnter={() => setHoveredId(frame.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`relative ${frame.dimensionsDesktop} rounded-xl overflow-hidden glass-astronomy border border-[#F5D9A0]/25 hover:border-[#F5D9A0]/70 shadow-[0_10px_35px_rgba(3,4,10,0.85)] hover:shadow-[0_0_25px_rgba(245,217,160,0.35)] cursor-pointer group transition-all duration-500 ${
                  isAwakened ? "opacity-80 hover:opacity-100" : "opacity-95"
                }`}
              >
                {/* Image */}
                <Image
                  src={memory.image}
                  alt={memory.alt || memory.title}
                  fill
                  sizes="(max-width: 768px) 120px, 180px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Celestial gradient rim and soft vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#03040A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Subtle starlight coordinate tag */}
                <div className="absolute bottom-1.5 left-2 right-2 flex items-center justify-between text-[9px] font-mono-astronomy text-[#F5D9A0]/90 truncate">
                  <span className="truncate">{memory.title}</span>
                  <Eye className="w-2.5 h-2.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Floating Tooltip Caption on Hover */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-[#080D20]/95 border border-[#F5D9A0]/40 backdrop-blur-md text-[10px] font-mono-astronomy text-[#E4E7F3] shadow-xl pointer-events-none z-50 flex items-center gap-1.5"
                    >
                      <Sparkles className="w-2.5 h-2.5 text-[#F5D9A0]" />
                      <span>{memory.subtitle}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </aside>

      {/* Lightbox for full-size inspection */}
      <ImageLightbox
        items={memories}
        currentIndex={selectedPhotoIndex}
        onClose={() => setSelectedPhotoIndex(null)}
        onNavigate={(index) => setSelectedPhotoIndex(index)}
      />
    </>
  );
}
