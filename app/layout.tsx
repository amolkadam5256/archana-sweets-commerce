import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  // ... preserving metadata
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://archanasweets.com"),
  title: {
    default: "Archana Sweets - Made With Mother's Love | Pune's Premium Homemade Indian Sweets",
    template: "%s | Archana Sweets",
  },
  description:
    "Authentic homemade Indian sweets & laddus crafted with love in Pune. Besan Laddu, Dry Fruit Laddu, Modak, Barfi, and exclusive Festival Gift Boxes. Order online with fresh home delivery.",
  keywords: [
    "homemade Indian sweets Pune",
    "Archana Sweets",
    "Besan Laddu",
    "Dry Fruit Laddu",
    "Modak",
    "Barfi",
    "festival gift boxes",
    "corporate gift hampers",
    "Indian sweets online",
    "made with mother's love",
  ],
  authors: [{ name: "Archana Sweets", url: "https://archanasweets.com" }],
  creator: "Archana Sweets",
  publisher: "Archana Sweets",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://archanasweets.com",
    siteName: "Archana Sweets",
    title: "Archana Sweets - Made With Mother's Love",
    description: "Premium homemade Indian sweets & laddus from Pune. Fresh, authentic, crafted with love.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Archana Sweets - Made With Mother's Love",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Archana Sweets - Made With Mother's Love",
    description: "Premium homemade Indian sweets & laddus from Pune.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large" },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#8B1E3F",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="light">
      <body className="min-h-screen antialiased" suppressHydrationWarning>
        {/* Anti-FOUC: Inline script runs synchronously before first paint */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('archana-theme');var t=s==='dark'||s==='light'?s:(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

