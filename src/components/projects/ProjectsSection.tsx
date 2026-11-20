"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  CheckCircle2,
  ExternalLink,
  Terminal,
  Cpu,
  PlusCircle,
} from "lucide-react";
import { PORTFOLIO_DATA, ProjectItem } from "@/data/portfolioData";
import { ProjectDetailModal } from "./ProjectDetailModal";

export const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const featuredProject = PORTFOLIO_DATA.projects.find((p) => p.isFeatured);
  const otherProjects = PORTFOLIO_DATA.projects.filter((p) => !p.isFeatured);

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
          <Terminal className="h-3 w-3 text-cyan-400" />
          <span>04 // FEATURED ENGINEERING</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Projects & <span className="text-cyan-400">Solutions</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
          Showcasing real-world technical projects focused on machine learning intrusion detection and secure application development.
        </p>
      </div>

      {/* Featured Project Showcase: ML-Based DoS IDS */}
      {featuredProject && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border border-cyan-500/30 bg-[#0d1322]/90 backdrop-blur-xl overflow-hidden shadow-2xl mb-12 group"
        >
          {/* Subtle Top Gradient Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" />

          <div className="p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: Info, Problem, Solution */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-mono text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>FLAGSHIP CYBER DEFENSE PROJECT</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {featuredProject.category}
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {featuredProject.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-cyan-300 font-medium leading-relaxed">
                  {featuredProject.tagline}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {featuredProject.description}
              </p>

              {/* Problem & Solution Quick Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="rounded-xl border border-slate-800 bg-[#090d18] p-3.5">
                  <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider block mb-1">
                    The Challenge
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Volumetric Denial-of-Service attacks overwhelm conventional rules with high false positives.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-[#090d18] p-3.5">
                  <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block mb-1">
                    The Architecture
                  </span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Real-time packet flow feature extraction + ML classification + pfSense firewall mitigation rules.
                  </p>
                </div>
              </div>

              {/* Key Features Bullet List */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                  Key System Highlights:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {featuredProject.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {featuredProject.technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="rounded-lg bg-blue-950/40 border border-blue-800/40 px-2.5 py-1 text-xs text-blue-300 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setSelectedProject(featuredProject)}
                  className="flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 px-5 py-3 text-xs font-bold text-[#05070d] shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all"
                >
                  <Cpu className="h-4 w-4" />
                  <span>Inspect Architecture & Specs</span>
                </button>

                <a
                  href="#security"
                  className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-5 py-3 text-xs font-semibold text-slate-200 hover:border-slate-500 hover:text-white transition-all"
                >
                  <Activity className="h-4 w-4 text-cyan-400" />
                  <span>Try Interactive SOC Simulator</span>
                </a>

                {featuredProject.githubUrl && (
                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 rounded-xl border border-slate-700 px-4 py-3 text-xs font-mono text-slate-300 hover:text-white"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Col: Interactive Visual Pipeline Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="rounded-2xl border border-slate-800 bg-[#090d18] p-6 shadow-inner relative overflow-hidden">
                {/* Visual SOC radar header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-mono font-semibold text-slate-200 uppercase">
                      IDS Core Pipeline
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded">
                    ML ENGINE ACTIVE
                  </span>
                </div>

                {/* Pipeline Flow Steps */}
                <div className="space-y-3 font-mono text-xs">
                  <div className="rounded-xl border border-slate-800 bg-[#0d1322] p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-cyan-400" />
                      <span className="text-slate-200">1. Wireshark / Socket Ingress</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Stream Capture</span>
                  </div>

                  <div className="flex justify-center text-slate-600">↓</div>

                  <div className="rounded-xl border border-slate-800 bg-[#0d1322] p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-blue-400" />
                      <span className="text-slate-200">2. Packet Vectorization</span>
                    </div>
                    <span className="text-[10px] text-slate-400">Flow Statistics</span>
                  </div>

                  <div className="flex justify-center text-slate-600">↓</div>

                  <div className="rounded-xl border border-blue-500/40 bg-blue-950/20 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-violet-400" />
                      <span className="text-white font-semibold">3. Anomaly Classifier</span>
                    </div>
                    <span className="text-[10px] text-cyan-300 font-bold">ML Model</span>
                  </div>

                  <div className="flex justify-center text-slate-600">↓</div>

                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-3 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-400" />
                      <span className="text-emerald-300 font-semibold">4. pfSense Drop & Alert</span>
                    </div>
                    <span className="text-[10px] text-emerald-400">Mitigated</span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Packet Triage Latency: Low</span>
                  <span className="text-cyan-400">Live Telemetry Ready</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Additional / Upcoming Project Card Slots */}
      <div className="space-y-4">
        <h4 className="text-sm font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
          <span>Additional & Upcoming Workspaces</span>
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl border border-slate-800 bg-[#0d1322]/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-slate-700 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="rounded-full bg-slate-800 border border-slate-700 px-3 py-1 text-[11px] font-mono text-slate-300">
                    {project.status}
                  </span>
                  <span className="text-xs font-mono text-slate-400">{project.category}</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[11px] text-slate-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  <span>Configured via portfolioData.ts</span>
                </span>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="hover:text-white text-slate-300 font-medium"
                >
                  View Details &rarr;
                </button>
              </div>
            </div>
          ))}

          {/* Clean Placeholder Slot for Future Projects */}
          <div className="rounded-3xl border border-dashed border-slate-800 bg-[#090d18]/40 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 mb-4">
              <PlusCircle className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-200 mb-1">
              Next Project Slot
            </h4>
            <p className="text-xs text-slate-400 max-w-sm mb-4">
              Designed for Prince to add upcoming software engineering or cybersecurity research projects without breaking layout.
            </p>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/30 border border-cyan-800/30 px-3 py-1 rounded-full">
             
            </span>
          </div>
        </div>
      </div>

      {/* Modal for In-depth Architecture view */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
