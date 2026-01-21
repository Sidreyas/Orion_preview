"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Sparkles,
  Settings, 
  Bell, 
  ChevronRight,
  Zap,
  PlugZap
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Investigations", icon: ShieldAlert, href: "/investigations/all" },
    { name: "Connectors", icon: PlugZap, href: "/connectors" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="w-64 border-r border-border flex flex-col h-full bg-[#151b23] relative">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <Sparkles className="text-white w-5 h-5" />
        </div>
        <span className="text-lg font-bold tracking-tight text-white">
          COGNITIX AI
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative",
                isActive 
                  ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "text-brand-primary")} />
              <span className="font-medium text-sm">{item.name}</span>
              {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-semibold">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
            <span className="text-sm font-medium text-gray-300">AI Agent Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
