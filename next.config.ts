import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api-proxy/:path*",
        destination: `${process.env.NEXT_PUBLIC_URL_SERVER}/:path*`,
      },
    ];
  },
};

export default nextConfig;
