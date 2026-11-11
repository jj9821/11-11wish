import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { loveConfig } from "@/config/love-config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: loveConfig.meta.siteTitle,
  description: loveConfig.meta.siteDescription,
  authors: [{ name: loveConfig.names.myName }],
  keywords: [
    "11:11",
    "romantic experience",
    "you are my wish",
    "interactive letter",
    "anniversary",
    "love story",
  ],
  openGraph: {
    title: loveConfig.meta.siteTitle,
    description: loveConfig.meta.siteDescription,
    type: "website",
    locale: "en_US",
    siteName: "11:11 | You Are My Wish",
  },
  twitter: {
    card: "summary_large_image",
    title: loveConfig.meta.siteTitle,
    description: loveConfig.meta.siteDescription,
  },
};

export const viewport: Viewport = {
  themeColor: "#05050B",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} dark scroll-smooth`}
    >
      <body className="bg-[#05050B] text-[#FFF9F2] min-h-screen selection:bg-[#211333] selection:text-[#EBD5A5] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
