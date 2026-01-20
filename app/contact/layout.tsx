import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Arwindpianist Multimedia & Consulting. Request a quote, ask questions, or discuss your IT needs. We're here to help with MSP services, hardware sales, software solutions, and consulting.",
  keywords: "contact, get in touch, request quote, IT consultation, MSP contact, enterprise IT support, quote request",
  openGraph: {
    title: "Contact Us - Arwindpianist Multimedia & Consulting",
    description: "Get in touch to discuss your IT needs. Request a quote for MSP services, hardware, software, or consulting.",
    url: "https://www.arwindpianist.com/contact",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Contact Us - Arwindpianist Multimedia & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us",
    description: "Get in touch to discuss your IT needs and request a quote.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
