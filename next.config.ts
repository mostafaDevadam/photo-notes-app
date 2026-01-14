import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '6000',  // Adjust if using a different port (e.g., 3001)
        pathname: '/upload/**',  // Allows images from any path on localhost
      },
    ],
  },
};

export default nextConfig;
