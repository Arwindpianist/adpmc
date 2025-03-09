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
      <body className={poppins.className}>{children}</body>
    </html>
  )
}

