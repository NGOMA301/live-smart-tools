import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { generateSEO } from "@/components/seo";
import { generateHomeSEO } from "@/lib/seo-utils";
import { AdBlockDetector } from "@/components/adblock-detector";
import { getAdBlockSettings } from "@/lib/admin-actions";
import GoogleAnalytics from "./analytics";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const homeSEO = generateHomeSEO();
export const metadata: Metadata = generateSEO({
  title: homeSEO.title,
  description: homeSEO.description,
  keywords: homeSEO.keywords,
  canonical: homeSEO.canonical,
  ogImage: homeSEO.ogImage,
  structuredData: homeSEO.structuredData,
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adBlockSettings = await getAdBlockSettings();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      crosspilot=""
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homeSEO.structuredData),
          }}
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Script src="/ads.js" strategy="beforeInteractive" />
          <AdBlockDetector
            enabled={adBlockSettings.enabled}
            message={adBlockSettings.message}
          />
           <GoogleAnalytics />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
