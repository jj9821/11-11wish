"use client";

import React, { useEffect, useRef } from "react";
import { astronomyConfig } from "@/config/love-config";

export type AstronomyPhase =
  | "observatory"
  | "accelerating" // T <= 60s
  | "imminent"     // T <= 10s
  | "awakening"    // Supernova burst
  | "galaxy"       // Living spiral galaxy
  | "maria"        // Constellation of MARIA
  | "wish"         // Cinematic wish reveal
  | "letter"       // Peaceful starlit letter
  | "finale";      // Final astronomical heart constellation

interface DeepSpaceCanvasProps {
  phase: AstronomyPhase;
  mariaProgress?: number; // 0 to 1
  heartProgress?: number; // 0 to 1
  awakeningProgress?: number; // 0 to 1
  className?: string;
}

interface StarNode {
  x: number;
  y: number;
  z: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  phase: number;
  color: string;
  // Morphing coordinates
  targetX?: number;
  targetY?: number;
  isMaria?: boolean;
  isHeart?: boolean;
  letterIndex?: number; // 0: M, 1: A, 2: R, 3: I, 4: A
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  alpha: number;
  decay: number;
  color: string;
  width: number;
  type: "distant" | "fast" | "golden" | "fireball";
}

interface DistantGalaxy {
  x: number;
  y: number;
  radius: number;
  tilt: number;
  alpha: number;
  color: string;
}

