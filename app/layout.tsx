import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Arwindpianist Multimedia & Consulting",
  description: "Professional multimedia services and consulting",
  keywords: "multimedia, consulting, music production, web development, mobile apps, desktop software",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arwindpianist.store",
    siteName: "Arwindpianist Multimedia & Consulting",
    images: [
      {
        url: "/og-image.jpg",
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
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-4FLE1RWKVX"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4FLE1RWKVX');
            `,
          }}
        />
        {/* Zoho SalesIQ Live Chat */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.$zoho=window.$zoho || {};$zoho.salesiq=$zoho.salesiq||{ready:function(){}}`,
          }}
        />
        <script id="zsiqscript" src="https://salesiq.zohopublic.com/widget?wc=siq632e43d1367354f184fe2c85c108331e7581c3e9732136b97589a6f8eed110545f834f7087883f72a11fc35c9dc49043" defer></script>
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

