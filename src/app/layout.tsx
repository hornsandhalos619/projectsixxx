import type { Metadata, Viewport } from "next";
import {
  Cinzel,
  Cinzel_Decorative,
  UnifrakturMaguntia,
  Cormorant_Garamond,
  JetBrains_Mono,
} from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-display",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-display-alt",
  display: "swap",
});

const unifraktur = UnifrakturMaguntia({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-gothic",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-body",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Project SiXXX — The Altar",
    template: "%s | Project SiXXX",
  },
  description: "Horns & Halos — Streetwear meets Dark Divinity. Enter the Cathedral.",
  metadataBase: new URL("https://projectsixxx.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://projectsixxx.com",
    siteName: "Project SiXXX",
    title: "Project SiXXX — The Altar",
    description: "Horns & Halos — Streetwear meets Dark Divinity. Enter the Cathedral.",
  },
};

export const viewport: Viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#0a0a0f" }],
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
    <html
      lang="en"
      className={`${cinzelDecorative.variable} ${cinzel.variable} ${unifraktur.variable} ${cormorant.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen bg-void-900 text-text-primary">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
