"use client";

import { 
  ShieldCheck, 
  ShieldAlert,
  AlertTriangle, 
  Clock, 
  Activity,
  CheckCircle2,
  Terminal,
  Cpu,
  Network
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SummaryPage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: AI Verdict & Reasoning */}
      <div className="lg:col-span-2 space-y-8">
        <section className="card-glass p-8 bg-gradient-to-br from-brand-danger/5 to-transparent">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-brand-danger/20 flex items-center justify-center border border-brand-danger/30">
              <ShieldAlert className="text-brand-danger-alt w-7 h-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">AI Verdict: Malicious</h2>
              <p className="text-gray-400">Confidence Score: 98.4%</p>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-200 leading-relaxed text-lg">
              The investigation has confirmed active **Cobalt Strike beaconing** activity on HR-LAPTOP-04. 
              The AI agent detected an unauthorized PowerShell process communicating with a known command-and-control (C2) 
              server via encrypted HTTPS traffic.
            </p>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-xl font-semibold px-2">Investigation Reasoning Trail</h3>
          <div className="space-y-4">
            {[
              { 
                step: "Log Correlation", 
                desc: "Correlated PowerShell execution logs with network connection attempts.", 
                icon: Activity,
                status: "success" 
              },
              { 
                step: "Process Analysis", 
                desc: "Analyzed memory artifacts and parent-child process relationships for 'powershell.exe'.", 
                icon: Cpu,
                status: "success" 
              },
              { 
                step: "Intelligence Lookup", 
                desc: "Queried threat intelligence feeds for destination IP 185.123.x.x (Identified as Malicious).", 
                icon: Network,
                status: "success" 
              },
              { 
                step: "User Context Check", 
                desc: "Verified HR-LAPTOP-04 owner (John Doe) has no authorized use for advanced scripting tools.", 
                icon: CheckCircle2,
                status: "success" 
              },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 card-glass group hover:bg-white/[0.04] transition-all">
                <div className="mt-1">
                  <item.icon className="w-5 h-5 text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-200">{item.step}</h4>
                  <p className="text-sm text-gray-400 mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Right Column: Key Entities & Timeline */}
      <div className="space-y-8">
        <section className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-brand-primary" />
            Key Entities
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Host</p>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border">
                <span className="text-sm font-medium">HR-LAPTOP-04</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-danger/10 text-brand-danger-alt">Critical Asset</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">Process</p>
              <div className="p-3 rounded-xl bg-white/5 border border-border">
                <code className="text-[11px] text-brand-primary">powershell.exe -e JABzAD0ATgBlAH...</code>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-2">IP Address</p>
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-border">
                <span className="text-sm font-mono text-gray-300">185.123.45.67</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-danger/10 text-brand-danger-alt">C2 Server</span>
              </div>
            </div>
          </div>
        </section>

        <section className="card-glass p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-primary" />
            Investigation Timeline
          </h3>
          <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
            {[
              { time: "14:22:10", label: "Alert Received", active: false },
              { time: "14:22:15", label: "Agent Initialized", active: false },
              { time: "14:22:45", label: "Evidence Gathered", active: false },
              { time: "14:23:30", label: "Verdict Reached", active: true },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 relative pl-8">
                <div className={cn(
                  "absolute left-0 w-4 h-4 rounded-full border-2 border-background z-10",
                  item.active ? "bg-brand-primary shadow-[0_0_8px_rgba(0,210,255,1)]" : "bg-border"
                )} />
                <div>
                  <p className="text-xs font-mono text-gray-500">{item.time}</p>
                  <p className={cn("text-sm font-medium", item.active ? "text-brand-primary" : "text-gray-300")}>
                    {item.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
