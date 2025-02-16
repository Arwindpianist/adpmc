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
  title: "Arwindpianist Multimedia & Consulting",
  description: "Your one-stop solution for multimedia production and IT consulting services.",
  keywords: "multimedia, consulting, music production, web development, mobile apps, desktop software",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arwindpianist.com",
    site_name: "Arwindpianist Multimedia & Consulting",
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
    handle: "@arwindpianist",
    site: "@arwindpianist",
    cardType: "summary_large_image",
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

