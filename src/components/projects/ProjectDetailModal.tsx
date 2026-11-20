"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Shield,
  Activity,
  CheckCircle2,
  AlertTriangle,
  Cpu,
} from "lucide-react";
import { ProjectItem } from "@/data/portfolioData";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl rounded-3xl border border-cyan-500/30 bg-[#0d1322] shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 bg-[#090d18] px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-600/10 border border-cyan-500/30 text-cyan-400">
                <Shield className="h-4 w-4" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                  SYSTEM ARCHITECTURE SPECIFICATION
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {project.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-8 space-y-8 max-h-[75vh] overflow-y-auto">
            {/* Overview & Tagline */}
            <div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium">
                {project.tagline}
              </p>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Architecture Pipeline Visualizer */}
            <div className="rounded-2xl border border-slate-800 bg-[#090d18] p-5">
              <div className="flex items-center gap-2 mb-4 text-xs font-mono text-cyan-400">
                <Cpu className="h-4 w-4" />
                <span>DATA FLOW & DETECTION PIPELINE</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
                <div className="rounded-xl bg-[#0d1322] border border-slate-800 p-3 text-center">
                  <div className="text-[10px] font-mono text-slate-400">STAGE 01</div>
                  <div className="text-xs font-bold text-white mt-1">Packet Capture</div>
                  <div className="text-[10px] text-slate-400 mt-1">Raw ingress traffic via Wireshark / sockets</div>
                </div>

                <div className="rounded-xl bg-[#0d1322] border border-slate-800 p-3 text-center">
                  <div className="text-[10px] font-mono text-cyan-400">STAGE 02</div>
                  <div className="text-xs font-bold text-white mt-1">Feature Extraction</div>
                  <div className="text-[10px] text-slate-400 mt-1">Flow duration, packet rates, SYN/ACK ratios</div>
                </div>

                <div className="rounded-xl bg-[#0d1322] border border-blue-500/30 p-3 text-center bg-blue-950/20">
                  <div className="text-[10px] font-mono text-blue-400">STAGE 03</div>
                  <div className="text-xs font-bold text-white mt-1">ML Classification</div>
                  <div className="text-[10px] text-slate-300 mt-1">Real-time inference & anomaly scoring</div>
                </div>

                <div className="rounded-xl bg-[#0d1322] border border-emerald-500/30 p-3 text-center bg-emerald-950/20">
                  <div className="text-[10px] font-mono text-emerald-400">STAGE 04</div>
                  <div className="text-xs font-bold text-white mt-1">pfSense Mitigation</div>
                  <div className="text-[10px] text-slate-300 mt-1">Automated firewall drop & SOC alert</div>
                </div>
              </div>
            </div>

            {/* Problem - Approach - Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-2xl border border-red-500/20 bg-red-950/10 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-red-400 mb-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span>The Problem</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="rounded-2xl border border-cyan-500/20 bg-cyan-950/10 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 mb-2">
                  <Activity className="h-4 w-4" />
                  <span>The Approach</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.approach}
                </p>
              </div>

              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-4">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 mb-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>The Solution</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Key Capabilities */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Key System Capabilities:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-slate-800 bg-[#090d18] p-3"
                  >
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
                Technologies Used:
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs text-slate-200 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-between border-t border-slate-800 bg-[#090d18] px-6 py-4">
            <span className="text-xs text-slate-400">
              {project.status === "Completed"
                ? "Engineering Project • Documentation Available"
                : "Active Project Workspace"}
            </span>
            <button
              onClick={onClose}
              className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Close Details
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
