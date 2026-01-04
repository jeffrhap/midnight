import type { Metadata, Viewport } from "next";
import { Inter, Space_Mono } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";
import { SubscriptionProvider } from "@/contexts/SubscriptionContext";
import { LocalizationProvider } from "@/contexts/LocalizationContext";

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

// Force dynamic rendering to ensure nonces work properly with CSP
// Static pages cannot access request-time nonces
export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get nonce from headers for inline scripts
  const headersList = await headers();
  const nonce = headersList.get("x-nonce");

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LocalizationProvider>
          <SubscriptionProvider>
            {children}
          </SubscriptionProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
