import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import MaintenanceMode from "@/components/maintenance/MaintenanceMode";

const MAINTENANCE_MODE = true;
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap', // Optimize font loading
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: 'swap', // Optimize font loading
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Early maintenance mode check to prevent loading unnecessary resources
  if (MAINTENANCE_MODE) {
    return (
      <html lang="tr" suppressHydrationWarning>
        <body className={`${inter.variable} ${playfair.variable} min-h-screen`}>
          <MaintenanceMode />
        </body>
      </html>
    );
  }

  // Lazy load components only when not in maintenance mode
  const Navbar = require("@/components/layout/Navbar").default;
  const Footer = require("@/components/layout/Footer").default;
  const Loading = require("./loading").default;
  const { ThemeProvider } = require("@/components/theme-provider");
  const { NavigationEvents } = require("@/components/common/NavigationEvents");
  const { Analytics } = require("@vercel/analytics/react");
  const FloatingSupport = require("@/components/common/FloatingSupport").default;
  const { Suspense } = require("react");

  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <NavigationEvents />
          <main className="pt-16 min-h-screen">
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </main>
          <Footer />
          <div className="fixed bottom-4 right-4 z-50"></div>
        </ThemeProvider>
        <FloatingSupport />
        <Analytics />
      </body>
    </html>
  );
}
