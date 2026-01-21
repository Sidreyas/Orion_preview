"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Shield, 
  Lock, 
  Info, 
  ChevronDown, 
  CheckCircle2,
  Cpu,
  Eye
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState("SOC Level 1 Analyst");

  const handleSSOLogin = (provider: string) => {
    // Simulating SSO login
    console.log(`Logging in with ${provider}...`);
    login(selectedRole);
  };

  return (
    <div className="flex h-screen bg-[#0a0f14] overflow-hidden font-sans selection:bg-brand-primary/30">
      {/* Left Side: Branding & Features */}
      <div className="hidden lg:flex flex-col w-1/2 p-16 relative overflow-hidden border-r border-white/10">
        {/* Background Network Effect Mockup */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <circle cx="100" cy="100" r="2" fill="white" />
            <circle cx="300" cy="400" r="2" fill="white" />
            <circle cx="700" cy="200" r="2" fill="white" />
            <circle cx="900" cy="800" r="2" fill="white" />
            <circle cx="500" cy="500" r="2" fill="white" />
            <line x1="100" y1="100" x2="300" y2="400" stroke="white" strokeWidth="0.5" />
            <line x1="300" y1="400" x2="500" y2="500" stroke="white" strokeWidth="0.5" />
            <line x1="500" y1="500" x2="700" y2="200" stroke="white" strokeWidth="0.5" />
            <line x1="700" y1="200" x2="900" y2="800" stroke="white" strokeWidth="0.5" />
          </svg>
        </div>

        <div className="flex items-center gap-2 mb-24 z-10">
          <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white">Cognitix AI</span>
        </div>

        <div className="flex-1 flex flex-col justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
              <Shield className="text-brand-primary w-8 h-8" />
            </div>
            <p className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-4">Enterprise SOC Platform</p>
            <h1 className="text-6xl font-bold tracking-tight mb-4">
              <span className="text-white">SOC AI Agent</span><br />
              <span className="text-brand-primary">Cognitix AI</span>
            </h1>
            <p className="text-2xl text-gray-300 font-medium mb-12">
              Autonomous investigations with human-in-the-loop governance
            </p>
            <p className="text-gray-400 max-w-lg leading-relaxed mb-12">
              Secureplex SOC AI Agent assists security operations teams by autonomously investigating alerts from Microsoft Sentinel, enriching them with evidence, and presenting explainable conclusions for human review and approval.
            </p>

            <div className="space-y-6">
              {[
                { icon: Cpu, text: "AI-powered alert triage and investigation" },
                { icon: Eye, text: "Full transparency and explainable decisions" },
                { icon: CheckCircle2, text: "Human approval for all critical actions" },
              ].map((feature, i) => (
                <div key={i} className="flex items-center gap-4 text-gray-200 font-medium">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center">
                    <feature.icon className="text-brand-primary w-5 h-5" />
                  </div>
                  {feature.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="mt-auto text-sm text-gray-500 z-10">
          © Secureplex SOC AI Platform
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-[#0B0F19]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <div className="card-glass p-12 bg-white/[0.02] border-white/[0.05] shadow-2xl relative">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-brand-primary/5 rounded-3xl blur-2xl -z-10" />
            
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-14 h-14 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center mb-6">
                <Lock className="text-brand-primary w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Sign in to Secureplex</h2>
              <p className="text-gray-400">Access your SOC AI investigation workspace</p>
            </div>

            <div className="space-y-4 mb-8">
              <button 
                onClick={() => handleSSOLogin("Microsoft")}
                className="w-full flex items-center justify-center gap-3 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-all p-4 rounded-xl font-semibold"
              >
                <img src="https://simpleicons.org/icons/microsoft.svg" className="w-5 h-5 filter invert" alt="MS" />
                Sign in with Microsoft Entra ID
              </button>
              <button 
                onClick={() => handleSSOLogin("Okta")}
                className="w-full flex items-center justify-center gap-3 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-all p-4 rounded-xl font-semibold"
              >
                <img src="https://simpleicons.org/icons/okta.svg" className="w-5 h-5 filter invert" alt="Okta" />
                Sign in with Okta
              </button>
              <button 
                onClick={() => handleSSOLogin("Ping")}
                className="w-full flex items-center justify-center gap-3 bg-white/[0.05] border border-white/[0.1] hover:bg-white/[0.08] transition-all p-4 rounded-xl font-semibold"
              >
                <img src="https://simpleicons.org/icons/pingidentity.svg" className="w-5 h-5 filter invert" alt="Ping" />
                Sign in with Ping Identity
              </button>
            </div>

            <div className="p-4 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex gap-4 mb-8">
              <Info className="text-brand-primary w-5 h-5 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-400 leading-relaxed">
                Single Sign-On is used to enforce enterprise security and role-based access.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3" />
                Preview Role
              </label>
              <div className="relative">
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full bg-white/[0.05] border border-white/[0.1] rounded-xl px-4 py-3 outline-none focus:border-brand-primary/50 transition-all appearance-none text-gray-200 font-medium"
                >
                  <option>SOC Level 1 Analyst</option>
                  <option>SOC Manager</option>
                  <option>Incident Responder</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
              <p className="text-xs text-gray-500">
                Role-based access controls available features and actions across the platform.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-xs text-gray-500 text-center leading-relaxed italic">
              This platform provides visibility and governance over AI-driven SOC investigations. All actions are auditable and require human oversight.
            </div>
          </div>
        </motion.div>
      </div>

      <div className="fixed bottom-4 right-8 text-[10px] text-gray-600 flex items-center gap-4">
        <span>Built for enterprise</span>
        <div className="flex items-center gap-1 opacity-50">
          <span>Edit with</span>
          <span className="font-bold">Lovable</span>
        </div>
      </div>
    </div>
  );
}
