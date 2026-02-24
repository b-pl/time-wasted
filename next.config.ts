import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
      remotePatterns: [new URL('https://image.tmdb.org/t/p/w300_and_h450_face/**')]
  }
};

export default nextConfig;
