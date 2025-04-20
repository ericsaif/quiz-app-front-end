import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites(){
    return [{source:"/api/:path*", destination:"http://localhost:5192/api/:path*"}];
  },
  experimental: {
    turbopack: false,
    // If you have other experimental flags, keep them, e.g.:
    // forceSwcTransforms: false, // Sometimes disabling SWC helps fall back
  },
  images: {
    domains: ['eng-test-files.object.pscloud.io','images.unsplash.com'],
  },
};

export default nextConfig;
