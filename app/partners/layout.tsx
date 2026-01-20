import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Partners & Clientele",
  description: "Our authorized technology partnerships and client ecosystem. Strategic partnerships with Extreme Networks, Aruba, Huawei, IBM, Xero, and leading MSP platforms. Explore our networking products, CCTV solutions, and creative technology stack.",
  keywords: "partners, authorized partners, technology partnerships, Extreme Networks, Aruba, Huawei, IBM, Xero, MSP platforms, networking equipment, CCTV systems, clientele",
  openGraph: {
    title: "Partners & Clientele - Arwindpianist Multimedia & Consulting",
    description: "Our authorized technology partnerships and strategic alliances with leading manufacturers and MSP platforms.",
    url: "https://www.arwindpianist.com/partners",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Partners & Clientele - Arwindpianist Multimedia & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Partners & Clientele",
    description: "Our authorized technology partnerships and strategic alliances.",
  },
};

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
