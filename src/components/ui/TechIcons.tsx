import React from "react";

export const TechIcon: React.FC<{ name: string; className?: string }> = ({
  name,
  className = "h-5 w-5",
}) => {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  switch (norm) {
    case "python":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2C7 2 7 4 7 4v3h5v1H5s-3 0-3 5 2.5 5 2.5 5h1.5v-2.5c0-1.5 1-2.5 2.5-2.5h5c1.5 0 2.5-1 2.5-2.5V4s0-2-7-2z" stroke="#38bdf8" />
          <path d="M12 22c5 0 5-2 5-2v-3h-5v-1h7s3 0 3-5-2.5-5-2.5-5h-1.5v2.5c0 1.5-1 2.5-2.5 2.5h-5c-1.5 0-2.5 1-2.5 2.5V20s0 2 7 2z" stroke="#fbbf24" />
          <circle cx="9" cy="5" r="0.8" fill="#38bdf8" />
          <circle cx="15" cy="19" r="0.8" fill="#fbbf24" />
        </svg>
      );

    case "javascript":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#facc15" />
          <path d="M10 16v-5M15 16c0-1.5-1-2.5-2.5-2.5" stroke="#facc15" />
        </svg>
      );

    case "reactjs":
    case "react":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#22d3ee" strokeWidth="1.8">
          <ellipse cx="12" cy="12" rx="10" ry="4" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="#22d3ee" />
        </svg>
      );

    case "reactnative":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#60a5fa" strokeWidth="1.8">
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2.5" />
          <ellipse cx="12" cy="10" rx="4" ry="1.5" stroke="#38bdf8" />
        </svg>
      );

    case "fastapi":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#10b981" strokeWidth="2">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="rgba(16, 185, 129, 0.2)" />
        </svg>
      );

    case "postgresql":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38bdf8" strokeWidth="2">
          <ellipse cx="12" cy="6" rx="8" ry="3" />
          <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
          <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
        </svg>
      );

    case "firebase":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#f59e0b" strokeWidth="2">
          <path d="M4 18l4-14 3 6-3 8z" />
          <path d="M17 10l-6 8 9-2z" />
          <path d="M12 4l3 4-7 10z" />
        </svg>
      );

    case "wireshark":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#00f0ff" strokeWidth="2">
          <path d="M2 12c5-8 15-8 20 0-5 8-15 8-20 0z" />
          <path d="M12 4c2 3 4 5 4 8s-2 5-4 8" />
          <circle cx="12" cy="12" r="2" fill="#00f0ff" />
        </svg>
      );

    case "nmap":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#ef4444" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <line x1="12" y1="3" x2="12" y2="21" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <circle cx="16" cy="8" r="1.5" fill="#ef4444" />
        </svg>
      );

    case "tcpdump":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#a78bfa" strokeWidth="2">
          <polyline points="4 17 10 11 4 5" />
          <line x1="12" y1="19" x2="20" y2="19" />
          <circle cx="16" cy="10" r="1" fill="#a78bfa" />
        </svg>
      );

    case "snort":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#f43f5e" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <circle cx="9.5" cy="11.5" r="1" fill="#f43f5e" />
          <circle cx="14.5" cy="11.5" r="1" fill="#f43f5e" />
        </svg>
      );

    case "wazuh":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#06b6d4" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      );

    case "pfsense":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#ec4899" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="9" y1="10" x2="9" y2="20" />
          <line x1="15" y1="10" x2="15" y2="20" />
          <line x1="12" y1="4" x2="12" y2="10" />
        </svg>
      );

    case "kalilinux":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38bdf8" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 12L4 4" />
        </svg>
      );

    case "burpsuite":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#f97316" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7 6 13 6 13s6-6 6-13z" />
          <circle cx="12" cy="8" r="2" fill="#f97316" />
        </svg>
      );

    case "git":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#f87171" strokeWidth="2">
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6" />
          <path d="M9 18h6" />
        </svg>
      );

    case "github":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#e2e8f0" strokeWidth="2">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );

    case "dnssec":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#34d399" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );

    case "cloudsecurity":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#38bdf8" strokeWidth="2">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
          <path d="M12 12v3" stroke="#00f0ff" />
          <circle cx="12" cy="17" r="0.5" fill="#00f0ff" />
        </svg>
      );

    case "sase":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#c084fc" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
      );
  }
};
