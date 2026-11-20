"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Terminal,
  GraduationCap,
  MapPin,
  Lock,
  ArrowUpRight,
  Zap,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/20 px-3.5 py-1 text-xs font-mono text-blue-300 mb-3">
          <Terminal className="h-3 w-3 text-cyan-400" />
          <span>01 // PROFILE & PHILOSOPHY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          About <span className="text-cyan-400">Prince Prajapati</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
          Bridging modern software development with defensive security engineering and real-world problem solving.
        </p>
      </div>

      {/* Modern Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
        {/* Card 1: Core Bio (Spans 8 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-8 rounded-3xl border border-slate-800/80 bg-[#0d1322]/80 backdrop-blur-xl p-8 relative overflow-hidden group hover:border-slate-700 transition-all shadow-xl"
        >
          {/* Subtle Cyber Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent" />

          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-cyan-400">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">The Engineering Story</h3>
              <p className="text-xs font-mono text-slate-400">Specializing at the intersection of Dev + Sec</p>
            </div>
          </div>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-normal mb-6">
            &ldquo;{PORTFOLIO_DATA.personal.aboutMe}&rdquo;
          </p>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
            {PORTFOLIO_DATA.personal.careerGoals}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-cyan-400 mt-2 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Defensive Security</h4>
                <p className="text-xs text-slate-400 mt-0.5">Threat detection, pfSense firewalling, packet triage.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-blue-400 mt-2 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Web Engineering</h4>
                <p className="text-xs text-slate-400 mt-0.5">FastAPI backends, dynamic React interfaces, robust systems.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-2 w-2 rounded-full bg-violet-400 mt-2 shrink-0" />
              <div>
                <h4 className="text-sm font-semibold text-white">Continuous Learning</h4>
                <p className="text-xs text-slate-400 mt-0.5">Exploring SASE architectures, DNSSEC, and cloud postures.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Card 2: Location & Education Snapshot (Spans 4 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-4 rounded-3xl border border-slate-800/80 bg-[#0d1322]/80 backdrop-blur-xl p-8 flex flex-col justify-between hover:border-slate-700 transition-all shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-blue-500" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/10 border border-violet-500/20 text-violet-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xs font-mono rounded-full bg-slate-800 px-2.5 py-1 text-slate-300">
                Final-Year B.Tech
              </span>
            </div>

            <h3 className="text-base font-bold text-white mb-2">Academic Foundation</h3>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-cyan-300">B.Tech in Information Technology</p>
                <p className="text-[11px] text-slate-300">Cybersecurity Honors</p>
                <p className="text-[11px] text-slate-400">Shree L.R. Tiwari College of Engineering</p>
              </div>
              <div className="pt-2 border-t border-slate-800/60">
                <p className="text-xs font-semibold text-blue-300">Diploma in Computer Engineering</p>
                <p className="text-[11px] text-slate-400">Thakur Polytechnic</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <MapPin className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>{PORTFOLIO_DATA.personal.location}</span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
              IST (UTC+5:30)
            </span>
          </div>
        </motion.div>

        {/* Card 3: Areas of Focus & Research (Spans 12 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-12 rounded-3xl border border-slate-800/80 bg-[#090d18]/90 backdrop-blur-xl p-6 sm:p-8 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/10 border border-cyan-500/20 text-cyan-400">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Current Areas of Exploration</h3>
                <p className="text-xs font-mono text-slate-400">Topics of active study, experimentation and architecture design</p>
              </div>
            </div>
            <a
              href="#security"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <span>View Interactive SOC Simulator</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {PORTFOLIO_DATA.personal.interests.map((interest, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-[#0d1322] p-4 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-2 mb-2 text-cyan-400">
                  <span className="text-xs font-mono font-bold">0{idx + 1}.</span>
                  <div className="h-1 flex-1 bg-slate-800 rounded-full" />
                </div>
                <p className="text-xs font-medium text-slate-200">{interest}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
