import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'assets.playbill.com',
          port: '',
          pathname: '/playbill-covers/**',
        },
      ],
    },
};

export default nextConfig;
