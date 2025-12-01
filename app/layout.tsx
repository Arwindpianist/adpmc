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
  title: "Arwindpianist Multimedia & Consulting - MSP & IT Solutions",
  description: "Managed Service Provider offering IT hardware sales (new & refurbished), software solutions, music production solutions, and IT/Construction consulting. Authorized partners with Extreme Networks, Aruba, Huawei, and IBM.",
  keywords: "MSP, managed services, IT hardware, network equipment, enterprise solutions, Extreme Networks, Aruba, Huawei, IBM, refurbished IT equipment, software solutions, music production, IT consulting, construction IT, myceliumlink",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arwindpianist.com",
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
      </head>
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

