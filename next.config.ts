import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.quickfloors.ca",
      },
      {
        protocol: "https",
        hostname: "quickfloors.ca",
      },
      {
        protocol: "https",
        hostname: "cdn.msisurfaces.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
