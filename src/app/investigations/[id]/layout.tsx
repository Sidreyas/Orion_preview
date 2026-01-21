"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { 
  FileText, 
  Search, 
  Database, 
  Wrench, 
  History,
  ChevronLeft,
  Share2,
  Download,
  ShieldAlert
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function InvestigationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { id } = useParams();

  const navItems = [
    { name: "Summary", href: `/investigations/${id}`, icon: FileText },
    { name: "Findings", href: `/investigations/${id}/findings`, icon: Search },
    { name: "Evidence Locker", href: `/investigations/${id}/evidence`, icon: Database },
    { name: "Remediations", href: `/investigations/${id}/remediations`, icon: Wrench },
    { name: "Changelog", href: `/investigations/${id}/changelog`, icon: History },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Top Header */}
      <div className="border-b border-border bg-card/30 backdrop-blur-md px-8 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link 
              href="/investigations/all" 
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-xl font-bold tracking-tight">Investigation: {id}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-brand-danger/20 text-brand-danger-alt border border-brand-danger/30">
                  Malicious
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">Suspicious Process Execution: powershell.exe on HR-LAPTOP-04</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-colors text-sm font-medium">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-border hover:bg-white/10 transition-colors text-sm font-medium">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-danger shadow-lg shadow-brand-danger/20 hover:opacity-90 transition-opacity font-medium text-sm">
              Escalate to Incident
            </button>
          </div>
        </div>

        {/* Sub-Navbar */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all relative group",
                  isActive 
                    ? "text-brand-primary" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className={cn("w-4 h-4", isActive ? "text-brand-primary" : "text-gray-400 group-hover:text-white")} />
                {item.name}
                {isActive && (
                  <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-brand-primary shadow-[0_0_8px_rgba(0,210,255,0.5)]" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
