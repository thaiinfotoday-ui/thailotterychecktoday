import { headers } from 'next/headers';
import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "./components/JsonLd";
import { LanguageProvider } from "./context/LanguageContext";
import ClientLayout from "./components/ClientLayout";
import { Metadata } from 'next';
import { ReactNode } from 'react';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

// Dynamic metadata based on language
export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers();
  const lang = headersList.get('x-next-locale') || 'th';
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://thailotterychecktoday.com';

  if (lang === 'th') {
    return {
      metadataBase: new URL(baseUrl),
      title: "ตรวจหวย - ตรวจสลากกินแบ่งรัฐบาล ผลหวยงวดล่าสุด 2568 | Thai Lottery Results",
      description: "ตรวจหวย ตรวจสลากกินแบ่งรัฐบาล ผลสลากกินแบ่งรัฐบาลงวดล่าสุด ตรวจหวยย้อนหลัง สถิติหวย Check Thai Lottery results, historical data, and statistics. Fast and accurate lottery checking.",
      keywords: "ตรวจหวย, สลากกินแบ่งรัฐบาล, ตรวจสลากกินแบ่งรัฐบาล, หวย, ผลสลากกินแบ่งรัฐบาล, ตรวจหวยย้อนหลัง, สถิติหวย, หวยไทย, thai lottery, lottery results, check lottery, หวยออก, หวยวันนี้, ตรวจหวยวันนี้",
      authors: [{ name: "Thai Lottery Check Today" }],
      openGraph: {
        title: "ตรวจหวย - ตรวจสลากกินแบ่งรัฐบาล ผลหวยงวดล่าสุด 2568",
        description: "ตรวจหวย ตรวจสลากกินแบ่งรัฐบาล ผลสลากกินแบ่งรัฐบาลงวดล่าสุด ตรวจหวยย้อนหลัง สถิติหวย และข้อมูลหวยไทยครบถ้วน",
        type: "website",
        locale: "th_TH",
        alternateLocale: ["en_US"],
        siteName: "Thai Lottery Check Today",
      },
      twitter: {
        card: "summary_large_image",
        title: "ตรวจหวย - ผลสลากกินแบ่งรัฐบาล งวดล่าสุด",
        description: "ตรวจหวย ตรวจสลากกินแบ่งรัฐบาล ผลหวยงวดล่าสุด ตรวจหวยย้อนหลัง สถิติหวย",
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
        canonical: baseUrl,
        languages: {
          'th': `${baseUrl}/th`,
          'en': `${baseUrl}/en`,
          'x-default': baseUrl,
        }
      },
    };
  } else {
    // English metadata
    return {
      metadataBase: new URL(baseUrl),
      title: "Thai Lottery Results 2025 - Latest Draw | Check Lottery Numbers",
      description: "Check the latest Thai Lottery results. Fast, accurate, and reliable lottery checking service with historical data, statistics, and number frequency analysis.",
      keywords: "thai lottery, lottery results, thai lottery results, check lottery number, lottery history, thailand lottery, lottery check, lottery statistics",
      authors: [{ name: "Thai Lottery Check Today" }],
      openGraph: {
        title: "Thai Lottery Results 2025 - Latest Draw",
        description: "Check the latest Thai Lottery results. Historical data, statistics, and number checking tools.",
        type: "website",
        locale: "en_US",
        alternateLocale: ["th_TH"],
        siteName: "Thai Lottery Check Today",
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
        canonical: `${baseUrl}/en`,
        languages: {
          'th': `${baseUrl}/th`,
          'en': `${baseUrl}/en`,
          'x-default': baseUrl,
        }
      },
    };
  }
}



export default async function RootLayout({ children }: { children: ReactNode }) {
  // Read language from headers (set by middleware)
  const headersList = await headers();
  const lang = headersList.get('x-next-locale') || 'en';

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`} suppressHydrationWarning>
        <JsonLd />
        <LanguageProvider initialLang={lang}>
          <ClientLayout>{children}</ClientLayout>
        </LanguageProvider>

        {/* Google Tag Manager (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C13PHM327C"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-C13PHM327C');
          `}
        </Script>
      </body>
    </html>
  );
}
