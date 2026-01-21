"use client";

import React from "react";
import { Shield, MapPin, AlertTriangle, Activity, Clock } from "lucide-react";
import { useAuth, workspaces } from "@/context/AuthContext";
import { motion } from "framer-motion";

export default function WorkspacesPage() {
  const { user, selectWorkspace } = useAuth();

  return (
    <div className="min-h-screen bg-[#0a0f14] text-white p-8 md:p-16 selection:bg-brand-primary/30">
      {/* Header */}
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Shield className="text-white w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-white">Cognitix AI</h1>
            <p className="text-xs text-gray-500">Security Operations Control Plane</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-[10px] font-bold text-brand-primary">
            {user?.name.split(" ").map(n => n[0]).join("")}
          </div>
          <span className="text-sm font-medium text-gray-300">{user?.name}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-2 text-white">Select Workspace</h2>
          <p className="text-gray-400">Choose a workspace to access SOC AI agents and incident management for that tenant.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {workspaces.map((workspace, index) => (
            <motion.div
              key={workspace.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => selectWorkspace(workspace)}
              className="group card-glass p-8 cursor-pointer hover:border-brand-primary/40 transition-all flex flex-col min-h-[320px]"
            >
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-8 group-hover:border-brand-primary/40 transition-all">
                <Shield className="text-brand-primary w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold mb-2 group-hover:text-brand-primary transition-colors">
                {workspace.name}
              </h3>
              
              <div className="flex items-center gap-2 text-gray-500 mb-6">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{workspace.location}</span>
              </div>

              <div className="flex items-center gap-6 mb-8 py-4 border-y border-white/5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-bold">{workspace.activeIncidents} <span className="text-gray-500 font-normal ml-1">active</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-primary" />
                  <span className="text-sm font-bold">{workspace.agents} <span className="text-gray-500 font-normal ml-1">agents</span></span>
                </div>
              </div>

              <div className="mt-auto flex items-center gap-2 text-xs text-gray-500 italic">
                <Clock className="w-3 h-3" />
                Last activity: {workspace.lastActivity}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
