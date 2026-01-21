"use client";

import { 
  File, 
  Terminal, 
  ShieldCheck, 
  Download, 
  Eye, 
  ExternalLink,
  Lock,
  Search
} from "lucide-react";

export default function EvidencePage() {
  const evidenceItems = [
    {
      name: "process_dump_hr04_20240520.bin",
      type: "Memory Dump",
      size: "124 MB",
      hash: "SHA256: 7a8b...f9e2",
      status: "Verified",
    },
    {
      name: "powershell_history_jdoe.log",
      type: "Text Log",
      size: "45 KB",
      hash: "SHA256: 3c2d...a1b0",
      status: "Verified",
    },
    {
      name: "network_pcap_segment_c2.pcap",
      type: "Network Capture",
      size: "2.4 MB",
      hash: "SHA256: e5f6...7g8h",
      status: "In Analysis",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Evidence Locker</h2>
          <p className="text-sm text-gray-400 mt-1">Immutable forensic storage for this investigation.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-primary shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-opacity font-semibold text-sm">
          <Download className="w-4 h-4" />
          Download All Evidence
        </button>
      </div>

      <div className="card-glass overflow-hidden border-dashed border-2">
        <div className="p-6 border-b border-border bg-white/[0.02] flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search evidence by name or hash..."
              className="w-full bg-white/5 border border-border rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-brand-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Lock className="w-4 h-4" />
            Tamper-proof storage enabled
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/[0.01] border-b border-border">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">File Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Hash (SHA256)</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {evidenceItems.map((item, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                        <File className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-200 group-hover:text-brand-primary transition-colors cursor-pointer">{item.name}</div>
                        <div className="text-[10px] text-gray-500 mt-0.5">{item.size}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-gray-400">{item.type}</span>
                  </td>
                  <td className="px-6 py-4">
                    <code className="text-[11px] text-gray-500 bg-white/5 px-2 py-1 rounded">{item.hash}</code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className={`w-4 h-4 ${item.status === "Verified" ? "text-brand-success-alt" : "text-orange-400"}`} />
                      <span className="text-xs font-medium text-gray-300">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
