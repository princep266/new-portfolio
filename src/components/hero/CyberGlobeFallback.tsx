"use client";

import React, { useEffect, useRef } from "react";

export const CyberGlobeFallback: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let angle = 0;
    const size = 360;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const radius = 120;

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      angle += 0.015;

      // Outer glowing halo
      const grad = ctx.createRadialGradient(cx, cy, radius * 0.4, cx, cy, radius * 1.3);
      grad.addColorStop(0, "rgba(59, 130, 246, 0.15)");
      grad.addColorStop(0.7, "rgba(6, 182, 212, 0.08)");
      grad.addColorStop(1, "rgba(5, 7, 13, 0)");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();

      // Latitude lines
      for (let i = -3; i <= 3; i++) {
        const yOffset = (i / 4) * radius;
        const currentR = Math.sqrt(Math.max(0, radius * radius - yOffset * yOffset));

        ctx.beginPath();
        ctx.ellipse(cx, cy + yOffset, currentR, currentR * 0.35, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Longitude lines with rotation
      for (let i = 0; i < 6; i++) {
        const rot = angle + (i * Math.PI) / 6;
        const xDist = Math.cos(rot) * radius;

        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(xDist), radius, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(139, 92, 246, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Orbiting node ring
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle * 0.8);
      ctx.beginPath();
      ctx.ellipse(0, 0, radius * 1.25, radius * 0.45, Math.PI / 6, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.4)";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Orbiting packet
      const px = Math.cos(angle * 2) * radius * 1.25;
      const py = Math.sin(angle * 2) * radius * 0.45;
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#22d3ee";
      ctx.shadowColor = "#22d3ee";
      ctx.shadowBlur = 10;
      ctx.fill();
      ctx.restore();

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="relative flex h-[340px] w-[340px] sm:h-[400px] sm:w-[400px] items-center justify-center">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};
