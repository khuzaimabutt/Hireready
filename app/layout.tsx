import "./globals.css";
import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import { Toaster } from "sonner";

const display = Manrope({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
  display: "swap",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ResumeAI Pro: Build a Resume That Gets You Hired",
  description:
    "AI-powered resume builder tailored to fresher, intermediate, or professional candidates. ATS-optimized, PDF export, instant cover letters.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  openGraph: {
    title: "ResumeAI Pro",
    description: "AI-powered resume builder. ATS-friendly resumes tailored to your career stage.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeAI Pro",
    description: "AI-powered resume builder. ATS-optimized.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        {children}
        <Toaster position="top-right" theme="light" richColors closeButton />
      </body>
    </html>
  );
}
