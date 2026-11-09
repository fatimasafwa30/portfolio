import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-anton",
});

const geistSans = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const caveatBrush = Caveat_Brush({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-caveat-brush",
});

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  title: "Fatima Safwa | Developer Portfolio",
  description: "Personal developer portfolio of Fatima Safwa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark scroll-smooth scroll-pt-20 ${geistSans.variable} ${geistMono.variable} ${anton.variable} ${caveatBrush.variable}`}
    >
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
