"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowDown,
  FileText,
  Mail,
  Shield,
  Code2,
  Terminal,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { CyberGlobeFallback } from "./CyberGlobeFallback";

// Dynamically load R3F CyberGlobe3D with client-side only fallback
const CyberGlobe3D = dynamic(
  () => import("./CyberGlobe3D").then((mod) => mod.CyberGlobe3D),
  {
    ssr: false,
    loading: () => <CyberGlobeFallback />,
  }
);

interface HeroSectionProps {
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenResume }) => {
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    // Check if WebGL is supported
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text Content & CTAs */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col items-start text-left"
        >
          {/* Status & Location Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-1.5 text-xs font-mono text-cyan-300 backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            <span className="text-[11px] font-medium tracking-wide">
              {PORTFOLIO_DATA.personal.availability}
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center gap-1 text-[11px] text-slate-300">
              <MapPin className="h-3 w-3 text-cyan-400" />
              Mumbai, IN
            </span>
          </div>

          {/* Main Name Heading */}
          <div className="space-y-1 mb-4">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-cyan-400 font-medium">
              Hello, World. I am
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-none">
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                PRINCE
              </span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                PRAJAPATI
              </span>
            </h1>
          </div>

          {/* Professional Identity Subtitle */}
          <div className="flex flex-wrap items-center gap-2 text-sm sm:text-base font-medium text-slate-300 mb-6">
            <span className="flex items-center gap-1.5 text-cyan-300">
              <Code2 className="h-4 w-4 text-cyan-400" />
              Aspiring Web Developer
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-blue-300">
              <Shield className="h-4 w-4 text-blue-400" />
              Cybersecurity Enthusiast
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Terminal className="h-4 w-4 text-slate-400" />
              IT Student
            </span>
          </div>

          {/* Short Headline Quote */}
          <blockquote className="border-l-2 border-cyan-500/60 pl-4 py-1 text-base sm:text-lg text-slate-300 italic font-normal max-w-2xl mb-8 leading-relaxed bg-gradient-to-r from-cyan-950/20 to-transparent rounded-r-lg">
            &ldquo;{PORTFOLIO_DATA.personal.headline}&rdquo;
          </blockquote>

          {/* Main Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
            {/* CTA 1: Explore My Work */}
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              <span>Explore My Work</span>
              <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* CTA 2: Download Resume */}
            <div className="flex items-center gap-2">
              <a
                href={PORTFOLIO_DATA.personal.resume.url}
                download={PORTFOLIO_DATA.personal.resume.filename}
                className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:border-slate-500 hover:bg-slate-800 hover:text-white shadow-lg active:scale-[0.98] transition-all group"
              >
                <FileText className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Download Resume</span>
              </a>
              <button
                onClick={onOpenResume}
                title="Preview Resume Dossier"
                className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/50 p-3.5 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
                aria-label="Preview Resume in Modal"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Social Icons Bar */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80 w-full max-w-md">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2">
              Connect:
            </span>
            <a
              href={PORTFOLIO_DATA.personal.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prince Prajapati's LinkedIn Profile"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-[#0d1322] text-slate-300 hover:border-blue-500/60 hover:bg-blue-950/40 hover:text-blue-400 transition-all shadow-sm"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prince Prajapati's GitHub Profile"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-[#0d1322] text-slate-300 hover:border-cyan-500/60 hover:bg-cyan-950/40 hover:text-cyan-400 transition-all shadow-sm"
              title="GitHub Profile"
            >
              <GithubIcon className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.socialLinks.email}`}
              aria-label="Send email to Prince Prajapati"
              className="group flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-[#0d1322] text-slate-300 hover:border-violet-500/60 hover:bg-violet-950/40 hover:text-violet-400 transition-all shadow-sm"
              title="Email Prince"
            >
              <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </a>

            <a
              href="#terminal"
              className="ml-auto text-xs font-mono text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
            >
              <span className="text-cyan-400">&gt;_</span> Launch CLI
            </a>
          </div>
        </motion.div>

        {/* Right Column: 3D Interactive Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col items-center justify-center relative"
        >
          {/* Decorative Cyber Rings behind the 3D sphere */}
          <div className="absolute h-[320px] w-[320px] sm:h-[420px] sm:w-[420px] rounded-full border border-blue-500/10 animate-spin-slow pointer-events-none" />
          <div className="absolute h-[280px] w-[280px] sm:h-[370px] sm:w-[370px] rounded-full border border-cyan-500/10 pointer-events-none" />

          {/* 3D Canvas / Fallback */}
          <div className="relative z-10">
            {hasWebGL ? <CyberGlobe3D /> : <CyberGlobeFallback />}
          </div>

          {/* Subtle indicator under the 3D globe */}
          <div className="mt-4 flex items-center gap-2 rounded-full border border-slate-800/80 bg-slate-900/60 px-3 py-1 text-[11px] font-mono text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>INTERACTIVE 3D MESH • MOVE POINTER</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll down indicator arrow */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 pointer-events-none opacity-60">
        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Scroll</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-1 w-1 rounded-full bg-cyan-400"
        />
      </div>
    </section>
  );
};
