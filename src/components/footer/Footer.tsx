"use client";

import React from "react";
import { Shield, ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#070a12] pt-16 pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">
        {/* Top Tier */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5">
                <div className="flex h-full w-full items-center justify-center rounded-[6px] bg-[#05070d]">
                  <Shield className="h-4 w-4 text-cyan-400" />
                </div>
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                {PORTFOLIO_DATA.personal.name}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
              &ldquo;{PORTFOLIO_DATA.personal.headline}&rdquo;
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={PORTFOLIO_DATA.personal.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0d1322] text-slate-400 hover:text-blue-400 hover:border-blue-500/50 transition-colors"
            >
              <LinkedinIcon className="h-4 w-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0d1322] text-slate-400 hover:text-cyan-400 hover:border-cyan-500/50 transition-colors"
            >
              <GithubIcon className="h-4 w-4" />
            </a>

            <a
              href={`mailto:${PORTFOLIO_DATA.personal.socialLinks.email}`}
              aria-label="Send direct email"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0d1322] text-slate-400 hover:text-violet-400 hover:border-violet-500/50 transition-colors"
            >
              <Mail className="h-4 w-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-[#0d1322] text-slate-400 hover:text-white hover:border-slate-600 transition-colors ml-2"
              title="Return to top of page"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-slate-800/60 text-xs font-mono text-slate-400">
          <a href="#about" className="hover:text-cyan-300 transition-colors">
            {"// About"}
          </a>
          <a href="#skills" className="hover:text-cyan-300 transition-colors">
            {"// Skills"}
          </a>
          <a href="#projects" className="hover:text-cyan-300 transition-colors">
            {"// Projects"}
          </a>
          <a href="#education" className="hover:text-cyan-300 transition-colors">
            {"// Education"}
          </a>
          <a href="#terminal" className="hover:text-cyan-300 transition-colors">
            {"// Interactive CLI"}
          </a>
          <a href="#security" className="hover:text-cyan-300 transition-colors">
            {"// SOC Telemetry"}
          </a>
          <a href="#contact" className="hover:text-cyan-300 transition-colors">
            {"// Contact"}
          </a>
        </div>

        {/* Bottom Tier: Copyright & Authenticity Notice */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/40 text-[11px] font-mono text-slate-400">
          <p>
            &copy; {new Date().getFullYear()} Prince Prajapati. All rights reserved. • Mumbai, India.
          </p>
          <div className="flex items-center gap-2 text-slate-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Built with React, Next.js, TypeScript & 3D Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
