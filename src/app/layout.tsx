import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masood Iqbal | Network & Fiber Operations Expert",
  description: "Professional portfolio of Masood Iqbal, an I.T Expert specializing in robust fiber networks and high-availability IT ecosystems across Pakistan.",
  keywords: ["Network Engineer", "Fiber Optics", "IT Support", "Lahore", "Connectivity Solutions", "Cybernet", "Infrastructure Expert"],
  authors: [{ name: "Masood Iqbal" }],
  viewport: "width=device-width, initial-scale=1",
};

import { ThemeProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
