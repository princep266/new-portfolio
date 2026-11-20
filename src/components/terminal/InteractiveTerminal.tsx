"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Terminal as TerminalIcon,
  Maximize2,
  Minimize2,
  Copy,
  Check,
  CornerDownLeft,
  Sparkles,
} from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolioData";

interface CommandHistoryItem {
  command: string;
  output: React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [submittedCommands, setSubmittedCommands] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const executeCommand = useCallback((cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    const lowerCmd = rawCmd.toLowerCase();
    let output: React.ReactNode;

    switch (lowerCmd) {
      case "help":
        output = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold mb-2">Available Terminal Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-cyan-300 font-bold">help</span> - Display this reference manual
              </div>
              <div>
                <span className="text-cyan-300 font-bold">about</span> - Display Prince&apos;s biography and goals
              </div>
              <div>
                <span className="text-cyan-300 font-bold">skills</span> - List categorized technical skills
              </div>
              <div>
                <span className="text-cyan-300 font-bold">projects</span> - View featured engineering projects
              </div>
              <div>
                <span className="text-cyan-300 font-bold">education</span> - View academic qualifications
              </div>
              <div>
                <span className="text-cyan-300 font-bold">contact</span> - Show communication channels
              </div>
              <div>
                <span className="text-cyan-300 font-bold">resume</span> - Download Prince&apos;s Resume (PDF)
              </div>
              <div>
                <span className="text-cyan-300 font-bold">scan</span> - Run SOC packet security diagnostic
              </div>
              <div>
                <span className="text-cyan-300 font-bold">whoami</span> - Inspect active session identity
              </div>
              <div>
                <span className="text-cyan-300 font-bold">clear</span> - Flush terminal screen buffer
              </div>
            </div>
          </div>
        );
        break;

      case "about":
        output = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold">NAME: {PORTFOLIO_DATA.personal.name}</p>
            <p className="text-slate-400">LOCATION: {PORTFOLIO_DATA.personal.location}</p>
            <p className="text-slate-300 leading-relaxed mt-2">{PORTFOLIO_DATA.personal.aboutMe}</p>
            <p className="text-slate-400 text-[11px] mt-2">
              Focus: {PORTFOLIO_DATA.personal.identities.join(" | ")}
            </p>
          </div>
        );
        break;

      case "skills":
        output = (
          <div className="space-y-3 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold">TECHNICAL SKILLS MATRIX:</p>
            {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
              <div key={idx} className="border-l-2 border-cyan-500/40 pl-3">
                <span className="text-cyan-300 font-semibold">{cat.name}: </span>
                <span className="text-slate-300">{cat.skills.map((s) => s.name).join(", ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        output = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold">FEATURED PROJECT DOSSIER:</p>
            {PORTFOLIO_DATA.projects.map((p, idx) => (
              <div key={idx} className="rounded-lg bg-slate-900/60 p-3 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{p.title}</span>
                  <span className="text-emerald-400 text-[10px]">{p.status}</span>
                </div>
                <p className="text-slate-400 mt-1">{p.description}</p>
                <p className="text-cyan-300 mt-1">Tech: {p.technologies.join(", ")}</p>
              </div>
            ))}
          </div>
        );
        break;

      case "education":
        output = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold">ACADEMIC RECORD:</p>
            {PORTFOLIO_DATA.education.map((edu, idx) => (
              <div key={idx} className="border-l-2 border-blue-500/40 pl-3 py-1">
                <p className="text-white font-semibold">
                  {edu.degree} {edu.specialization ? `(${edu.specialization})` : ""}
                </p>
                <p className="text-cyan-300 text-[11px]">{edu.institution}</p>
                <p className="text-slate-400 text-[10px] mt-1">
                  Focus: {edu.focusAreas.join(", ")}
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        output = (
          <div className="space-y-1.5 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold">DIRECT CHANNELS:</p>
            <p>
              Email: <span className="text-cyan-300">{PORTFOLIO_DATA.personal.socialLinks.email}</span>
            </p>
            <p>
              LinkedIn:{" "}
              <a
                href={PORTFOLIO_DATA.personal.socialLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                Profile Link
              </a>
            </p>
            <p>
              GitHub:{" "}
              <a
                href={PORTFOLIO_DATA.personal.socialLinks.github}
                target="_blank"
                rel="noreferrer"
                className="text-blue-400 underline"
              >
                GitHub Profile
              </a>
            </p>
            <p className="text-slate-400 text-[11px]">Location: {PORTFOLIO_DATA.personal.location}</p>
          </div>
        );
        break;

      case "resume":
        output = (
          <div className="space-y-2 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400 font-bold">[+] RESUME DOSSIER READY FOR DOWNLOAD</p>
            <p className="text-slate-300">File: {PORTFOLIO_DATA.personal.resume.filename}</p>
            <div className="pt-2">
              <a
                href={PORTFOLIO_DATA.personal.resume.url}
                download={PORTFOLIO_DATA.personal.resume.filename}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-1.5 text-xs text-white font-bold hover:bg-blue-500 transition-colors"
              >
                <span>&darr; Download {PORTFOLIO_DATA.personal.resume.filename}</span>
              </a>
            </div>
          </div>
        );
        break;

      case "whoami":
        output = (
          <div className="text-xs text-slate-300 font-mono">
            <p className="text-cyan-300">visitor@portfolio-client [SEC-LEVEL: ANALYST]</p>
            <p className="text-slate-400 text-[11px]">IP: 192.168.1.104 (Authenticated via pfSense Gateway)</p>
          </div>
        );
        break;

      case "scan":
        output = (
          <div className="space-y-1 text-xs text-slate-300 font-mono">
            <p className="text-cyan-400">[+] Initializing rapid socket packet scan on target gateway...</p>
            <p className="text-slate-400">[i] Checking port 80/tcp (HTTP) ... CLOSED</p>
            <p className="text-slate-400">[i] Checking port 443/tcp (HTTPS) ... OPEN (TLS 1.3 Strict)</p>
            <p className="text-slate-400">[i] Checking port 53/udp (DNS) ... PROTECTED (DNSSEC Active)</p>
            <p className="text-emerald-400 font-semibold">[✓] Threat Assessment: ZERO VULNERABILITIES IDENTIFIED.</p>
            <p className="text-cyan-300 text-[11px]">[✓] pfSense Stateful Inspection: Operational.</p>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        output = (
          <div className="text-xs text-red-400 font-mono">
            Command not recognized: &ldquo;{rawCmd}&rdquo;. Type{" "}
            <span
              className="text-cyan-300 underline cursor-pointer font-bold"
              onClick={() => executeCommand("help")}
            >
              help
            </span>{" "}
            to see all valid commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [
      ...prev,
      {
        command: rawCmd,
        output,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);

    setSubmittedCommands((prev) => [...prev, rawCmd]);
    setHistoryIndex(-1);
    setInputVal("");
  }, []);

  // Initial welcome message
  useEffect(() => {
    const initialOutput = (
      <div className="space-y-2 text-slate-300 font-mono text-xs">
        <p className="text-cyan-400 font-bold">
          {`╔══════════════════════════════════════════════════════════════╗`}
        </p>
        <p className="text-cyan-400 font-bold">
          {`║   PRINCE PRAJAPATI // CYBERSECURITY & DEV TERMINAL v2.4       ║`}
        </p>
        <p className="text-cyan-400 font-bold">
          {`╚══════════════════════════════════════════════════════════════╝`}
        </p>
        <p className="text-slate-400">
          Welcome to the interactive CLI environment. Type{" "}
          <span className="text-cyan-300 font-bold underline cursor-pointer" onClick={() => executeCommand("help")}>
            help
          </span>{" "}
          to inspect all commands, or click any suggestion chip below.
        </p>
      </div>
    );

    setHistory([
      {
        command: "init-session",
        output: initialOutput,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, [executeCommand]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (submittedCommands.length === 0) return;
      const nextIdx =
        historyIndex === -1
          ? submittedCommands.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIdx);
      setInputVal(submittedCommands[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx >= submittedCommands.length) {
        setHistoryIndex(-1);
        setInputVal("");
      } else {
        setHistoryIndex(nextIdx);
        setInputVal(submittedCommands[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = ["help", "about", "skills", "projects", "education", "contact", "resume", "scan", "whoami", "clear"];
      const match = commands.find((c) => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) setInputVal(match);
    }
  };

  const copyTerminalOutput = () => {
    const text = history
      .map((h) => `$ ${h.command}\n${h.command === "init-session" ? "Welcome" : ""}`)
      .join("\n\n");
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="terminal" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-950/20 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
          <TerminalIcon className="h-3 w-3 text-cyan-400" />
          <span>05 // COMMAND LINE INTERFACE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Interactive <span className="text-cyan-400">Terminal</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-xl">
          An authentic developer CLI. Run commands or click quick suggestions to query Prince&apos;s portfolio.
        </p>
      </div>

      {/* Terminal Window Box */}
      <div
        className={`relative rounded-2xl border border-slate-700/80 bg-[#090d18] shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(59,130,246,0.15)] overflow-hidden transition-all duration-300 ${
          isExpanded ? "fixed inset-4 z-50 max-w-none my-0" : ""
        }`}
      >
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0c1220] px-4 py-3 select-none">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer" onClick={() => setHistory([])} title="Clear terminal" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 cursor-pointer" onClick={() => setIsExpanded(false)} title="Restore" />
            <span className="h-3 w-3 rounded-full bg-green-500/80 hover:bg-green-400 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)} title="Toggle expand" />
            <span className="ml-3 font-mono text-xs text-slate-400 hidden sm:inline">
              prince@cyber-workstation: ~ (zsh)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyTerminalOutput}
              className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/50 hover:bg-slate-800 transition-colors"
              title="Copy terminal session"
            >
              {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
              <span className="hidden sm:inline">{isCopied ? "Copied" : "Copy"}</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
              title="Toggle Fullscreen"
            >
              {isExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#080c14] border-b border-slate-800/80 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <span className="text-slate-400 mr-1 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-cyan-400" /> Run:
          </span>
          {["help", "about", "skills", "projects", "education", "contact", "resume", "scan", "clear"].map((cmd) => (
            <button
              key={cmd}
              onClick={() => executeCommand(cmd)}
              className="px-2.5 py-0.5 rounded-md bg-slate-800/70 border border-slate-700/60 text-slate-300 hover:border-cyan-500/50 hover:text-cyan-300 hover:bg-cyan-950/30 transition-all shrink-0"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Content Screen */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="p-5 overflow-y-auto space-y-4 font-mono text-xs cursor-text bg-[#070a12]/95"
          style={{ height: isExpanded ? "calc(100vh - 150px)" : "360px" }}
        >
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400 font-bold">
                <span className="text-emerald-400">prince@cyber-core</span>
                <span className="text-slate-400">:</span>
                <span className="text-blue-400">~</span>
                <span className="text-slate-400">$</span>
                <span className="text-white">{item.command}</span>
                <span className="text-[10px] text-slate-400 font-normal ml-auto">
                  {item.timestamp}
                </span>
              </div>
              <div className="pl-4 pt-1">{item.output}</div>
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center gap-2 text-cyan-400 font-bold pt-1">
            <span className="text-emerald-400">prince@cyber-core</span>
            <span className="text-slate-400">:</span>
            <span className="text-blue-400">~</span>
            <span className="text-slate-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white focus:outline-none font-mono text-xs caret-cyan-400"
              placeholder="type 'help' or any command..."
              autoCapitalize="off"
              autoComplete="off"
              spellCheck="false"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="text-slate-400 hover:text-cyan-400 transition-colors p-1"
              title="Submit command"
            >
              <CornerDownLeft className="h-3.5 w-3.5" />
            </button>
          </div>

          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  );
};
