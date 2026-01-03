import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MIDNIGHT — MODEL 00:00",
  description: "Time, Written in Light.",
  keywords: ["midnight", "clock", "word clock", "premium", "tech", "design"],
  authors: [{ name: "MIDNIGHT" }],
  creator: "MIDNIGHT",
  icons: {
    icon: "/app.png",
    apple: "/app.png",
  },
  openGraph: {
    title: "MIDNIGHT — MODEL 00:00",
    description: "Time, Written in Light.",
    type: "website",
    locale: "en_US",
    siteName: "MIDNIGHT",
  },
  twitter: {
    card: "summary_large_image",
    title: "MIDNIGHT — MODEL 00:00",
    description: "Time, Written in Light.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
