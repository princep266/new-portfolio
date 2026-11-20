"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Search,
  CheckCircle2,
  X,
  Sparkles,
  Cpu,
  ArrowUpRight,
  Shield,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";
import { TechIcon } from "@/components/ui/TechIcons";

interface SkillItemData {
  name: string;
  description: string;
  category: string;
  domain: string;
  integrationNote?: string;
  capabilities?: string[];
}

export const SkillsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inspectedSkill, setInspectedSkill] = useState<SkillItemData | null>(null);

  // Map category to accent colors
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Network Security":
        return {
          border: "border-cyan-500/30",
          glow: "group-hover:border-cyan-400/60 group-hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]",
          badge: "bg-cyan-950/40 border-cyan-800/40 text-cyan-300",
          iconBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        };
      case "Security Monitoring":
        return {
          border: "border-emerald-500/30",
          glow: "group-hover:border-emerald-400/60 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]",
          badge: "bg-emerald-950/40 border-emerald-800/40 text-emerald-300",
          iconBg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
        };
      case "Security Tools":
        return {
          border: "border-rose-500/30",
          glow: "group-hover:border-rose-400/60 group-hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]",
          badge: "bg-rose-950/40 border-rose-800/40 text-rose-300",
          iconBg: "bg-rose-500/10 text-rose-400 border-rose-500/20",
        };
      case "Programming":
        return {
          border: "border-blue-500/30",
          glow: "group-hover:border-blue-400/60 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)]",
          badge: "bg-blue-950/40 border-blue-800/40 text-blue-300",
          iconBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        };
      case "Frontend Development":
        return {
          border: "border-sky-500/30",
          glow: "group-hover:border-sky-400/60 group-hover:shadow-[0_0_25px_rgba(56,189,248,0.2)]",
          badge: "bg-sky-950/40 border-sky-800/40 text-sky-300",
          iconBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        };
      case "Backend Development":
        return {
          border: "border-teal-500/30",
          glow: "group-hover:border-teal-400/60 group-hover:shadow-[0_0_25px_rgba(20,184,166,0.2)]",
          badge: "bg-teal-950/40 border-teal-800/40 text-teal-300",
          iconBg: "bg-teal-500/10 text-teal-400 border-teal-500/20",
        };
      case "Database":
        return {
          border: "border-amber-500/30",
          glow: "group-hover:border-amber-400/60 group-hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]",
          badge: "bg-amber-950/40 border-amber-800/40 text-amber-300",
          iconBg: "bg-amber-500/10 text-amber-400 border-amber-500/20",
        };
      case "Other Technologies":
      default:
        return {
          border: "border-violet-500/30",
          glow: "group-hover:border-violet-400/60 group-hover:shadow-[0_0_25px_rgba(139,92,246,0.2)]",
          badge: "bg-violet-950/40 border-violet-800/40 text-violet-300",
          iconBg: "bg-violet-500/10 text-violet-400 border-violet-500/20",
        };
    }
  };

  // Flatten all skills with enriched domain context
  const allSkills: SkillItemData[] = PORTFOLIO_DATA.skillCategories.flatMap((cat) =>
    cat.skills.map((s) => {
      let domain = "Core Technology";
      let integrationNote = "Used across software development and security projects.";
      const capabilities: string[] = [];

      if (cat.name === "Network Security") {
        domain = "Network Defense & Triage";
        integrationNote = "Core analytical tool in the ML-Based DoS Intrusion Detection pipeline.";
        capabilities.push("Deep packet inspection", "Protocol behavior analysis", "Anomaly detection");
      } else if (cat.name === "Security Monitoring") {
        domain = "SIEM, Firewall & Telemetry";
        integrationNote = "Configured for perimeter security, rule alerting, and firewall dropping.";
        capabilities.push("Automated SOC alert triggers", "Packet filtering policies", "Live telemetry");
      } else if (cat.name === "Security Tools") {
        domain = "Vulnerability Assessment";
        integrationNote = "Applied during web security audits and vulnerability reconnaissance.";
        capabilities.push("Traffic proxying", "Security auditing", "Penetration assessment");
      } else if (cat.name === "Programming") {
        domain = "Automation & Systems";
        integrationNote = "Primary development stack for machine learning, sockets, and web APIs.";
        capabilities.push("Object-oriented logic", "Asynchronous IO", "Machine learning integration");
      } else if (cat.name === "Frontend Development") {
        domain = "User Interface Architecture";
        integrationNote = "Engineered for responsive dashboards, reactive interfaces, and SOC portals.";
        capabilities.push("Component state management", "Dynamic UI feeds", "Cross-platform development");
      } else if (cat.name === "Backend Development") {
        domain = "High-Performance APIs";
        integrationNote = "High-throughput asynchronous endpoints delivering real-time alerts.";
        capabilities.push("OpenAPI schemas", "Async socket streams", "Fast request dispatch");
      } else if (cat.name === "Database") {
        domain = "Data Persistence & Relational Schema";
        integrationNote = "Structured data storage for security logs, telemetry, and web state.";
        capabilities.push("ACID compliance", "Real-time subscriptions", "Relational indexing");
      } else {
        domain = "Infrastructure & Architecture";
        integrationNote = "Version control, secure DNS, and perimeter cloud security postures.";
        capabilities.push("Cryptographic DNS", "SASE architectures", "Distributed version control");
      }

      return {
        name: s.name,
        description: s.description,
        category: cat.name,
        domain,
        integrationNote,
        capabilities,
      };
    })
  );

  // Filter skills based on selected category & search query
  const filteredSkills = allSkills.filter((s) => {
    const matchesCat = selectedCategory === "All" || s.category === selectedCategory;
    const matchesSearch =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.domain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const allCategoryNames = ["All", ...PORTFOLIO_DATA.skillCategories.map((c) => c.name)];

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
          <Terminal className="h-3.5 w-3.5 text-cyan-400" />
          <span>02 // TECHNICAL ARSENAL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
          Skills & <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-400 bg-clip-text text-transparent">Technologies</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          A verified engineering arsenal spanning defensive cybersecurity, packet inspection, modern frontend frameworks, and high-performance backend APIs.
        </p>
      </div>

      {/* Engineering Telemetry Ribbon */}
      <div className="mb-10 rounded-2xl border border-slate-800 bg-[#090d18]/90 backdrop-blur-md p-4 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-xl">
        <div className="flex items-center gap-3 px-3 py-1">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Verified Stack</div>
            <div className="text-sm font-bold text-white">18 Key Technologies</div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-1 border-t sm:border-t-0 sm:border-l border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Specialization</div>
            <div className="text-sm font-bold text-white">Cybersecurity & Web Dev</div>
          </div>
        </div>

        <div className="flex items-center gap-3 px-3 py-1 border-t sm:border-t-0 sm:border-l border-slate-800">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shrink-0">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-slate-400 uppercase">Proficiency Model</div>
            <div className="text-sm font-bold text-emerald-400">Authentic Applied Experience</div>
          </div>
        </div>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto scrollbar-none max-w-full">
          {allCategoryNames.map((catName) => {
            const isSelected = selectedCategory === catName;
            const count =
              catName === "All"
                ? allSkills.length
                : allSkills.filter((s) => s.category === catName).length;

            return (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-xl whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold shadow-[0_0_20px_rgba(6,182,212,0.4)] scale-100"
                    : "bg-[#0d1322] text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800"
                }`}
              >
                <span>{catName}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search technology (e.g. Wireshark)..."
            className="w-full rounded-xl border border-slate-800 bg-[#090d18] pl-10 pr-9 py-2.5 text-xs text-slate-200 placeholder-slate-400 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Unified, Gapless Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredSkills.map((skill) => {
          const colors = getCategoryColor(skill.category);

          return (
            <motion.div
              key={skill.name}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => setInspectedSkill(skill)}
              className={`cursor-pointer group relative rounded-2xl border ${colors.border} bg-[#0d1322]/85 backdrop-blur-md p-5 transition-all ${colors.glow} flex flex-col justify-between`}
            >
              <div>
                {/* Header: Tech Icon + Category Badge */}
                <div className="flex items-center justify-between mb-3.5">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border ${colors.iconBg} p-2 shadow-sm group-hover:scale-105 transition-transform`}
                  >
                    <TechIcon name={skill.name} className="h-6 w-6" />
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${colors.badge}`}
                  >
                    {skill.category}
                  </span>
                </div>

                {/* Skill Title & Domain */}
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mb-2">
                  {skill.domain}
                </p>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  Applied in projects
                </span>
                <span className="text-cyan-400 flex items-center gap-0.5 group-hover:translate-x-1 transition-transform font-semibold">
                  <span>Inspect</span>
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredSkills.length === 0 && (
        <div className="text-center py-16 rounded-3xl border border-dashed border-slate-800 bg-[#090d18] text-slate-400">
          <p className="text-sm">No skills found matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="mt-3 text-xs text-cyan-400 hover:underline"
          >
            Reset search filters
          </button>
        </div>
      )}

      {/* High-Fidelity Skill Dossier Modal */}
      <AnimatePresence>
        {inspectedSkill && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg rounded-3xl border border-cyan-500/30 bg-[#0d1322] shadow-2xl p-6 sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#090d18] border border-cyan-500/30 p-2.5 shadow-inner">
                    <TechIcon name={inspectedSkill.name} className="h-8 w-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                      TECHNICAL DOSSIER
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {inspectedSkill.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setInspectedSkill(null)}
                  className="rounded-xl p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-1">
                    Description & Overview
                  </h4>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {inspectedSkill.description}
                  </p>
                </div>

                {/* Practical Integration Context */}
                <div className="rounded-2xl border border-slate-800 bg-[#090d18] p-4 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Applied Engineering Context</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {inspectedSkill.integrationNote}
                  </p>
                </div>

                {/* Capabilities */}
                {inspectedSkill.capabilities && inspectedSkill.capabilities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                      Key Competencies & Practical Uses:
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {inspectedSkill.capabilities.map((cap, idx) => (
                        <span
                          key={idx}
                          className="rounded-lg bg-blue-950/40 border border-blue-800/40 px-2.5 py-1 text-xs text-blue-300"
                        >
                          {cap}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Domain: {inspectedSkill.domain}
                </span>
                <button
                  onClick={() => setInspectedSkill(null)}
                  className="rounded-xl bg-slate-800 hover:bg-slate-700 px-5 py-2 text-xs font-semibold text-white transition-colors"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
