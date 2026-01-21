"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/layout/Header";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

function AppContent({ children }: { children: React.ReactNode }) {
  const { user, selectedWorkspace, isLoading } = useAuth();
  const pathname = usePathname();

  const isLoginPage = pathname === "/login";
  const isWorkspacesPage = pathname === "/workspaces";
  
  if (isLoading) {
    return (
      <div className="h-screen w-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
      </div>
    );
  }

  // Only show sidebar/header if logged in AND workspace selected
  const showChrome = user && selectedWorkspace && !isLoginPage && !isWorkspacesPage;

  if (isLoginPage || isWorkspacesPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {showChrome && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {showChrome && <Header />}
        <main className="flex-1 overflow-y-auto bg-background custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Secureplex | AI SOC Analyst</title>
        <meta name="description" content="Next-generation AI SOC analyst platform" />
      </head>
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        <AuthProvider>
          <AppContent>{children}</AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}
