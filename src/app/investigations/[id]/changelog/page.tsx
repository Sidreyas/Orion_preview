"use client";

import { 
  History, 
  User, 
  Bot, 
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  MessageSquare
} from "lucide-react";

export default function ChangelogPage() {
  const logs = [
    {
      time: "2024-05-20 14:23:30",
      user: "AI Agent",
      type: "verdict",
      action: "Verdict reached: Malicious",
      details: "Based on 98.4% confidence correlation with Cobalt Strike C2 patterns.",
      isAI: true,
    },
    {
      time: "2024-05-20 14:22:50",
      user: "AI Agent",
      type: "artifact",
      action: "New evidence attached: powershell_history_jdoe.log",
      details: "Automated extraction from HR-LAPTOP-04 filesystem.",
      isAI: true,
    },
    {
      time: "2024-05-20 14:22:45",
      user: "AI Agent",
      type: "status",
      action: "Investigation status changed to 'Analyzing'",
      details: "Triggered by high-severity CrowdStrike alert.",
      isAI: true,
    },
    {
      time: "2024-05-20 14:22:10",
      user: "System",
      type: "alert",
      action: "Investigation started",
      details: "Source: Microsoft Sentinel Connector.",
      isAI: false,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Investigation Changelog</h2>
        <p className="text-sm text-gray-400 mt-1">A complete audit trail of all AI and human actions.</p>
      </div>

      <div className="relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border space-y-8 pl-1">
        {logs.map((log, i) => (
          <div key={i} className="relative pl-12">
            {/* Timeline Indicator */}
            <div className={`absolute left-0 w-10 h-10 rounded-xl flex items-center justify-center z-10 border shadow-lg ${
              log.isAI ? "bg-brand-primary/10 border-brand-primary/30 text-brand-primary" : "bg-white/5 border-border text-gray-400"
            }`}>
              {log.isAI ? <Bot className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>

            <div className="card-glass p-5 hover:bg-white/[0.03] transition-colors cursor-default">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-gray-200">{log.action}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/5 text-gray-500 border border-border">
                    {log.user}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-gray-500">{log.time}</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed italic">
                "{log.details}"
              </p>
              
              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <button className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-500 hover:text-white transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Add Comment
                </button>
                <button className="text-[11px] font-semibold text-brand-primary hover:underline">
                  View Full Reasoning Trail
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
