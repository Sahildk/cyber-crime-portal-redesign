import type { Metadata } from "next";
import "./globals.css";
import "./site.css";
import "./report.css";
import "./motion.css";
import "./landing-refinements.css";
import "./guided.css";

export const metadata: Metadata = {
  title: "SafeNet India — Redesigned Cyber Crime Reporting Portal Entry Point",
  description: "A simpler citizen entry point for cybercrime reporting. Explain what happened without knowing categories, featuring a flagship financial fraud reporting demo."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
