import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

// Local font definitions (subsetted WOFF2 files in public/fonts/)
// Using available fonts: CinzelDecorative (Bold, Regular)
const gothicOrnate = localFont({
  src: [
    { path: "../../public/fonts/CinzelDecorative-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/CinzelDecorative-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const gothicSharp = localFont({
  src: [
    { path: "../../public/fonts/CinzelDecorative-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/CinzelDecorative-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-display-alt",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

// Fallback to system fonts for missing font files - will be replaced when .woff2 files are available
const nocturneSerif = localFont({
  src: [
    { path: "../../public/fonts/CinzelDecorative-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/CinzelDecorative-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const nocturneSans = localFont({
  src: [
    { path: "../../public/fonts/CinzelDecorative-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/CinzelDecorative-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-ui",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetbrainsMono = localFont({
  src: [
    { path: "../../public/fonts/CinzelDecorative-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-mono",
  display: "swap",
  fallback: ["monospace"],
});

export const metadata: Metadata = {
  title: {
    default: "Projectsixxx — The Altar",
    template: "%s | Projectsixxx",
  },
  description: "Horns & Halos — Streetwear meets Dark Divinity. Enter the Cathedral.",
  keywords: ["streetwear", "dark fashion", "gothic luxury", "services", "gallery", "journal", "formation", "web development", "digital production", "art commissions"],
  authors: [{ name: "Projectsixxx" }],
  creator: "Projectsixxx",
  publisher: "Projectsixxx",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://projectsixxx.com"),
  alternates: {
    canonical: "https://projectsixxx.com",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://projectsixxx.com",
    siteName: "Projectsixxx",
    title: "Projectsixxx — The Altar",
    description: "Horns & Halos — Streetwear meets Dark Divinity. Enter the Cathedral.",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Projectsixxx — The Altar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projectsixxx — The Altar",
    description: "Horns & Halos — Streetwear meets Dark Divinity. Enter the Cathedral.",
    images: ["/og-default.jpg"],
    creator: "@projectsixxx",
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
  verification: {
    google: "google-site-verification-code",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0f" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${gothicOrnate.variable} ${gothicSharp.variable} ${nocturneSerif.variable} ${nocturneSans.variable} ${jetbrainsMono.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://projectsixxx.com" />
        <link rel="dns-prefetch" href="https://projectsixxx.com" />
        <link rel="preconnect" href="https://cdn.sanity.io" />
        <link rel="dns-prefetch" href="https://cdn.sanity.io" />
        <link rel="preconnect" href="https://api.vercel.com" />
        <link rel="dns-prefetch" href="https://api.vercel.com" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0f" media="(prefers-color-scheme: dark)" />
      </head>
      <body className="min-h-screen bg-void-900 text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}