"use client";

import { 
  ShieldAlert, 
  Search, 
  Code, 
  Globe, 
  User, 
  FileCode,
  ArrowRight
} from "lucide-react";

export default function FindingsPage() {
  const findings = [
    {
      title: "Credential Access via Memory Injection",
      severity: "Critical",
      description: "The malicious process attempted to inject code into 'lsass.exe' to extract clear-text credentials. This is a characteristic behavior of credential dumping tools like Mimikatz.",
      icon: ShieldAlert,
    },
    {
      title: "Lateral Movement Preparation",
      severity: "High",
      description: "Agent detected network scanning of internal /24 subnet (10.0.4.0/24) targeting port 445 (SMB) and 3389 (RDP).",
      icon: Globe,
    },
    {
      title: "Obfuscated PowerShell Script Execution",
      severity: "High",
      description: "Base64 encoded payload decoded to a reflective DLL injection script. Origin: C:\\Users\\jdoe\\AppData\\Local\\Temp\\update.ps1",
      icon: FileCode,
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Key Findings</h2>
        <div className="text-sm text-gray-400">Total artifacts analyzed: 1,204</div>
      </div>

      <div className="grid gap-6">
        {findings.map((finding, i) => (
          <div key={i} className="card-glass p-6 flex gap-6 group hover:border-brand-primary/30 transition-all">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
              finding.severity === "Critical" 
                ? "bg-brand-danger/10 border-brand-danger/30 text-brand-danger-alt" 
                : "bg-orange-500/10 border-orange-500/30 text-orange-400"
            }`}>
              <finding.icon className="w-7 h-7" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-lg font-bold text-gray-100 group-hover:text-brand-primary transition-colors">
                  {finding.title}
                </h4>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  finding.severity === "Critical" ? "bg-brand-danger/20 text-brand-danger-alt" : "bg-orange-500/20 text-orange-400"
                }`}>
                  {finding.severity}
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                {finding.description}
              </p>
              <div className="mt-4 flex items-center gap-4">
                <button className="text-xs font-semibold text-brand-primary hover:underline flex items-center gap-1">
                  View Raw Event <ArrowRight className="w-3 h-3" />
                </button>
                <button className="text-xs font-semibold text-gray-500 hover:text-white transition-colors">
                  Copy Artifact Hash
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <section className="card-glass p-8 border-dashed border-2">
        <div className="flex flex-col items-center text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4">
            <Search className="text-brand-primary w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">Deep-Dive Analysis</h3>
          <p className="text-gray-400 text-sm mb-6">
            The AI Agent is currently conducting a cross-correlation study with your global fleet to identify if this threat has spread to other assets.
          </p>
          <button className="px-6 py-2.5 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-colors font-semibold text-sm">
            View Expanded Graph Analysis
          </button>
        </div>
      </section>
    </div>
  );
}
