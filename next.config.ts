import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['eng-test-files.object.pscloud.io','images.unsplash.com'],
  },
};

export default nextConfig;
