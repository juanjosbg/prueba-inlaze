import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    nextScriptWorkers: true,
  },
  images: {
    domains: ["image.tmdb.org", "via.placeholder.com"],
  },
};

export default nextConfig;
