import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Us - Our Story & Values",
  description: "Learn about Arwindpianist Multimedia & Consulting. We're a full-stack MSP, systems integrator, and digital services provider with strategic authorized partnerships with leading technology manufacturers. Discover our values, expertise, and commitment to excellence.",
  keywords: "about us, company story, MSP values, IT expertise, authorized partnerships, technology consulting, enterprise solutions",
  openGraph: {
    title: "About Us - Arwindpianist Multimedia & Consulting",
    description: "Learn about our company, values, and strategic partnerships with leading technology manufacturers.",
    url: "https://www.arwindpianist.com/about",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "About Arwindpianist Multimedia & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us - Arwindpianist Multimedia & Consulting",
    description: "Learn about our company, values, and strategic partnerships.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
