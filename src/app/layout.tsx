import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Free Pomodoro Timer Online - Boost Productivity & Focus",
    template: "%s | Pomodoro Timer",
  },
  description:
    "Free online Pomodoro timer with customizable intervals, ambient sounds, and progress tracking. Boost productivity using the proven Pomodoro Technique.",
  keywords: [
    "pomodoro timer",
    "free pomodoro timer",
    "online pomodoro timer",
    "productivity timer",
    "focus timer",
    "time management",
    "study timer",
    "work timer",
    "pomodoro technique",
    "25 minute timer",
    "break timer",
    "productivity",
    "focus",
  ],
  authors: [{ name: "Joseph Deakin" }],
  creator: "Joseph Deakin",
  metadataBase: new URL("https://deakinj.co.uk"),
  alternates: {
    canonical: "https://deakinj.co.uk",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://deakinj.co.uk",
    title: "Free Pomodoro Timer Online - Boost Productivity & Focus",
    description:
      "Free online Pomodoro timer with customizable intervals, ambient sounds, and progress tracking. Boost productivity using the proven Pomodoro Technique.",
    siteName: "Pomodoro Timer",
    images: [
      {
        url: "https://deakinj.co.uk/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Pomodoro Timer - Boost Your Productivity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Pomodoro Timer Online - Boost Productivity & Focus",
    description:
      "Free online Pomodoro timer with customizable intervals, ambient sounds, and progress tracking. Boost productivity using the proven Pomodoro Technique.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Pomodoro Timer" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
