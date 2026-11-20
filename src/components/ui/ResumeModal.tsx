"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Download,
  Printer,
  Shield,
  CheckCircle2,
  GraduationCap,
  Code2,
  MapPin,
  Mail,
  ExternalLink,
  FileText,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "pdf">("overview");

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-4xl rounded-2xl border border-slate-800 bg-[#0d1322] shadow-2xl overflow-hidden my-8"
        >
          {/* Top Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-slate-800/80 bg-[#090d18] px-6 py-4 gap-3">
            <div className="flex items-center gap-3">
              <span className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
              <h2 className="text-sm font-semibold tracking-wider text-slate-200 uppercase">
                Curriculum Vitae • Prince Prajapati
              </h2>
            </div>

            {/* View Switcher Tabs */}
            <div className="flex items-center rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-xs">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-1 rounded-md transition-colors ${
                  activeTab === "overview"
                    ? "bg-cyan-500/20 text-cyan-300 font-medium"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Profile Overview
              </button>
              <button
                onClick={() => setActiveTab("pdf")}
                className={`px-3 py-1 rounded-md transition-colors flex items-center gap-1 ${
                  activeTab === "pdf"
                    ? "bg-cyan-500/20 text-cyan-300 font-medium"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <FileText className="h-3 w-3" />
                <span>PDF Document</span>
              </button>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <a
                href={PORTFOLIO_DATA.personal.resume.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Open PDF in new tab"
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span>Open in Tab</span>
              </a>

              <button
                onClick={handlePrint}
                title="Print / Save as PDF"
                className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-300 hover:border-slate-500 hover:text-white transition-colors"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print</span>
              </button>

              {/* Direct PDF Download Button */}
              <a
                href={PORTFOLIO_DATA.personal.resume.url}
                download={PORTFOLIO_DATA.personal.resume.filename}
                title="Download Prince_Prajapati.pdf directly"
                className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:brightness-110 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)]"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors ml-1"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          {activeTab === "pdf" ? (
            /* Direct PDF Embedded Viewer */
            <div className="h-[75vh] w-full bg-[#05070d] flex flex-col">
              <iframe
                src={`${PORTFOLIO_DATA.personal.resume.url}#view=FitH`}
                title="Prince Prajapati Resume PDF"
                className="w-full h-full border-none"
              />
            </div>
          ) : (
            /* Structured Overview */
            <div className="max-h-[75vh] overflow-y-auto p-6 sm:p-8 space-y-6 text-slate-300 print:bg-white print:text-black">
              {/* Header info */}
              <div className="border-b border-slate-800 pb-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                      {PORTFOLIO_DATA.personal.name}
                    </h1>
                    <p className="mt-1 text-sm font-medium text-cyan-400">
                      {PORTFOLIO_DATA.personal.identities.join(" | ")}
                    </p>
                  </div>
                  <a
                    href={PORTFOLIO_DATA.personal.resume.url}
                    download={PORTFOLIO_DATA.personal.resume.filename}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:underline"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download {PORTFOLIO_DATA.personal.resume.filename}</span>
                  </a>
                </div>

                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                    {PORTFOLIO_DATA.personal.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="h-3.5 w-3.5 text-slate-500" />
                    {PORTFOLIO_DATA.personal.socialLinks.email}
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {PORTFOLIO_DATA.personal.aboutMe}
                </p>
              </div>

              {/* Education */}
              <div className="border-b border-slate-800 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap className="h-4 w-4 text-blue-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                    Education
                  </h3>
                </div>
                <div className="space-y-4">
                  {PORTFOLIO_DATA.education.map((edu) => (
                    <div key={edu.id} className="rounded-lg bg-slate-900/40 p-4 border border-slate-800/60">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="font-semibold text-white text-sm">
                          {edu.degree} {edu.specialization && `– ${edu.specialization}`}
                        </h4>
                      </div>
                      <p className="text-xs text-cyan-300 mt-0.5">{edu.institution}</p>
                      <p className="text-xs text-slate-400 mt-2">{edu.description}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {edu.focusAreas.map((area, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-slate-800/80 px-2 py-0.5 text-[11px] text-slate-300"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Project */}
              <div className="border-b border-slate-800 pb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-4 w-4 text-cyan-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                    Featured Project
                  </h3>
                </div>
                {PORTFOLIO_DATA.projects
                  .filter((p) => p.isFeatured)
                  .map((project) => (
                    <div key={project.id} className="rounded-lg bg-slate-900/40 p-4 border border-slate-800/60">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white text-sm">{project.title}</h4>
                        <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-400 font-medium">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1">{project.description}</p>
                      <div className="mt-3">
                        <h5 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                          Key Capabilities:
                        </h5>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                          {project.keyFeatures.map((feat, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="rounded bg-blue-950/40 border border-blue-800/40 px-2 py-0.5 text-[11px] text-blue-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>

              {/* Technical Skills */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Code2 className="h-4 w-4 text-violet-400" />
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-100">
                    Technical Arsenal
                  </h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
                    <div key={idx} className="rounded-lg bg-slate-900/30 p-3 border border-slate-800/50">
                      <span className="text-xs font-semibold text-cyan-300 block mb-1.5">
                        {cat.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-200"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
