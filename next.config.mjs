/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'sunrise-2025.com',
      'gridhealth.arwindpianist.store',
      'askitchen.arwindpianist.store',
      'pogopass.arwindpianist.store',
      'www.kmtcs.com.my',
      'typescripttutor.arwindpianist.store',
      'arwindpianist.com',
      'www.arwindpianist.com',
      'arwindpianist.store',
      'www.arwindpianist.store'
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
