"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

export const EducationTimeline: React.FC = () => {
  return (
    <section id="education" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-950/20 px-3.5 py-1 text-xs font-mono text-violet-300 mb-3">
          <GraduationCap className="h-3 w-3 text-violet-400" />
          <span>03 // ACADEMIC FOUNDATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Education & <span className="text-violet-400">Qualifications</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
          Formal academic training in computer engineering, cybersecurity defenses, and distributed systems.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Central glowing vertical timeline rail */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-gradient-to-b from-cyan-500 via-blue-500 to-violet-500 opacity-30 hidden sm:block" />

        <div className="space-y-12">
          {PORTFOLIO_DATA.education.map((edu, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col sm:flex-row items-center ${
                  isEven ? "sm:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400 bg-[#05070d] shadow-[0_0_15px_rgba(6,182,212,0.4)] z-10 hidden sm:flex">
                  <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                </div>

                {/* Timeline Card */}
                <div
                  className={`w-full sm:w-[calc(50%-2.5rem)] ${
                    isEven ? "sm:pr-4" : "sm:pl-4"
                  }`}
                >
                  <div className="relative rounded-3xl border border-slate-800/80 bg-[#0d1322]/90 backdrop-blur-xl p-6 sm:p-8 hover:border-slate-700 transition-all shadow-xl group">
                    {/* Top Tag & Number */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-mono text-cyan-300">
                        <GraduationCap className="h-3.5 w-3.5" />
                        <span>Qualification 0{index + 1}</span>
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {edu.specialization ? "HONORS DEGREE" : "TECHNICAL DIPLOMA"}
                      </span>
                    </div>

                    {/* Degree & Institution */}
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {edu.degree}
                    </h3>
                    {edu.specialization && (
                      <p className="text-sm font-semibold text-cyan-400 mt-0.5">
                        {edu.specialization}
                      </p>
                    )}
                    <p className="text-xs font-medium text-slate-300 mt-1 flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {edu.institution}
                    </p>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 mt-4 leading-relaxed">
                      {edu.description}
                    </p>

                    {/* Focus Areas Badges */}
                    <div className="mt-5 pt-4 border-t border-slate-800/80">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
                        Core Knowledge Areas:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {edu.focusAreas.map((area, aIdx) => (
                          <span
                            key={aIdx}
                            className="rounded-lg bg-slate-900 border border-slate-800 px-2.5 py-1 text-[11px] text-slate-300"
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
