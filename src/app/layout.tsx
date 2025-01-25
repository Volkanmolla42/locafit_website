import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import { NavigationEvents } from "@/components/common/NavigationEvents";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <NavigationEvents />
          <main className="pt-16 min-h-screen">
            <Suspense fallback={<Loading />}>
              {children}
            </Suspense>
          </main>
          <Footer />
          <div className="fixed bottom-4 right-4 z-50">
            <ThemeToggle />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
