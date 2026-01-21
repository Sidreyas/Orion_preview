"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Search, 
  Filter, 
  ChevronDown, 
  MoreHorizontal, 
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Info
} from "lucide-react";
import { cn } from "@/lib/utils";

const investigations = [
  {
    id: "INV-2024-089",
    timestamp: "2024-05-20 14:22:10",
    source: "CrowdStrike",
    alert: "Suspicious Process Execution: powershell.exe",
    verdict: "Malicious",
    summary: "Confirmed Cobalt Strike beaconing activity detected on HR-LAPTOP-04.",
    analyst: "AI Agent",
  },
  {
    id: "INV-2024-088",
    timestamp: "2024-05-20 13:45:02",
    source: "AWS GuardDuty",
    alert: "IAM Role Enumeration from Unknown IP",
    verdict: "Suspicious",
    summary: "Multiple failed login attempts followed by high-privilege API calls.",
    analyst: "AI Agent",
  },
  {
    id: "INV-2024-087",
    timestamp: "2024-05-20 12:30:55",
    source: "MS Defender",
    alert: "Mimikatz tool detected on memory",
    verdict: "Benign",
    summary: "False positive: Authorized security audit tool used by internal Red Team.",
    analyst: "AI Agent",
  },
  {
    id: "INV-2024-086",
    timestamp: "2024-05-20 11:15:20",
    source: "Okta",
    alert: "MFA Fatigue Attack Observed",
    verdict: "Malicious",
    summary: "User report confirmed unauthorized MFA prompts from foreign location.",
    analyst: "AI Agent",
  },
  {
    id: "INV-2024-085",
    timestamp: "2024-05-20 10:05:44",
    source: "Zscaler",
    alert: "Connection to DGA Domain",
    verdict: "Benign",
    summary: "Infrastructure diagnostic tool communicating with valid CDN endpoint.",
    analyst: "AI Agent",
  },
];

export default function InvestigationsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const router = useRouter();

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Investigations</h1>
          <p className="text-gray-400">Manage and review all AI-driven alert investigations.</p>
        </div>
        <div className="flex items-center gap-4 bg-white/5 border border-border p-2 rounded-2xl">
          <div className="px-4 py-2 border-r border-border">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Queue</p>
            <p className="text-xl font-bold">12</p>
          </div>
          <div className="px-4 py-2 border-r border-border">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">In Progress</p>
            <p className="text-xl font-bold text-brand-primary">4</p>
          </div>
          <div className="px-4 py-2">
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Completed Today</p>
            <p className="text-xl font-bold text-brand-success-alt">42</p>
          </div>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-2 p-1 bg-white/5 rounded-xl border border-border w-full lg:w-auto">
          {["All", "Malicious", "Suspicious", "Benign"].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeFilter === filter 
                  ? "bg-white/10 text-white shadow-sm" 
                  : "text-gray-400 hover:text-white"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by ID, Host, or Source..."
              className="w-full bg-white/5 border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-colors text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="card-glass overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/[0.02] border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Investigation ID</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Verdict</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Summary</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Source</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Time</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {investigations.map((inv) => (
                <tr 
                  key={inv.id} 
                  className="hover:bg-white/[0.01] transition-colors group cursor-pointer"
                  onClick={() => router.push(`/investigations/${inv.id.replace('INV-2024-', '')}`)}
                >
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="font-mono text-sm font-bold text-white group-hover:text-brand-primary transition-colors">
                        {inv.id}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">Managed by {inv.analyst}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider",
                      inv.verdict === "Malicious" ? "bg-brand-danger/20 text-brand-danger-alt border border-brand-danger/30" :
                      inv.verdict === "Suspicious" ? "bg-orange-500/20 text-orange-400 border border-orange-500/30" :
                      "bg-brand-success/20 text-brand-success-alt border border-brand-success/30"
                    )}>
                      {inv.verdict === "Malicious" && <ShieldAlert className="w-3 h-3" />}
                      {inv.verdict === "Suspicious" && <AlertTriangle className="w-3 h-3" />}
                      {inv.verdict === "Benign" && <CheckCircle2 className="w-3 h-3" />}
                      {inv.verdict}
                    </div>
                  </td>
                  <td className="px-6 py-5 max-w-md">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-200 line-clamp-1">{inv.alert}</span>
                      <span className="text-xs text-gray-500 mt-1 line-clamp-1 italic">{inv.summary}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                        <Info className="w-3 h-3 text-gray-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-300">{inv.source}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs text-gray-500 font-mono">{inv.timestamp}</span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 bg-white/[0.01] border-t border-border flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing <span className="text-white font-medium">1-5</span> of <span className="text-white font-medium">124</span> results
          </p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-border text-sm font-medium opacity-50 cursor-not-allowed">Previous</button>
            <button className="px-4 py-2 rounded-lg bg-white/5 border border-border text-sm font-medium hover:bg-white/10 transition-colors">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
