"use client";

import { 
  TrendingUp, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  ArrowUpRight, 
  MoreVertical, 
  Activity,
  Calendar,
  ChevronDown
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";

const metrics = [
  {
    title: "Total Alerts Investigated",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    icon: ShieldCheck,
    gradient: "from-brand-primary to-brand-secondary",
  },
  {
    title: "Mean Time to Conclusion",
    value: "2m 14s",
    change: "-45s",
    trend: "down",
    icon: Clock,
    gradient: "from-purple-500 to-indigo-600",
  },
  {
    title: "Human Hours Saved",
    value: "4,820",
    change: "+156",
    trend: "up",
    icon: UserCheck,
    gradient: "from-brand-success to-brand-success-alt",
  },
  {
    title: "Autonomous Coverage",
    value: "98.2%",
    change: "+2.1%",
    trend: "up",
    icon: Activity,
    gradient: "from-orange-500 to-brand-danger",
  },
];

const activeInvestigations = [
  {
    id: "INV-2024-001",
    title: "Unauthorized Access Attempt - AWS",
    severity: "High",
    status: "Analyzing",
    time: "4m ago",
  },
  {
    id: "INV-2024-002",
    title: "Potential Data Exfiltration - Defender",
    severity: "Critical",
    status: "Reasoning",
    time: "12m ago",
  },
  {
    id: "INV-2024-003",
    title: "Phishing Link Clicked - M365",
    severity: "Medium",
    status: "Gathering Evidence",
    time: "18m ago",
  },
];

export default function DashboardPage() {
  const { selectedWorkspace } = useAuth();
  const [timeFilter, setTimeFilter] = useState("Last 24 Hours");
  const [isTimeFilterOpen, setIsTimeFilterOpen] = useState(false);
  const [isAbsolute, setIsAbsolute] = useState(false);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const relativeOptions = [
    "Last 24 Hours",
    "Last 3 Days",
    "Last 7 Days",
    "Last 30 Days",
    "Last 6 Months",
    "Last 1 Year",
  ];

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2 text-white">
            {selectedWorkspace?.name || "Security"} Dashboard
          </h1>
          <p className="text-gray-400">Welcome back, analyst. Here's your autonomous SOC overview.</p>
        </div>
        
                {/* Time Filter Dropdown */}
                <div className="relative">
                  <button 
                    onClick={() => setIsTimeFilterOpen(!isTimeFilterOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-sm font-medium"
                  >
                    <Calendar className="w-4 h-4 text-brand-primary" />
                    <span className="text-white">{isAbsolute ? "Custom Range" : timeFilter}</span>
                    <ChevronDown className={cn("w-4 h-4 text-gray-500 transition-transform", isTimeFilterOpen && "rotate-180")} />
                  </button>

                  {isTimeFilterOpen && (
                    <div className="absolute top-full right-0 mt-2 w-72 card-glass p-4 shadow-2xl z-50 bg-[#1a2332] border-white/10 backdrop-blur-xl">
              <div className="space-y-1 mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-2">Relative Range</p>
                {relativeOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setTimeFilter(opt);
                      setIsAbsolute(false);
                      setIsTimeFilterOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-3 py-2 rounded-lg text-sm transition-all",
                      !isAbsolute && timeFilter === opt ? "bg-brand-primary/10 text-brand-primary" : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 mb-3">Absolute Range</p>
                <div className="space-y-3 px-2">
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">Start Date & Time</label>
                    <input 
                      type="datetime-local" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-primary/50 text-white"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] text-gray-500 uppercase font-bold">End Date & Time</label>
                    <input 
                      type="datetime-local" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs outline-none focus:border-brand-primary/50 text-white"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                    />
                  </div>
                  <button 
                    onClick={() => {
                      setIsAbsolute(true);
                      setIsTimeFilterOpen(false);
                    }}
                    disabled={!dateRange.start || !dateRange.end}
                    className="w-full bg-brand-primary text-white py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-all disabled:opacity-50 disabled:shadow-none mt-2"
                  >
                    Apply Custom Range
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((metric) => (
                  <div key={metric.title} className="card-glass p-6 hover:border-white/20 transition-all duration-200">
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg",
                        metric.gradient
                      )}>
                        <metric.icon className="text-white w-6 h-6" />
                      </div>
              <div className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                metric.trend === "up" ? "text-brand-success-alt bg-brand-success/10" : "text-brand-danger-alt bg-brand-danger/10"
              )}>
                {metric.change}
                <TrendingUp className={cn("w-3 h-3", metric.trend === "down" && "rotate-180")} />
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm font-medium mb-1">{metric.title}</p>
              <h3 className="text-2xl font-bold">
                {metric.title === "Total Alerts Investigated" && selectedWorkspace 
                  ? (selectedWorkspace.activeIncidents * 10).toLocaleString() 
                  : metric.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Active Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Card */}
        <div className="lg:col-span-2 card-glass p-6 min-h-[400px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-semibold">Investigation Velocity</h2>
              <p className="text-sm text-gray-400">Activity volume over the last 24 hours</p>
            </div>
            <select className="bg-white/5 border border-border rounded-lg px-3 py-1.5 text-sm outline-none">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          <div className="flex-1 w-full bg-white/[0.02] rounded-xl border border-dashed border-border flex items-center justify-center group cursor-pointer hover:bg-white/[0.04] transition-all">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Activity className="text-brand-primary w-8 h-8" />
              </div>
              <p className="text-gray-400 font-medium">Activity Chart Rendering...</p>
              <p className="text-xs text-gray-500 mt-1">Interactive data visualization will appear here</p>
            </div>
          </div>
        </div>

        {/* Active Investigations Feed */}
        <div className="card-glass p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Active Feed</h2>
            <button className="text-brand-primary text-sm font-medium hover:underline">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {activeInvestigations.map((inv) => (
              <div key={inv.id} className="p-4 rounded-xl bg-white/[0.02] border border-border hover:bg-white/5 transition-all cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-brand-primary bg-brand-primary/10 px-2 py-0.5 rounded">
                    {inv.id}
                  </span>
                  <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{inv.time}</span>
                </div>
                <h4 className="font-semibold text-sm mb-3 group-hover:text-brand-primary transition-colors">
                  {inv.title}
                </h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                    <span className="text-xs text-gray-400">{inv.status}</span>
                  </div>
                  <div className={cn(
                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                    inv.severity === "Critical" ? "text-brand-danger-alt bg-brand-danger/10" : 
                    inv.severity === "High" ? "text-orange-400 bg-orange-400/10" : "text-brand-primary bg-brand-primary/10"
                  )}>
                    {inv.severity}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 rounded-xl border border-dashed border-border text-gray-400 text-sm font-medium hover:bg-white/5 transition-colors">
            + Expand Live Monitor
          </button>
        </div>
      </div>
    </div>
  );
}
