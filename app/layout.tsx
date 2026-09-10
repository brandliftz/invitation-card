import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata={title:"Rayyan & Mariam | Nikah Invitation",description:"A digital Nikah invitation"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}