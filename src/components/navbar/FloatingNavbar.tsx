"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield, Terminal, FileText, ChevronRight } from "lucide-react";

interface FloatingNavbarProps {
  onOpenResume: () => void;
}

const NAV_ITEMS = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
  { name: "Terminal", href: "#terminal" },
  { name: "Security", href: "#security" },
  { name: "Contact", href: "#contact" },
];

export const FloatingNavbar: React.FC<FloatingNavbarProps> = ({
  onOpenResume,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = ["hero", "about", "skills", "projects", "education", "terminal", "security", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 flex justify-center px-4 pt-4 sm:pt-6 transition-all duration-300">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`flex items-center justify-between w-full max-w-5xl rounded-2xl px-4 sm:px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#090d18]/85 backdrop-blur-xl border border-slate-700/60 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
              : "bg-[#0d1322]/50 backdrop-blur-md border border-slate-800/40"
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 p-0.5 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#05070d]">
                <Shield className="h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                Prince Prajapati
              </span>
              <span className="text-[10px] font-mono tracking-wider text-slate-400">
                CYBER // DEV
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-3 py-1.5 text-xs font-medium transition-colors rounded-lg ${
                    isActive
                      ? "text-cyan-300 font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-lg bg-blue-500/15 border border-cyan-500/30 -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Terminal quick-jump button */}
            <a
              href="#terminal"
              onClick={(e) => handleNavClick(e, "#terminal")}
              className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-700/80 bg-slate-900/60 px-2.5 py-1.5 text-xs font-mono text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-950/20 transition-all"
              title="Jump to Interactive CLI Terminal"
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>CLI</span>
            </a>

            {/* Resume Button */}
            <button
              onClick={onOpenResume}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-3.5 py-1.5 text-xs font-medium text-white shadow-[0_0_15px_rgba(59,130,246,0.35)] hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] hover:brightness-110 active:scale-95 transition-all"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Resume</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex md:hidden items-center justify-center rounded-xl p-2 text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-slate-700/80 bg-[#090d18]/95 p-6 backdrop-blur-2xl shadow-2xl md:hidden"
          >
            <div className="flex flex-col space-y-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-cyan-300 transition-colors"
                >
                  <span>{item.name}</span>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </a>
              ))}
              <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenResume();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-semibold text-white shadow-lg"
                >
                  <FileText className="h-4 w-4" />
                  <span>View & Download Resume</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
