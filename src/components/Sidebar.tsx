"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Search, 
  Settings, 
  Bell, 
  Users,
  ChevronRight,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
    { name: "Investigations", icon: ShieldAlert, href: "/investigations/all" },
    { name: "Threat Hunting", icon: Search, href: "/hunting" },
    { name: "Team", icon: Users, href: "/team" },
    { name: "Notifications", icon: Bell, href: "/notifications" },
    { name: "Settings", icon: Settings, href: "/settings" },
  ];

  return (
    <aside className="w-64 border-r border-border flex flex-col h-full bg-[#0B0F19]/50 backdrop-blur-xl">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
          <Zap className="text-white w-6 h-6 fill-current" />
        </div>
        <span className="text-xl font-bold tracking-tight">ORION</span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                isActive 
                  ? "bg-gradient-primary text-white shadow-lg shadow-brand-primary/20" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-white" : "group-hover:text-white")} />
              <span className="font-medium">{item.name}</span>
              {isActive && <ChevronRight className="ml-auto w-4 h-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="card-glass p-4 bg-gradient-to-br from-white/5 to-transparent">
          <p className="text-xs text-gray-400 mb-2 uppercase tracking-wider font-semibold">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
            <span className="text-sm font-medium">AI Agent Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
