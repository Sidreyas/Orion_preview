import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Orion | AI SOC Analyst",
  description: "Next-generation AI SOC analyst platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground overflow-hidden h-screen flex`}>
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-[#0B0F19]">
          {children}
        </main>
      </body>
    </html>
  );
}