export default function DeepSpaceCanvas({
  phase,
  mariaProgress = 0,
  heartProgress = 0,
  awakeningProgress = 0,
  className = "",
}: DeepSpaceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = width < 768;

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initAstronomy();
    };

    const palette = astronomyConfig.palette;

    // Distant background galaxies
    let distantGalaxies: DistantGalaxy[] = [];
    const initDistantGalaxies = () => {
      distantGalaxies = [
        {
          x: width * 0.18,
          y: height * 0.25,
          radius: isMobile ? 35 : 55,
          tilt: -0.4,
          alpha: 0.15,
          color: palette.nebulaViolet,
        },
        {
          x: width * 0.82,
          y: height * 0.72,
          radius: isMobile ? 40 : 65,
          tilt: 0.6,
          alpha: 0.12,
          color: palette.celestialBlue,
        },
        {
          x: width * 0.75,
          y: height * 0.2,
          radius: isMobile ? 25 : 40,
          tilt: 0.2,
          alpha: 0.1,
          color: palette.softRose,
        },
      ];
    };

    // Stars & Star clusters
    let stars: StarNode[] = [];
    let mariaStars: StarNode[] = [];
    let heartStars: StarNode[] = [];
    const shootingStars: ShootingStar[] = [];

    // Spiral Galaxy Particles
    interface GalaxyParticle {
      dist: number;
      angle: number;
      armOffset: number;
      size: number;
      color: string;
      alpha: number;
      speed: number;
    }
    let galaxyParticles: GalaxyParticle[] = [];

    const initGalaxy = () => {
      galaxyParticles = [];
      const particleCount = isMobile ? 350 : 850;
      const armCount = 2;

      for (let i = 0; i < particleCount; i++) {
        const dist = Math.pow(Math.random(), 1.8) * Math.min(width, height) * 0.45 + 15;
        const armIndex = i % armCount;
        const armAngle = (armIndex * 2 * Math.PI) / armCount;
        const spiralAngle = Math.log(dist * 0.08) * 1.8;
        const dispersion = (Math.random() - 0.5) * 0.45;

        const colors = [
          palette.starlightGold,
          palette.moonlightSilver,
          palette.celestialBlue,
          palette.nebulaViolet,
          palette.softRose,
        ];

        galaxyParticles.push({
          dist,
          angle: armAngle + spiralAngle + dispersion,
          armOffset: Math.random() * 0.2,
          size: Math.random() * 1.6 + 0.4,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 0.2 + Math.random() * 0.7,
          speed: 0.0003 + (1 / (dist + 50)) * 0.08,
        });
      }
    };

    // Build Constellation for "MARIA"
    const initMariaConstellation = () => {
      mariaStars = [];
      const cx = width / 2;
      const cy = height * 0.42;
      const letterWidth = isMobile ? 42 : 75;
      const letterHeight = isMobile ? 65 : 110;
      const spacing = isMobile ? 52 : 95;
      const startX = cx - (spacing * 4) / 2;

      // Letter definitions as relative coordinates (0..1)
      const letters: { nodes: [number, number][]; edges: [number, number][] }[] = [
        // M
        {
          nodes: [
            [0, 1],
            [0, 0],
            [0.5, 0.55],
            [1, 0],
            [1, 1],
          ],
          edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
          ],
        },
        // A
        {
          nodes: [
            [0, 1],
            [0.5, 0],
            [1, 1],
            [0.25, 0.6],
            [0.75, 0.6],
          ],
          edges: [
            [0, 1],
            [1, 2],
            [3, 4],
          ],
        },
        // R
        {
          nodes: [
            [0, 1],
            [0, 0],
            [0.9, 0.1],
            [0.9, 0.45],
            [0, 0.5],
            [0.95, 1],
          ],
          edges: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
            [4, 5],
          ],
        },
        // I
        {
          nodes: [
            [0.15, 0],
            [0.85, 0],
            [0.5, 0],
            [0.5, 1],
            [0.15, 1],
            [0.85, 1],
          ],
          edges: [
            [0, 1],
            [2, 3],
            [4, 5],
          ],
        },
        // A
        {
          nodes: [
            [0, 1],
            [0.5, 0],
            [1, 1],
            [0.25, 0.6],
            [0.75, 0.6],
          ],
          edges: [
            [0, 1],
            [1, 2],
            [3, 4],
          ],
        },
      ];

      letters.forEach((letter, letterIdx) => {
        const lx = startX + letterIdx * spacing;
        letter.nodes.forEach(([nx, ny]) => {
          const targetX = lx + nx * letterWidth;
          const targetY = cy + (ny - 0.5) * letterHeight;

          const star: StarNode = {
            x: targetX + (Math.random() - 0.5) * 300,
            y: targetY + (Math.random() - 0.5) * 300,
            z: 0.9,
            size: 2.2,
            baseAlpha: 0.9,
            alpha: 1,
            twinkleSpeed: 0.02,
            phase: Math.random() * Math.PI,
            color: palette.starlightGold,
            targetX,
            targetY,
            isMaria: true,
            letterIndex: letterIdx,
          };
          mariaStars.push(star);
        });
      });
    };

    // Build Heart Constellation for Scene Finale
    const initHeartConstellation = () => {
      heartStars = [];
      const cx = width / 2;
      const cy = height * 0.44;
      const scale = isMobile ? 7 : 11;
      const count = 38;

      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2;
        // Irregular celestial heart formula
        const jitter = (Math.random() - 0.5) * 0.12;
        const tt = t + jitter;
        const hx = 16 * Math.pow(Math.sin(tt), 3);
        const hy = -(
          13 * Math.cos(tt) -
          5 * Math.cos(2 * tt) -
          2 * Math.cos(3 * tt) -
          Math.cos(4 * tt)
        );

        const targetX = cx + hx * scale;
        const targetY = cy + hy * scale;

        heartStars.push({
          x: targetX + (Math.random() - 0.5) * 200,
          y: targetY + (Math.random() - 0.5) * 200,
          z: 0.85,
          size: Math.random() * 1.5 + 1.2,
          baseAlpha: 0.85,
          alpha: 1,
          twinkleSpeed: 0.015,
          phase: Math.random() * Math.PI,
          color: i % 4 === 0 ? palette.starlightGold : palette.moonlightSilver,
          targetX,
          targetY,
          isHeart: true,
        });
      }
    };

    const initAstronomy = () => {
      initDistantGalaxies();
      initGalaxy();
      initMariaConstellation();
      initHeartConstellation();

      stars = [];
      const totalStars = isMobile ? 400 : 900;
      const colors = [
        palette.moonlightSilver,
        palette.moonlightSilver,
        palette.celestialBlue,
        palette.starlightGold,
        palette.softRose,
      ];

      for (let i = 0; i < totalStars; i++) {
        const z = 0.15 + Math.random() * 0.85;
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          size: Math.random() * (z > 0.7 ? 1.8 : 1.1) + 0.3,
          baseAlpha: 0.2 + Math.random() * 0.8,
          alpha: 0.5,
          twinkleSpeed: 0.006 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const spawnShootingStar = (type: ShootingStar["type"] = "fast") => {
      const angle = (Math.PI / 180) * (25 + Math.random() * 30);
      const startX = Math.random() * width * 1.1 - width * 0.05;
      const startY = Math.random() * (height * 0.4);

      let length = 120 + Math.random() * 140;
      let speed = 18 + Math.random() * 15;
      let color = palette.moonlightSilver;
      let widthPx = 1.4;

      if (type === "distant") {
        length = 70;
        speed = 12;
        widthPx = 0.9;
        color = palette.celestialBlue;
      } else if (type === "golden") {
        length = 220;
        speed = 22;
        widthPx = 2.2;
        color = palette.starlightGold;
      } else if (type === "fireball") {
        length = 320;
        speed = 28;
        widthPx = 3.6;
        color = palette.starlightGold;
      }

      shootingStars.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        alpha: 1,
        decay: type === "fireball" ? 0.008 : 0.016,
        color,
        width: widthPx,
        type,
      });
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse parallax listener
    const onMouseMove = (e: MouseEvent) => {
      const cx = width / 2;
      const cy = height / 2;
      mouseRef.current.targetX = (e.clientX - cx) / cx;
      mouseRef.current.targetY = (e.clientY - cy) / cy;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Periodic shooting stars
    const shootInterval = setInterval(() => {
      const rand = Math.random();
      if (phase === "awakening" || phase === "galaxy") {
        // High frequency meteor shower during awakening
        spawnShootingStar(rand > 0.6 ? "golden" : "fast");
      } else if (phase === "maria") {
        if (rand > 0.4) spawnShootingStar("golden");
      } else {
        if (rand > 0.5) {
          spawnShootingStar(rand > 0.9 ? "golden" : rand > 0.7 ? "distant" : "fast");
        }
      }
    }, 2800);

    let galaxyRotation = 0;

    const render = () => {
      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // 1. Layer: Deep Space Void & Nebula Gradients
      const nebula1 = ctx.createRadialGradient(
        width * 0.35 + mouseRef.current.x * 20,
        height * 0.35 + mouseRef.current.y * 20,
        30,
        width * 0.35,
        height * 0.35,
        width * 0.7
      );
      nebula1.addColorStop(0, "rgba(80, 59, 131, 0.22)"); // Nebula violet
      nebula1.addColorStop(0.5, "rgba(17, 21, 47, 0.35)"); // Midnight indigo
      nebula1.addColorStop(1, "rgba(3, 4, 10, 0)"); // Absolute black

      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.75 - mouseRef.current.x * 20,
        height * 0.65 - mouseRef.current.y * 20,
        20,
        width * 0.75,
        height * 0.65,
        width * 0.5
      );
      nebula2.addColorStop(0, "rgba(121, 149, 204, 0.14)"); // Celestial blue
      nebula2.addColorStop(0.6, "rgba(8, 13, 32, 0.2)");
      nebula2.addColorStop(1, "rgba(3, 4, 10, 0)");

      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // 2. Layer: Distant Elliptical & Spiral Galaxies
      distantGalaxies.forEach((g) => {
        ctx.save();
        ctx.translate(g.x + mouseRef.current.x * 12, g.y + mouseRef.current.y * 12);
        ctx.rotate(g.tilt);
        ctx.scale(1, 0.35);

        const gGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.radius);
        gGrad.addColorStop(0, palette.moonlightSilver);
        gGrad.addColorStop(0.3, g.color);
        gGrad.addColorStop(1, "transparent");

        ctx.fillStyle = gGrad;
        ctx.globalAlpha = g.alpha;
        ctx.beginPath();
        ctx.arc(0, 0, g.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // 3. Layer: Living Spiral Galaxy (Active during awakening, galaxy, maria, wish, finale)
      const showGalaxy =
        phase !== "observatory" && phase !== "accelerating" && phase !== "imminent";

      if (showGalaxy) {
        galaxyRotation += 0.0006;
        const cx = width / 2;
        const cy = height * 0.46;
        const scale = 1 + (phase === "awakening" ? awakeningProgress * 0.5 : 0);

        ctx.save();
        ctx.translate(cx + mouseRef.current.x * 15, cy + mouseRef.current.y * 15);
        ctx.rotate(galaxyRotation);

        // Core glow
        const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 90 * scale);
        coreGrad.addColorStop(0, "rgba(245, 217, 160, 0.65)");
        coreGrad.addColorStop(0.4, "rgba(228, 231, 243, 0.3)");
        coreGrad.addColorStop(1, "transparent");
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 90 * scale, 0, Math.PI * 2);
        ctx.fill();

        // Spiral arms particles
        galaxyParticles.forEach((p) => {
          p.angle += p.speed;
          const px = Math.cos(p.angle) * p.dist * scale;
          const py = Math.sin(p.angle) * p.dist * scale * 0.55; // inclined disk perspective

          ctx.beginPath();
          ctx.arc(px, py, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
        });

        ctx.restore();
      }

      // 4. Layer: Background Field Stars with Parallax
      stars.forEach((star) => {
        star.phase += star.twinkleSpeed;
        const twinkle = Math.sin(star.phase) * 0.3;
        star.alpha = Math.max(0.15, Math.min(1, star.baseAlpha + twinkle));

        const drawX = star.x - mouseRef.current.x * 30 * star.z;
        let drawY = star.y - mouseRef.current.y * 30 * star.z;
        if (drawY < 0) drawY += height;
        if (drawY > height) drawY -= height;

        ctx.save();
        ctx.beginPath();
        ctx.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        if (star.size > 1.3) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = star.color;
        }
        ctx.fill();
        ctx.restore();
      });

      // 5. Layer: Constellation of MARIA
      if (mariaProgress > 0.02 && mariaStars.length > 0) {
        const prog = Math.min(mariaProgress, 1);

        // Draw connecting astronomical lines
        ctx.save();
        ctx.strokeStyle = `rgba(245, 217, 160, ${0.4 * prog})`;
        ctx.lineWidth = 1.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = palette.starlightGold;

        // Connect nodes per letter
        for (let lIdx = 0; lIdx < 5; lIdx++) {
          const letterNodes = mariaStars.filter((s) => s.letterIndex === lIdx);
          if (letterNodes.length > 1) {
            ctx.beginPath();
            for (let i = 0; i < letterNodes.length; i++) {
              const node = letterNodes[i];
              const curX = node.x * (1 - prog) + (node.targetX ?? node.x) * prog;
              const curY = node.y * (1 - prog) + (node.targetY ?? node.y) * prog;
              if (i === 0) ctx.moveTo(curX, curY);
              else ctx.lineTo(curX, curY);
            }
            ctx.stroke();
          }
        }
        ctx.restore();

        // Draw star nodes
        mariaStars.forEach((star) => {
          const curX = star.x * (1 - prog) + (star.targetX ?? star.x) * prog;
          const curY = star.y * (1 - prog) + (star.targetY ?? star.y) * prog;

          ctx.save();
          ctx.beginPath();
          ctx.arc(curX, curY, star.size * (1 + 0.4 * prog), 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.shadowBlur = 12 * prog;
          ctx.shadowColor = palette.starlightGold;
          ctx.fill();

          // Delicate celestial ring around major star nodes
          if (prog > 0.7) {
            ctx.beginPath();
            ctx.arc(curX, curY, 7, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(245, 217, 160, 0.35)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
          ctx.restore();
        });
      }

      // 6. Layer: Final Heart Constellation
      if (heartProgress > 0.02 && heartStars.length > 0) {
        const hProg = Math.min(heartProgress, 1);

        ctx.save();
        ctx.strokeStyle = `rgba(245, 217, 160, ${0.45 * hProg})`;
        ctx.lineWidth = 1.4;
        ctx.shadowBlur = 14;
        ctx.shadowColor = palette.starlightGold;

        ctx.beginPath();
        for (let i = 0; i < heartStars.length; i++) {
          const node = heartStars[i];
          const curX = node.x * (1 - hProg) + (node.targetX ?? node.x) * hProg;
          const curY = node.y * (1 - hProg) + (node.targetY ?? node.y) * hProg;
          if (i === 0) ctx.moveTo(curX, curY);
          else ctx.lineTo(curX, curY);
        }
        ctx.closePath();
        ctx.stroke();

        heartStars.forEach((star) => {
          const curX = star.x * (1 - hProg) + (star.targetX ?? star.x) * hProg;
          const curY = star.y * (1 - hProg) + (star.targetY ?? star.y) * hProg;

          ctx.beginPath();
          ctx.arc(curX, curY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = palette.starlightGold;
          ctx.fill();
        });

        ctx.restore();
      }

      // 7. Layer: Shooting Stars & Meteors
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.alpha -= s.decay;

        if (s.alpha <= 0 || s.x > width + 300 || s.y > height + 300) {
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
        ctx.shadowBlur = s.type === "fireball" ? 22 : 10;
        ctx.shadowColor = s.color;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      clearInterval(shootInterval);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [phase, mariaProgress, heartProgress, awakeningProgress]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
