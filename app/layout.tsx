import { headers } from 'next/headers'; // Import headers
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { LanguageProvider } from "./context/LanguageContext";
import ClientLayout from "./components/ClientLayout";
import { Metadata } from 'next';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://thailotterychecktoday.com"),
  title: "Thai Lottery Results 2025 - Latest Draw | Official Results",
  description: "Check the latest Thai Lottery results. Valid, safe, and fast server-side checking. Historical data, statistics, and number frequency analysis.",
  keywords: "thai lottery, lottery results, thai lottery results, check lottery number, lottery history",
  authors: [{ name: "Thai Lottery Results" }],
  openGraph: {
    title: "Thai Lottery Results 2025 - Latest Draw",
    description: "Check the latest Thai Lottery results. Historical data, statistics, and number checking tools.",
    type: "website",
    locale: "en_US",
    alternateLocale: "th_TH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thai Lottery Results 2025",
    description: "Latest Thai Lottery results and checking tools",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com',
    languages: {
      'th': 'https://thailotterychecktoday.com/th',
      'en': 'https://thailotterychecktoday.com',
    }
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Read language from headers (set by middleware)
  const headersList = await headers();
  const lang = headersList.get('x-next-locale') || 'en';

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <JsonLd />
        <LanguageProvider initialLang={lang}>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>
        {/* Rebuild Trigger */}
      </body>
    </html>
  );
}
