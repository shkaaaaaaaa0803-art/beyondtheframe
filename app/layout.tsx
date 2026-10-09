import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import GrainOverlay from "@/components/ui/GrainOverlay";
import SmoothScrollProvider from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const displayFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pressure Points — Beyond the Frame",
  description: "A scroll-driven story about the pressure behind the picture-perfect student life.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
          <GrainOverlay />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}