"use client";

import React, { useState } from "react";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { CyberBackground } from "@/components/ui/CyberBackground";
import { FloatingNavbar } from "@/components/navbar/FloatingNavbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { AboutSection } from "@/components/about/AboutSection";
import { SkillsSection } from "@/components/skills/SkillsSection";
import { ProjectsSection } from "@/components/projects/ProjectsSection";
import { EducationTimeline } from "@/components/education/EducationTimeline";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { SecurityVisualization } from "@/components/cyber/SecurityVisualization";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { ResumeModal } from "@/components/ui/ResumeModal";

export default function Home() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <main className="relative min-h-screen bg-[#05070d] text-slate-100 selection:bg-blue-600/30 selection:text-cyan-300">
      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Cyber Ambient Mesh & Grid Background */}
      <CyberBackground />

      {/* Floating Navigation Header */}
      <FloatingNavbar
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Section 1: Hero Section with 3D Cyber Globe */}
      <HeroSection
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Section 2: About Me & Engineering Philosophy */}
      <AboutSection />

      {/* Section 3: Technical Arsenal & Categorized Skills */}
      <SkillsSection />

      {/* Section 4: Featured Engineering Projects (ML DoS IDS) */}
      <ProjectsSection />

      {/* Section 5: Academic Foundation & Timeline */}
      <EducationTimeline />

      {/* Section 6: Interactive Developer CLI Terminal */}
      <InteractiveTerminal />

      {/* Section 7: Interactive SOC Defense & Packet Simulator */}
      <SecurityVisualization />

      {/* Section 8: Contact Section */}
      <ContactSection
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* Footer */}
      <Footer />

      {/* Interactive Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </main>
  );
}
