import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/auth/:path*", destination: "/", permanent: false },
      { source: "/dashboard", destination: "/", permanent: false },
      { source: "/leaderboard", destination: "/", permanent: false },
      { source: "/profile", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
