/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'sunrise-2025.com' },
      { protocol: 'https', hostname: 'gridhealth.arwindpianist.store' },
      { protocol: 'https', hostname: 'askitchen.arwindpianist.store' },
      { protocol: 'https', hostname: 'pogopass.arwindpianist.store' },
      { protocol: 'https', hostname: 'www.kmtcs.com.my' },
      { protocol: 'https', hostname: 'typescripttutor.arwindpianist.store' },
      { protocol: 'https', hostname: 'arwindpianist.com' },
      { protocol: 'https', hostname: 'www.arwindpianist.com' },
      { protocol: 'https', hostname: 'arwindpianist.store' },
      { protocol: 'https', hostname: 'www.arwindpianist.store' },
    ],
  },
};

export default nextConfig;
