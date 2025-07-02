import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Loading from "./loading";
import { ThemeProvider } from "@/components/theme-provider";
import { NavigationEvents } from "@/components/common/NavigationEvents";
import FloatingSupport from "@/components/common/FloatingSupport";
import MaintenanceMode from "@/components/maintenance/MaintenanceMode";

import "./globals.css";

const MAINTENANCE_MODE = false;

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap' 
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap'
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (MAINTENANCE_MODE) {
    return (
      <html lang="tr" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable}`}>
          <MaintenanceMode />
        </body>
      </html>
    );
  }

  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <NavigationEvents />
          <main className="pt-16 min-h-screen">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
          <Footer />
          <FloatingSupport />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
