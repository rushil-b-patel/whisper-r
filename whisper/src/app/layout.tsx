import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import TrendingSidebar from "@/components/TrendingSidebar";
import { SearchIcon, LogoIcon, GridIcon, ListIcon, TrendingIcon, ControversialIcon, TopIcon } from "@/components/Icons";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthHeader from "@/components/AuthHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campus Whisper - Anonymous Student Forum",
  description: "Share your thoughts anonymously with your campus community",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100 dark:bg-gray-900`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <AuthHeader />
            
            <main className="flex-grow container mx-auto px-6 py-4 flex overflow-hidden">
              <aside className="hidden md:block w-56 pr-6 sticky top-[76px] border-r border-gray-200 dark:border-gray-800 h-[calc(100vh-76px)] overflow-y-auto">
                <Sidebar />
              </aside>
              
              <div className="flex-1 min-w-0 px-0 md:px-6 h-[calc(100vh-76px)] overflow-y-auto">
                {children}
              </div>
              
              <aside className="hidden lg:block w-80 pl-6 sticky top-[76px] border-l border-gray-200 dark:border-gray-800 h-[calc(100vh-76px)] overflow-y-auto">
                <TrendingSidebar />
              </aside>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
