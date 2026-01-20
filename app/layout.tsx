import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import Script from "next/script"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.arwindpianist.com"),
  title: {
    default: "Arwindpianist Multimedia & Consulting - MSP & IT Solutions",
    template: "%s | Arwindpianist Multimedia & Consulting",
  },
  description: "Managed Service Provider offering IT hardware sales (new & refurbished), software solutions, music production solutions, and IT/Construction consulting. Strategic authorized partnerships with leading technology manufacturers across enterprise networking, cloud platforms, and surveillance systems.",
  keywords: "MSP, managed services, IT hardware, network equipment, enterprise solutions, Extreme Networks, Aruba, Huawei, IBM, Xero, Zoho, Vercel, Supabase, Cisco, Juniper, Hikvision, refurbished IT equipment, software solutions, music production, IT consulting, construction IT, myceliumlink",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arwindpianist.com",
    siteName: "Arwindpianist Multimedia & Consulting",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Arwindpianist Multimedia & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@arwindpianist",
    site: "@arwindpianist",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head />
      <body className={poppins.className}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4FLE1RWKVX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4FLE1RWKVX');
          `}
        </Script>
        {children}
      </body>
    </html>
  )
}

