import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'object.pscloud.io'],
  },
};

export default nextConfig;
