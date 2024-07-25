import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Open LLM 游乐场",
  description: "在 Open LLM 游乐场测试您的 LLM 提示词!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <body className={inter.className}>
        <Toaster />
        <TooltipProvider delayDuration={200}>{children}</TooltipProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
