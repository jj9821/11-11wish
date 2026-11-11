import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { astronomyConfig } from "@/config/love-config";

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
  title: `11:11 | ${astronomyConfig.recipient.label} — The Celestial Observatory`,
  description:
    "An extraordinary astronomical journey through the universe at 11:11 PM. For Maria.",
  keywords: [
    "11:11",
    "astronomy",
    "celestial clock",
    "deep space",
    "constellation maria",
    "starlight wish",
    "astrolabe",
  ],
  openGraph: {
    title: `11:11 | ${astronomyConfig.recipient.label}`,
    description:
      "At 11:11, the universe listens. An astronomical journey through the stars for Maria.",
    type: "website",
    locale: "en_US",
    siteName: "11:11 Celestial Observatory",
  },
  twitter: {
    card: "summary_large_image",
    title: `11:11 | ${astronomyConfig.recipient.label}`,
    description:
      "At 11:11, the universe listens. An astronomical journey through the stars for Maria.",
  },
};

export const viewport: Viewport = {
  themeColor: "#03040A",
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
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable} dark`}
    >
      <body className="bg-[#03040A] text-[#E4E7F3] min-h-screen selection:bg-[#503B83] selection:text-[#F5D9A0] overflow-x-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
