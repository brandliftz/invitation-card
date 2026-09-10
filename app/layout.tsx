import type { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";
export const metadata: Metadata = {
  title: "Rayyan & Mariam — Nikah",
  description: "Digital Nikah invitation for Rayyan & Mariam"
};
export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}<SpeedInsights /></body></html>;
}