"use client";

import React from "react";
import { useAuth, workspaces } from "@/context/AuthContext";
import { User, Mail, Shield, MapPin, CheckCircle2, LayoutGrid } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="p-8 space-y-8 max-w-[1200px] mx-auto">
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
        <p className="text-gray-400">View and manage your account details and access permissions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: User Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-glass p-8 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-3xl font-bold text-brand-primary mb-6 shadow-2xl shadow-brand-primary/10">
              {user?.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h2 className="text-xl font-bold text-white mb-1">{user?.name}</h2>
            <p className="text-sm text-brand-primary font-bold uppercase tracking-widest mb-6">{user?.role}</p>
            
            <div className="w-full space-y-4 pt-6 border-t border-white/5">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Shield className="w-4 h-4" />
                <span>Verified SSO Account</span>
              </div>
            </div>
          </div>

          <div className="card-glass p-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4 px-2">System Permissions</h3>
            <div className="space-y-3">
              {[
                "View Security Dashboard",
                "Execute Investigations",
                "Access Evidence Locker",
                "Approve Remediations",
                "View System Logs"
              ].map((perm, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-gray-300 px-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-success-alt" />
                  {perm}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Workspace Access */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card-glass p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <LayoutGrid className="w-6 h-6 text-brand-primary" />
                <h3 className="text-xl font-bold">Accessible Workspaces</h3>
              </div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{workspaces.length} Total</span>
            </div>

            <div className="grid gap-4">
              {workspaces.map((ws) => (
                <div key={ws.id} className="p-4 rounded-xl bg-white/[0.02] border border-border flex items-center justify-between hover:bg-white/[0.04] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                      <Shield className="text-brand-primary w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-200">{ws.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <MapPin className="w-3 h-3" />
                        {ws.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 pr-4">
                    <div className="text-right">
                      <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Access Level</p>
                      <p className="text-sm font-bold text-gray-300">Read/Write</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-glass p-8">
            <h3 className="text-xl font-bold mb-6">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-border">
                <div>
                  <p className="font-bold text-gray-200">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500 mt-1">Mandatory for your role (SOC Level 1 Analyst)</p>
                </div>
                <div className="px-3 py-1 rounded-full bg-brand-success/10 text-brand-success-alt text-[10px] font-bold uppercase border border-brand-success/20">
                  Active
                </div>
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-border">
                <div>
                  <p className="font-bold text-gray-200">Session Timeout</p>
                  <p className="text-xs text-gray-500 mt-1">Automatically log out after 4 hours of inactivity</p>
                </div>
                <button className="text-xs text-brand-primary hover:underline font-bold">Edit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
