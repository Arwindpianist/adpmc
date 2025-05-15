import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.scdn.co"], // Allow Spotify's image domain
  },
  webpack: (config) => {
    config.plugins.push(new NodePolyfillPlugin());
    return config;
  },
};

export default nextConfig;
