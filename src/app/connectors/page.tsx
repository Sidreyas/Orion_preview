"use client";

import { useState, useMemo } from "react";
import { 
  Search, 
  Filter, 
  ChevronRight, 
  Plus, 
  ExternalLink,
  Shield,
  Cloud,
  Mail,
  Lock,
  Database,
  Globe,
  Activity,
  Zap,
  Ticket,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Cloud",
  "DLP",
  "Email",
  "Endpoint",
  "Identity",
  "Malware",
  "Network",
  "Productivity",
  "SIEM/Data Lake",
  "SOAR",
  "Threat-Intel",
  "Ticketing",
  "Tooling",
  "Vulnerability",
];

const connectors = [
  { name: "Splunk", category: "SIEM/Data Lake", icon: "https://simpleicons.org/icons/splunk.svg" },
  { name: "Microsoft Sentinel", category: "SIEM/Data Lake", icon: "https://simpleicons.org/icons/microsoftazure.svg" },
  { name: "CrowdStrike", category: "Endpoint", icon: "https://simpleicons.org/icons/crowdstrike.svg" },
  { name: "AWS GuardDuty", category: "Cloud", icon: "https://simpleicons.org/icons/amazonguardduty.svg" },
  { name: "Okta", category: "Identity", icon: "https://simpleicons.org/icons/okta.svg" },
  { name: "Microsoft Defender", category: "Endpoint", icon: "https://simpleicons.org/icons/microsoftdefender.svg" },
  { name: "Google Cloud", category: "Cloud", icon: "https://simpleicons.org/icons/googlecloud.svg" },
  { name: "SentinelOne", category: "Endpoint", icon: "https://simpleicons.org/icons/sentinelone.svg" },
  { name: "Palo Alto Cortex XSIAM", category: "SIEM/Data Lake", icon: "https://simpleicons.org/icons/paloaltonetworks.svg" },
  { name: "Zscaler", category: "Network", icon: "https://simpleicons.org/icons/zscaler.svg" },
  { name: "Slack", category: "Productivity", icon: "https://simpleicons.org/icons/slack.svg" },
  { name: "Microsoft Teams", category: "Productivity", icon: "https://simpleicons.org/icons/microsoftteams.svg" },
  { name: "Jira Software", category: "Ticketing", icon: "https://simpleicons.org/icons/jirasoftware.svg" },
  { name: "ServiceNow", category: "Ticketing", icon: "https://simpleicons.org/icons/servicenow.svg" },
  { name: "VirusTotal", category: "Malware", icon: "https://simpleicons.org/icons/virustotal.svg" },
  { name: "GreyNoise", category: "Threat-Intel", icon: "https://simpleicons.org/icons/greynoise.svg" },
  { name: "AbuseIPDB", category: "Threat-Intel", icon: "https://simpleicons.org/icons/abuseipdb.svg" },
  { name: "Gmail", category: "Email", icon: "https://simpleicons.org/icons/gmail.svg" },
  { name: "Tines", category: "SOAR", icon: "https://simpleicons.org/icons/tines.svg" },
  { name: "Torq", category: "SOAR", icon: "https://simpleicons.org/icons/torq.svg" },
];

export default function ConnectorsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConnectors = useMemo(() => {
    return connectors.filter((c) => {
      const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="p-8 space-y-8 max-w-[1600px] mx-auto min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Connectors</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Orion integrates with your security tools and data stack so it can locate, fetch and feed information to its LLM-native system.
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-primary shadow-lg shadow-brand-primary/20 hover:opacity-90 transition-opacity font-bold">
          <Plus className="w-5 h-5" />
          Request Integration
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Sidebar Category Filter */}
        <div className="w-full xl:w-64 space-y-2">
          <div className="flex items-center justify-between px-2 mb-4">
            <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Categories</span>
            <button 
              onClick={() => setSelectedCategory("All")}
              className="text-xs text-brand-primary hover:underline font-semibold"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap xl:flex-col gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-sm font-medium transition-all text-left whitespace-nowrap",
                  selectedCategory === cat 
                    ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid Area */}
        <div className="flex-1 space-y-6 w-full">
          {/* Search Bar */}
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-brand-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search connectors by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-border rounded-2xl pl-12 pr-4 py-4 text-lg outline-none focus:border-brand-primary/50 transition-all focus:ring-1 focus:ring-brand-primary/20"
            />
          </div>

          {/* Connectors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {filteredConnectors.map((connector) => (
              <div 
                key={connector.name} 
                className="card-glass p-6 group hover:border-brand-primary/30 transition-all cursor-pointer flex flex-col justify-between min-h-[220px]"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="w-14 h-14 rounded-2xl bg-white/5 border border-border flex items-center justify-center overflow-hidden p-2 group-hover:scale-105 transition-transform">
                      <img 
                        src={connector.icon} 
                        alt={connector.name}
                        className="w-full h-full object-contain filter invert opacity-80 group-hover:opacity-100"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('bg-brand-primary/10');
                          const icon = document.createElement('div');
                          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-zap text-brand-primary"><path d="M4 14.71 14 3v9.29L20 9.29 10 21v-9.29Z"/></svg>';
                          e.currentTarget.parentElement?.appendChild(icon.firstChild as Node);
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-100 group-hover:text-brand-primary transition-colors">
                      {connector.name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{connector.category}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <button className="text-sm font-bold text-brand-primary hover:underline flex items-center gap-1.5 transition-all">
                    Learn More
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>

          {filteredConnectors.length === 0 && (
            <div className="card-glass p-12 text-center">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-gray-500" />
              </div>
              <h3 className="text-2xl font-bold mb-2">No connectors found</h3>
              <p className="text-gray-400">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
