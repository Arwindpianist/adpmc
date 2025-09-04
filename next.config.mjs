/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['puppeteer']
  },
  images: {
    domains: [
      'sunrise-2025.com',
      'gridhealth.arwindpianist.store',
      'askitchen.arwindpianist.store',
      'pogopass.arwindpianist.store',
      'www.kmtcs.com.my',
      'typescripttutor.arwindpianist.store'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
