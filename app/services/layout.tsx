import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Our Services",
  description: "Comprehensive IT services including Managed IT Services (MSP), IT hardware sales (new & refurbished), software solutions, music production solutions, and IT/Construction consulting. Full-stack MSP and systems integration services.",
  keywords: "MSP services, managed IT services, IT hardware sales, refurbished equipment, software solutions, music production, IT consulting, construction IT, systems integration, enterprise solutions",
  openGraph: {
    title: "Our Services - Arwindpianist Multimedia & Consulting",
    description: "Comprehensive IT services: MSP, hardware sales, software solutions, and consulting. Full-stack managed service provider.",
    url: "https://www.arwindpianist.com/services",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Our Services - Arwindpianist Multimedia & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services",
    description: "Comprehensive IT services: MSP, hardware sales, software solutions, and consulting.",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
