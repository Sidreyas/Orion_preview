"use client";

import { 
  ShieldCheck, 
  Wrench, 
  CheckCircle2, 
  Play, 
  Info,
  ChevronRight,
  AlertTriangle
} from "lucide-react";

export default function RemediationsPage() {
  const playbooks = [
    {
      title: "Isolate Infected Host",
      target: "HR-LAPTOP-04",
      action: "Network Isolation via CrowdStrike Falcon",
      status: "Recommended",
      recommended: true,
    },
    {
      title: "Reset User Credentials",
      target: "John Doe (jdoe@acme.com)",
      action: "Force Password Reset & Revoke Active Sessions",
      status: "Recommended",
      recommended: true,
    },
    {
      title: "Block Malicious C2 IP",
      target: "185.123.45.67",
      action: "Create Block Rule on Palo Alto Firewall",
      status: "Pending Approval",
      recommended: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Suggested Remediations</h2>
          <p className="text-sm text-gray-400 mt-1">AI-driven response actions to neutralize the threat.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2.5 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-colors font-semibold text-sm">
            Customize Response
          </button>
          <button className="px-4 py-2.5 rounded-xl bg-gradient-success shadow-lg shadow-brand-success/20 hover:opacity-90 transition-opacity font-bold text-sm">
            Approve All Recommendations
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {playbooks.map((play, i) => (
          <div key={i} className="card-glass p-6 flex items-center justify-between group hover:border-brand-success/30 transition-all">
            <div className="flex items-center gap-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border shadow-lg ${
                play.recommended ? "bg-brand-success/10 border-brand-success/30 text-brand-success-alt" : "bg-white/5 border-border text-gray-400"
              }`}>
                {play.recommended ? <ShieldCheck className="w-6 h-6" /> : <Wrench className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-gray-100 group-hover:text-brand-success-alt transition-colors">{play.title}</h4>
                  {play.recommended && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-success/20 text-brand-success-alt">AI Recommended</span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-400">Target: <span className="text-gray-200 font-mono">{play.target}</span></span>
                  <span className="text-gray-400 border-l border-border pl-4">Action: <span className="text-gray-200">{play.action}</span></span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className={`text-xs font-bold uppercase tracking-wider ${
                play.status === "Recommended" ? "text-brand-success-alt" : "text-gray-500"
              }`}>
                {play.status}
              </span>
              <button className="p-3 rounded-xl bg-brand-success/10 border border-brand-success/30 text-brand-success-alt hover:bg-brand-success hover:text-white transition-all shadow-lg shadow-brand-success/20">
                <Play className="w-5 h-5 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 flex gap-4">
        <Info className="text-brand-primary w-6 h-6 shrink-0" />
        <div className="text-sm leading-relaxed text-gray-300">
          <strong className="text-brand-primary block mb-1">Impact Analysis:</strong>
          Isolating the host will temporarily disconnect it from the internal network to prevent lateral movement. John Doe will not be able to access cloud services until the asset is cleared.
        </div>
      </div>
    </div>
  );
}
