import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description: "Explore our portfolio of deployed projects and source code. From enterprise web applications to custom software solutions. View live deployments and unlock access to GitHub repositories with detailed implementations.",
  keywords: "projects, portfolio, web development, software projects, deployed applications, GitHub repositories, source code, custom software",
  openGraph: {
    title: "Projects & Portfolio - Arwindpianist Multimedia & Consulting",
    description: "Explore our portfolio of deployed projects and software solutions. Live websites and source code implementations.",
    url: "https://www.arwindpianist.com/projects",
    type: "website",
    images: [
      {
        url: "/images/og.png",
        width: 1200,
        height: 630,
        alt: "Projects Portfolio - Arwindpianist Multimedia & Consulting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Portfolio",
    description: "Explore our portfolio of deployed projects and software solutions.",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
