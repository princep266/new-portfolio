"use client";

import React, { useState } from "react";
import {
  Mail,
  FileText,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  AlertCircle,
  ExternalLink,
  MessageSquare,
  Sparkles,
  Download,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface ContactSectionProps {
  onOpenResume: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "dispatched" | "error">("idle");
  const [emailCopied, setEmailCopied] = useState(false);

  // Validate form fields
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your name (at least 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = "Please enter a subject (at least 3 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please write a message of at least 10 characters.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus("submitting");

    // Construct mailto link with encoded content
    const recipient = PORTFOLIO_DATA.personal.socialLinks.email;
    const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${formData.subject}`);
    const mailtoBody = encodeURIComponent(
      `Hello Prince,\n\nName: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}\n\n---\nSent from Prince Prajapati Portfolio`
    );
    const mailtoUrl = `mailto:${recipient}?subject=${mailtoSubject}&body=${mailtoBody}`;

    // Open mail client
    window.location.href = mailtoUrl;

    // Set dispatched state
    setStatus("dispatched");
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.socialLinks.email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
          <MessageSquare className="h-3 w-3 text-cyan-400" />
          <span>07 // INITIATE HANDSHAKE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          {PORTFOLIO_DATA.contact.headline}
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
          {PORTFOLIO_DATA.contact.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Direct channels, location, resume card */}
        <div className="lg:col-span-5 space-y-6">
          {/* Direct Email Card with 1-click copy */}
          <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 block mb-2">
              Primary Direct Email
            </span>
            <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#090d18] border border-slate-800">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <Mail className="h-4 w-4 text-cyan-400 shrink-0" />
                <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                  {PORTFOLIO_DATA.personal.socialLinks.email}
                </span>
              </div>
              <button
                onClick={copyEmailToClipboard}
                className="flex items-center gap-1 rounded-xl bg-slate-800 hover:bg-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:text-white transition-all shrink-0"
                title="Copy email to clipboard"
              >
                {emailCopied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[11px] font-mono text-slate-400 mt-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              {PORTFOLIO_DATA.contact.responseTime}
            </p>
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href={PORTFOLIO_DATA.personal.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-800 bg-[#0d1322]/80 p-5 flex flex-col justify-between hover:border-blue-500/50 hover:bg-[#11182c] transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="h-9 w-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <LinkedinIcon className="h-4 w-4" />
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">LinkedIn</h4>
                <p className="text-xs text-slate-400 mt-0.5">Professional Network</p>
              </div>
            </a>

            <a
              href={PORTFOLIO_DATA.personal.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl border border-slate-800 bg-[#0d1322]/80 p-5 flex flex-col justify-between hover:border-cyan-500/50 hover:bg-[#11182c] transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="h-9 w-9 rounded-xl bg-cyan-600/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                  <GithubIcon className="h-4 w-4" />
                </div>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">GitHub</h4>
                <p className="text-xs text-slate-400 mt-0.5">Code Repositories</p>
              </div>
            </a>
          </div>

          {/* Location & Resume Banner */}
          <div className="rounded-2xl border border-slate-800 bg-[#090d18] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 shrink-0">
                <MapPin className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Based in Mumbai, India</p>
                <p className="text-[11px] text-slate-400">Available for remote & hybrid opportunities</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={PORTFOLIO_DATA.personal.resume.url}
                download={PORTFOLIO_DATA.personal.resume.filename}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition-all shrink-0"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download PDF</span>
              </a>
              <button
                onClick={onOpenResume}
                title="Preview Resume"
                className="flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-200 hover:text-white hover:border-slate-500 transition-all shrink-0"
              >
                <FileText className="h-3.5 w-3.5 text-cyan-400" />
                <span>Preview</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form with Real Validation */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur-xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Send a Message</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct inquiry for project collaborations, internships, or questions
                </p>
              </div>
              <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-800/40 px-2.5 py-1 rounded-full">
                FORM VALIDATED
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Name <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="e.g. Alex Morgan"
                    className={`w-full rounded-xl border bg-[#090d18] px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-500"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5">
                    Your Email <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="alex@example.com"
                    className={`w-full rounded-xl border bg-[#090d18] px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-slate-800 focus:border-cyan-500"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Subject <span className="text-cyan-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: "" });
                  }}
                  placeholder="Inquiry regarding Cybersecurity / Web Project..."
                  className={`w-full rounded-xl border bg-[#090d18] px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all ${
                    errors.subject
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-800 focus:border-cyan-500"
                  }`}
                />
                {errors.subject && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.subject}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1.5">
                  Message <span className="text-cyan-400">*</span>
                </label>
                <textarea
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                  }}
                  placeholder="Share details regarding your idea, role, or collaboration proposal..."
                  className={`w-full rounded-xl border bg-[#090d18] px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none transition-all resize-none ${
                    errors.message
                      ? "border-red-500 focus:border-red-500"
                      : "border-slate-800 focus:border-cyan-500"
                  }`}
                />
                {errors.message && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.message}
                  </p>
                )}
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-8 py-3 text-xs font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] active:scale-95 transition-all"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Transmit Message</span>
                </button>
              </div>

              {/* Feedback status state */}
              {status === "dispatched" && (
                <div className="mt-4 rounded-xl bg-blue-950/40 border border-blue-500/30 p-4 text-xs text-blue-200">
                  <div className="flex items-center gap-2 font-semibold text-cyan-300 mb-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span>Email Dispatch Triggered</span>
                  </div>
                  <p className="text-[11px] text-slate-300">
                    Your message draft has been generated for Prince&apos;s direct inbox (
                    {PORTFOLIO_DATA.personal.socialLinks.email}). If your mail client did not open automatically, you can send directly using the copy button above.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
