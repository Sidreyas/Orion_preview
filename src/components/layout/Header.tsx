"use client";

import React, { useState } from "react";
import { 
  Bell, 
  Search, 
  ChevronDown, 
  User, 
  Settings, 
  LogOut, 
  LayoutGrid,
  Shield
} from "lucide-react";
import { useAuth, workspaces } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Header() {
  const { user, selectedWorkspace, logout, selectWorkspace } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    { id: 1, title: "Critical Alert: Cobalt Strike Beacon", time: "2 mins ago", type: "critical" },
    { id: 2, title: "New Investigation: Data Exfiltration", time: "15 mins ago", type: "high" },
    { id: 3, title: "System Update: AI Model v4.2 Deployed", time: "1 hour ago", type: "info" },
    { id: 4, title: "Auth Alert: Multiple Failed Logins", time: "3 hours ago", type: "medium" },
  ];

  return (
    <header className="h-16 border-b border-border bg-[#151b23]/95 backdrop-blur-xl px-8 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Breadcrumbs / Workspace */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <button 
            onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-all group"
          >
            <div className="w-8 h-8 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
              <Shield className="text-brand-primary w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 font-medium leading-tight">Workspace</p>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-semibold text-white">{selectedWorkspace?.name}</span>
                <ChevronDown className={cn("w-3.5 h-3.5 text-gray-500 transition-transform", isWorkspaceOpen && "rotate-180")} />
              </div>
            </div>
          </button>

          <AnimatePresence>
            {isWorkspaceOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full left-0 mt-2 w-64 card-glass p-2 shadow-2xl z-50 bg-[#1a2332] border-white/10 backdrop-blur-xl"
              >
                <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 mb-1">
                  Switch Workspace
                </div>
                {workspaces.map((ws) => (
                  <button
                    key={ws.id}
                    onClick={() => {
                      selectWorkspace(ws);
                      setIsWorkspaceOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                      selectedWorkspace?.id === ws.id ? "bg-brand-primary/10 text-brand-primary" : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Shield className="w-4 h-4" />
                    <span className="text-sm font-medium">{ws.name}</span>
                  </button>
                ))}
                <div className="mt-2 pt-2 border-t border-white/5">
                  <Link 
                    href="/workspaces"
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <LayoutGrid className="w-4 h-4" />
                    All Workspaces
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Center: Search */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-brand-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search alerts, investigations, or entities..."
            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:border-brand-primary/50 focus:ring-2 focus:ring-brand-primary/20 transition-all placeholder:text-gray-500"
          />
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-4">
        <div className="relative">
                  <button 
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className={cn(
                      "p-2 rounded-lg transition-all relative",
                      isNotificationsOpen ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-brand-danger rounded-full border-2 border-[#151b23] animate-pulse" />
                  </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-80 card-glass p-4 shadow-2xl z-50 bg-[#1a2332] border-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Notifications</h3>
                  <button className="text-[10px] text-brand-primary hover:underline font-bold">Mark all as read</button>
                </div>
                <div className="space-y-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 rounded-lg hover:bg-white/5 transition-all cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <span className={cn(
                          "text-xs font-bold px-1.5 py-0.5 rounded text-[10px] uppercase",
                          n.type === "critical" ? "bg-brand-danger/20 text-brand-danger-alt" :
                          n.type === "high" ? "bg-orange-500/20 text-orange-400" :
                          "bg-brand-primary/20 text-brand-primary"
                        )}>
                          {n.type}
                        </span>
                        <span className="text-[10px] text-gray-500 font-medium italic">{n.time}</span>
                      </div>
                      <p className="text-xs text-gray-300 group-hover:text-white transition-colors">{n.title}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 pt-4 border-t border-white/5 text-xs text-gray-500 hover:text-white transition-colors font-medium">
                  View all notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
                <div className="relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center gap-3 pl-3 py-1.5 rounded-full hover:bg-white/5 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-[10px] font-bold text-brand-primary">
                      {user?.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="hidden sm:block text-left mr-1">
                      <p className="text-xs font-semibold text-white leading-tight">{user?.name}</p>
                      <p className="text-[10px] text-gray-500 font-medium leading-tight">{user?.role}</p>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-gray-500 mr-2 transition-transform", isProfileOpen && "rotate-180")} />
                  </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-72 card-glass p-4 shadow-2xl z-50 bg-[#1a2332] border-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-white/5">
                  <div className="w-12 h-12 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-sm font-bold text-brand-primary">
                    {user?.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <Link 
                    href="/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    <User className="w-4 h-4" />
                    View Profile
                  </Link>
                  <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <button 
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-brand-danger-alt hover:bg-brand-danger/10 rounded-lg transition-all mt-2 pt-2 border-t border-white/5"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
