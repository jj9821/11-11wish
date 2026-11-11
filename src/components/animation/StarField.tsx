"use client";

import React, { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0.2 to 1
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  // Morphing for constellation
  targetX?: number;
  targetY?: number;
  isConstellation?: boolean;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  maxAlpha: number;
  decay: number;
  color: string;
  width: number;
  isGold?: boolean;
}

interface CosmicDust {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

interface StarFieldProps {
  showConstellation?: boolean;
  constellationProgress?: number; // 0 to 1
  density?: "low" | "medium" | "high";
  interactive?: boolean;
  className?: string;
}

export default function StarField({
  showConstellation = false,
  constellationProgress = 0,
  density = "medium",
  interactive = true,
  className = "",
}: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0 });
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initStars();
    };

    // Color palette for cosmic stars
    const starColors = [
      "#FFF9F2", // soft starlight white
      "#FFF9F2",
      "#FFF9F2",
      "#EBD5A5", // champagne gold
      "#C4A6FF", // soft lavender
      "#93C5FD", // faint blue
      "#D99CB7", // muted rose
    ];

    const isMobile = width < 768;
    const starCount =
      density === "low"
        ? isMobile
          ? 250
          : 500
        : density === "medium"
        ? isMobile
          ? 450
          : 900
        : isMobile
        ? 700
        : 1400;

    let stars: Star[] = [];
    const shootingStars: ShootingStar[] = [];
    let dustParticles: CosmicDust[] = [];
    let constellationStars: Star[] = [];

    // Parametric Heart coordinates for Scene 07 constellation
    const createHeartPoints = (count: number) => {
      const points: { x: number; y: number }[] = [];
      const centerX = width / 2;
      const centerY = height / 2 - 20;
      // Responsive scale for mobile vs desktop
      const scale = Math.min(width, height) * (isMobile ? 0.016 : 0.022);

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        // Heart formula
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(
          13 * Math.cos(t) -
          5 * Math.cos(2 * t) -
          2 * Math.cos(3 * t) -
          Math.cos(4 * t)
        );

        points.push({
          x: centerX + hx * scale,
          y: centerY + hy * scale,
        });
      }
      return points;
    };

    const initStars = () => {
      stars = [];
      constellationStars = [];
      const heartCount = 64;
      const heartPoints = createHeartPoints(heartCount);

      for (let i = 0; i < starCount; i++) {
        const z = 0.2 + Math.random() * 0.8;
        const star: Star = {
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size: Math.random() * (z > 0.8 ? 2.2 : 1.4) + 0.3,
          baseAlpha: 0.25 + Math.random() * 0.75,
          alpha: 0.5,
          twinkleSpeed: 0.008 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2,
          color: starColors[Math.floor(Math.random() * starColors.length)],
        };

        // Assign a subset of stars as constellation nodes
        if (i < heartCount) {
          star.targetX = heartPoints[i].x;
          star.targetY = heartPoints[i].y;
          star.isConstellation = true;
          constellationStars.push(star);
        }

        stars.push(star);
      }

      // Cosmic dust particles (slow ambient floating embers)
      const dustCount = isMobile ? 35 : 70;
      dustParticles = [];
      for (let i = 0; i < dustCount; i++) {
        dustParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: 1 + Math.random() * 2.5,
          alpha: 0.1 + Math.random() * 0.25,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.05 - Math.random() * 0.15,
          color: Math.random() > 0.5 ? "#EBD5A5" : "#C4A6FF",
        });
      }
    };

    // Trigger a shooting star with realistic angle and speed
    const spawnShootingStar = (forceGold = false) => {
      const angle = (Math.PI / 180) * (30 + Math.random() * 25);
      const startX = Math.random() * width * 1.2 - width * 0.1;
      const startY = Math.random() * (height * 0.4);

      shootingStars.push({
        x: startX,
        y: startY,
        length: 120 + Math.random() * 180,
        speed: 16 + Math.random() * 14,
        angle,
        alpha: 1,
        maxAlpha: 0.95,
        decay: 0.012 + Math.random() * 0.008,
        color: forceGold ? "#EBD5A5" : Math.random() > 0.4 ? "#FFF9F2" : "#EBD5A5",
        width: forceGold ? 2.5 : 1.5,
        isGold: forceGold,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    // Occasional shooting stars interval
    const shootingInterval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnShootingStar();
      }
    }, 4500);

    // Mouse movement parallax listener
    const onMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const cx = width / 2;
      const cy = height / 2;
      mouseRef.current.targetX = (e.clientX - cx) / cx;
      mouseRef.current.targetY = (e.clientY - cy) / cy;
    };

    // Window scroll listener for depth parallax
    const onScroll = () => {
      scrollRef.current.targetY = window.scrollY;
    };

    if (interactive) {
      window.addEventListener("mousemove", onMouseMove, { passive: true });
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    const render = () => {

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      scrollRef.current.y +=
        (scrollRef.current.targetY - scrollRef.current.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render subtle background nebula glows
      const grad1 = ctx.createRadialGradient(
        width * 0.3 + mouseRef.current.x * 30,
        height * 0.4 - scrollRef.current.y * 0.05,
        20,
        width * 0.3,
        height * 0.4,
        width * 0.65
      );
      grad1.addColorStop(0, "rgba(33, 19, 51, 0.28)");
      grad1.addColorStop(0.6, "rgba(9, 13, 32, 0.12)");
      grad1.addColorStop(1, "rgba(5, 5, 11, 0)");

      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Render cosmic dust
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < 0) p.y = height;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      });

      // Render Stars
      const progress = constellationProgress;

      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const twinkle = Math.sin(star.phase) * 0.35;
        star.alpha = Math.max(0.1, Math.min(1, star.baseAlpha + twinkle));

        let drawX = star.x - mouseRef.current.x * 25 * star.z;
        let drawY =
          star.y -
          mouseRef.current.y * 25 * star.z -
          (scrollRef.current.y * 0.12 * star.z) % height;
        if (drawY < 0) drawY += height;

        // If morphing to constellation in Scene 07
        if (showConstellation && star.isConstellation && star.targetX !== undefined && star.targetY !== undefined) {
          drawX = drawX * (1 - progress) + star.targetX * progress;
          drawY = drawY * (1 - progress) + star.targetY * progress;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;

        // Glow for brighter foreground stars
        if (star.size > 1.6 || (showConstellation && star.isConstellation && progress > 0.4)) {
          ctx.shadowBlur = star.size * 6;
          ctx.shadowColor = star.color;
        }

        ctx.fill();
        ctx.restore();
      });

      // Draw Constellation Lines when active
      if (showConstellation && progress > 0.1 && constellationStars.length > 1) {
        ctx.save();
        ctx.strokeStyle = `rgba(235, 213, 165, ${0.45 * progress})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#EBD5A5";

        ctx.beginPath();
        for (let i = 0; i < constellationStars.length; i++) {
          const s = constellationStars[i];
          const currX = (s.x - mouseRef.current.x * 10) * (1 - progress) + (s.targetX ?? s.x) * progress;
          const currY = (s.y - mouseRef.current.y * 10) * (1 - progress) + (s.targetY ?? s.y) * progress;

          if (i === 0) {
            ctx.moveTo(currX, currY);
          } else {
            ctx.lineTo(currX, currY);
          }
        }
        ctx.closePath();
        ctx.stroke();

        // Subtle internal celestial cross rays for center of heart
        if (progress > 0.7) {
          ctx.strokeStyle = `rgba(196, 166, 255, ${0.15 * progress})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          for (let i = 0; i < constellationStars.length; i += 4) {
            const s1 = constellationStars[i];
            const s2 = constellationStars[(i + 32) % constellationStars.length];
            const x1 = (s1.x) * (1 - progress) + (s1.targetX ?? s1.x) * progress;
            const y1 = (s1.y) * (1 - progress) + (s1.targetY ?? s1.y) * progress;
            const x2 = (s2.x) * (1 - progress) + (s2.targetX ?? s2.x) * progress;
            const y2 = (s2.y) * (1 - progress) + (s2.targetY ?? s2.y) * progress;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
          }
          ctx.stroke();
        }

        ctx.restore();
      }

      // Render Shooting Stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= s.decay;

        if (s.alpha <= 0 || s.x > width + 200 || s.y > height + 200) {
          shootingStars.splice(i, 1);
          continue;
        }

        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, "rgba(255, 255, 255, 0)");
        grad.addColorStop(0.7, s.color);
        grad.addColorStop(1, "#FFFFFF");

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.lineCap = "round";
        ctx.globalAlpha = Math.max(0, s.alpha);
        ctx.shadowBlur = s.isGold ? 16 : 8;
        ctx.shadowColor = s.color;
        ctx.stroke();

        // Bright star head spark
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();

        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearInterval(shootingInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, [showConstellation, constellationProgress, density, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
