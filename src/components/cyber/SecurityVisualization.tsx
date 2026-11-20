"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Shield,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Zap,
} from "lucide-react";

interface Packet {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  progress: number;
  speed: number;
  isAttack: boolean;
  type: string;
}

export const SecurityVisualization: React.FC = () => {
  const [isAttackSimulated, setIsAttackSimulated] = useState(false);
  const [packetCount, setPacketCount] = useState(1482);
  const [blockedCount, setBlockedCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState<"NORMAL" | "MITIGATING" | "THREAT_ANALYSIS">("NORMAL");
  const [socLogs, setSocLogs] = useState<{ id: number; text: string; time: string; type: "info" | "warn" | "danger" }[]>([
    { id: 1, text: "pfSense Firewall rule active: stateful ingress inspection enabled", time: "16:40:02", type: "info" },
    { id: 2, text: "ML-Based IDS Feature Extractor: baseline packet flow nominal", time: "16:42:15", type: "info" },
  ]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger DoS Attack Simulation
  const handleTriggerAttack = () => {
    if (isAttackSimulated) return;
    setIsAttackSimulated(true);
    setSystemStatus("THREAT_ANALYSIS");

    const newLog1 = {
      id: Date.now(),
      text: "ANOMALY DETECTED: Sudden volumetric SYN/UDP burst signature identified from external socket",
      time: new Date().toLocaleTimeString(),
      type: "danger" as const,
    };
    setSocLogs((prev) => [newLog1, ...prev.slice(0, 5)]);

    setTimeout(() => {
      setSystemStatus("MITIGATING");
      setBlockedCount((prev) => prev + 450);
      const newLog2 = {
        id: Date.now() + 1,
        text: "pfSense Mitigation Rule triggered: Malicious packet rate throttled & IP dropped",
        time: new Date().toLocaleTimeString(),
        type: "warn" as const,
      };
      setSocLogs((prev) => [newLog2, ...prev.slice(0, 5)]);
    }, 1800);

    setTimeout(() => {
      setIsAttackSimulated(false);
      setSystemStatus("NORMAL");
      const newLog3 = {
        id: Date.now() + 2,
        text: "Traffic normalized. Server integrity 100% maintained with zero service downtime.",
        time: new Date().toLocaleTimeString(),
        type: "info" as const,
      };
      setSocLogs((prev) => [newLog3, ...prev.slice(0, 5)]);
    }, 5500);
  };

  // Packet Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.parentElement?.clientWidth || 700);
    const height = (canvas.height = 240);

    // Node Positions
    const nodes = {
      client: { x: width * 0.12, y: height * 0.5, name: "Traffic Source" },
      firewall: { x: width * 0.38, y: height * 0.5, name: "pfSense Firewall" },
      ids: { x: width * 0.64, y: height * 0.5, name: "ML Intrusion Model" },
      server: { x: width * 0.88, y: height * 0.5, name: "Target Server" },
    };

    let packets: Packet[] = [];
    let nextPacketId = 0;

    const spawnPacket = () => {
      const isAttack = isAttackSimulated && Math.random() > 0.25;
      packets.push({
        id: nextPacketId++,
        x: nodes.client.x,
        y: nodes.client.y + (Math.random() - 0.5) * 20,
        targetX: isAttack ? nodes.firewall.x : nodes.server.x,
        targetY: nodes.server.y,
        progress: 0,
        speed: isAttack ? 0.025 : 0.012 + Math.random() * 0.008,
        isAttack,
        type: isAttack ? "SYN_FLOOD" : "TCP_VALID",
      });
      setPacketCount((c) => c + 1);
    };

    let spawnTimer = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Connection Wire Rail
      ctx.beginPath();
      ctx.moveTo(nodes.client.x, nodes.client.y);
      ctx.lineTo(nodes.server.x, nodes.server.y);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.2)";
      ctx.lineWidth = 3;
      ctx.stroke();

      // Spawn packets at rate
      spawnTimer++;
      const spawnThreshold = isAttackSimulated ? 4 : 22;
      if (spawnTimer >= spawnThreshold) {
        spawnPacket();
        spawnTimer = 0;
      }

      // Update & Render Packets
      packets.forEach((p) => {
        p.progress += p.speed;

        const currentX = nodes.client.x + (nodes.server.x - nodes.client.x) * p.progress;
        const currentY = nodes.client.y + Math.sin(p.progress * Math.PI * 4) * 4;

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.isAttack ? 4 : 3, 0, Math.PI * 2);

        if (p.isAttack) {
          ctx.fillStyle = "#ef4444";
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 8;
        } else {
          ctx.fillStyle = "#22d3ee";
          ctx.shadowColor = "#22d3ee";
          ctx.shadowBlur = 6;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Filter out finished packets or blocked attack packets at firewall
      packets = packets.filter((p) => {
        if (p.isAttack && p.progress >= 0.45) {
          return false;
        }
        return p.progress < 1.0;
      });

      // Draw Nodes
      Object.entries(nodes).forEach(([key, node]) => {
        const isFirewall = key === "firewall";
        const isIDS = key === "ids";
        const isThreatActive = isAttackSimulated && (isFirewall || isIDS);

        ctx.beginPath();
        ctx.arc(node.x, node.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = isThreatActive ? "#1e1b4b" : "#0d1322";
        ctx.fill();

        ctx.strokeStyle = isThreatActive
          ? "#ef4444"
          : isFirewall
          ? "#06b6d4"
          : isIDS
          ? "#8b5cf6"
          : "#3b82f6";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = isThreatActive ? "#ef4444" : "#38bdf8";
        ctx.fill();

        ctx.font = "10px monospace";
        ctx.fillStyle = "#94a3b8";
        ctx.textAlign = "center";
        ctx.fillText(node.name, node.x, node.y + 32);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [isAttackSimulated]);

  return (
    <section id="security" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
          <Shield className="h-3 w-3 text-cyan-400" />
          <span>06 // CYBERSECURITY TELEMETRY</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
          Interactive <span className="text-cyan-400">SOC Defense Simulator</span>
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl">
          Visualizing real-time network packet flow, ML anomaly detection, and automated pfSense firewall mitigation.
        </p>
      </div>

      {/* Main Simulator Card */}
      <div className="rounded-3xl border border-slate-800 bg-[#0d1322]/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl">
        {/* Top telemetry bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80 mb-6">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                systemStatus === "NORMAL"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                  : systemStatus === "MITIGATING"
                  ? "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
                  : "bg-red-500/10 border-red-500/30 text-red-400"
              }`}
            >
              {systemStatus === "NORMAL" ? (
                <ShieldCheck className="h-5 w-5" />
              ) : (
                <ShieldAlert className="h-5 w-5 animate-bounce" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">Security Posture:</span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    systemStatus === "NORMAL"
                      ? "text-emerald-400 bg-emerald-950/40 border border-emerald-800/40"
                      : "text-red-400 bg-red-950/40 border border-red-800/40 animate-pulse"
                  }`}
                >
                  {systemStatus === "NORMAL"
                    ? "OPTIMAL // NO THREAT"
                    : systemStatus === "MITIGATING"
                    ? "MITIGATING THREAT"
                    : "VOLUMETRIC FLOOD DETECTED"}
                </span>
              </div>
              <p className="text-xs font-mono text-slate-400 mt-0.5">
                pfSense Stateful Engine &bull; ML Packet Feature Classifier Active
              </p>
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            onClick={handleTriggerAttack}
            disabled={isAttackSimulated}
            className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-bold font-mono transition-all shadow-lg ${
              isAttackSimulated
                ? "bg-red-600/30 text-red-300 border border-red-500/50 cursor-not-allowed"
                : "bg-gradient-to-r from-red-600 to-rose-600 text-white hover:brightness-110 active:scale-95 shadow-red-900/30"
            }`}
          >
            <Zap className="h-4 w-4" />
            <span>{isAttackSimulated ? "SIMULATION RUNNING..." : "SIMULATE DoS ATTACK"}</span>
          </button>
        </div>

        {/* Live Canvas Area */}
        <div className="relative rounded-2xl bg-[#070a12] border border-slate-800 p-4 overflow-hidden mb-6">
          <div className="absolute top-3 left-4 flex items-center gap-2 text-[10px] font-mono text-slate-400">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>REAL-TIME PACKET FLOW VISUALIZER</span>
          </div>

          <div className="h-[240px] w-full flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          <div className="absolute bottom-3 right-4 flex items-center gap-4 text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" /> Normal TCP/TLS
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-400" /> DoS SYN Flood
            </span>
          </div>
        </div>

        {/* Live Metric Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="rounded-xl border border-slate-800 bg-[#090d18] p-3 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Packets Analyzed</span>
            <div className="text-xl font-bold font-mono text-cyan-300 mt-1">
              {packetCount.toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#090d18] p-3 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Anomalous Drops</span>
            <div className="text-xl font-bold font-mono text-red-400 mt-1">
              {blockedCount.toLocaleString()}
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#090d18] p-3 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Detection Engine</span>
            <div className="text-sm font-bold font-mono text-emerald-400 mt-1.5">
              ML Scikit / Sockets
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 bg-[#090d18] p-3 text-center">
            <span className="text-[10px] font-mono text-slate-400 uppercase">Firewall Gateway</span>
            <div className="text-sm font-bold font-mono text-blue-400 mt-1.5">
              pfSense Stateful
            </div>
          </div>
        </div>

        {/* Real-time SOC Security Event Feed */}
        <div className="rounded-2xl border border-slate-800 bg-[#090d18] p-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 mb-3 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              <span>LIVE SOC ALERT TELEMETRY STREAM</span>
            </span>
            <span className="text-[10px] text-slate-400">Auto-refresh</span>
          </div>

          <div className="space-y-2">
            {socLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-start justify-between gap-3 text-xs font-mono rounded-lg p-2 bg-[#0d1322] border border-slate-800/60"
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                      log.type === "danger"
                        ? "bg-red-500 animate-ping"
                        : log.type === "warn"
                        ? "bg-yellow-400"
                        : "bg-cyan-400"
                    }`}
                  />
                  <span
                    className={
                      log.type === "danger"
                        ? "text-red-300 font-medium"
                        : log.type === "warn"
                        ? "text-yellow-200"
                        : "text-slate-300"
                    }
                  >
                    {log.text}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">{log.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
