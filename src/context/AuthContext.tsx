"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  name: string;
  email: string;
  role: string;
}

interface Workspace {
  id: string;
  name: string;
  location: string;
  activeIncidents: number;
  agents: number;
  lastActivity: string;
}

interface AuthContextType {
  user: User | null;
  selectedWorkspace: Workspace | null;
  login: (role: string) => void;
  logout: () => void;
  selectWorkspace: (workspace: Workspace) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const workspaces: Workspace[] = [
  {
    id: "air-selangor",
    name: "Air Selangor",
    location: "Malaysia - Selangor",
    activeIncidents: 12,
    agents: 4,
    lastActivity: "2 minutes ago",
  },
  {
    id: "petronas",
    name: "Petronas",
    location: "Malaysia - Kuala Lumpur",
    activeIncidents: 28,
    agents: 6,
    lastActivity: "30 seconds ago",
  },
  {
    id: "prefchem",
    name: "PrefChem",
    location: "Malaysia - Terengganu",
    activeIncidents: 7,
    agents: 3,
    lastActivity: "5 minutes ago",
  },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedWorkspace = localStorage.getItem("workspace");
    
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    
    if (storedWorkspace) {
      try {
        setSelectedWorkspace(JSON.parse(storedWorkspace));
      } catch (e) {
        localStorage.removeItem("workspace");
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = (role: string) => {
    const newUser = {
      name: "Ahmad Ibrahim",
      email: "ahmad.ibrahim@secureplex.ai",
      role: role,
    };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    router.push("/workspaces");
  };

  const logout = () => {
    setUser(null);
    setSelectedWorkspace(null);
    localStorage.removeItem("user");
    localStorage.removeItem("workspace");
    router.push("/login");
  };

  const selectWorkspace = (workspace: Workspace) => {
    setSelectedWorkspace(workspace);
    localStorage.setItem("workspace", JSON.stringify(workspace));
    // Force a complete page refresh to reload data for the new workspace
    window.location.href = "/dashboard";
  };

  const isAuthenticated = !!user;

  // Protect routes
  useEffect(() => {
    if (isLoading) return;

    const isPublicRoute = pathname === "/login";
    const isWorkspacesRoute = pathname === "/workspaces";

    if (!user && !isPublicRoute) {
      router.push("/login");
    } else if (user && isPublicRoute) {
      router.push("/workspaces");
    } else if (user && !selectedWorkspace && !isWorkspacesRoute) {
      router.push("/workspaces");
    }
  }, [user, selectedWorkspace, pathname, router, isLoading]);

  return (
    <AuthContext.Provider value={{ user, selectedWorkspace, login, logout, selectWorkspace, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
