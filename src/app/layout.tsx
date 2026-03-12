import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masood Iqbal | Network & Fiber Operations Expert",
  description: "Portfolio of Masood Iqbal, a Network and Fiber Operations Professional specializing in connectivity, restoration, and troubleshooting.",
  keywords: ["Network Engineer", "Fiber Optics", "IT Support", "Lahore", "Connectivity Solutions", "Cybernet"],
};

import { ThemeProvider } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
