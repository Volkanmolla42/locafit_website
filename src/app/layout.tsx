import { Inter, Playfair_Display } from "next/font/google";
import FloatingSupport from "@/components/common/FloatingSupport";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { ThemeProvider } from "next-themes";
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
        className={`${inter.variable} ${playfair.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
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
      </body>
    </html>
  );
}
