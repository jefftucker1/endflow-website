import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/cta-banner";
import { TrackingScripts } from "@/components/tracking-scripts";
import { ConsentBanner } from "@/components/consent-banner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Endflow - Map Your TAM in a Prompt",
  description: "AI-powered GTM data feeds for jobs, companies, and people. Map your TAM in a prompt and get perfect matches with real-time verification.",
  keywords: "GTM data, jobs data, AI search, sales intelligence, lead generation",
  authors: [{ name: "Endflow" }],
  creator: "Endflow",
  publisher: "Endflow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://endflow.ai"),
  icons: {
    icon: [
      {
        url: "/images/favicon.svg",
        type: "image/svg+xml",
      },
      {
        url: "/images/endflow_icon.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/images/endflow_icon_white.svg", 
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    shortcut: "/images/favicon.svg",
    apple: "/images/endflow_icon.svg",
  },
  openGraph: {
    title: "Endflow - Map Your TAM in a Prompt",
    description: "AI-powered GTM data feeds for jobs, companies, and people. Get perfect job matches with AI-powered search.",
    url: "https://endflow.ai",
    siteName: "Endflow",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Endflow - Map Your TAM in a Prompt",
    description: "AI-powered GTM data feeds for jobs, companies, and people. Get perfect job matches with AI-powered search.",
    creator: "@endflow",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <TrackingScripts />
        <CTABanner />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <ConsentBanner />
        
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PTFRDGS3"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
      </body>
    </html>
  );
}
