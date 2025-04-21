import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites(){
    return [{source:"/api/:path*", destination:"http://localhost:5192/api/:path*"}];
  },
  images: {
    domains: ['eng-test-files.object.pscloud.io','images.unsplash.com'],
  },
};

export default nextConfig;
