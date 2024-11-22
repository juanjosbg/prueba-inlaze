import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactRoot: true,
    nextScriptWorkers: true,
    turbopack: false,
  },
  images: {
    domains: ["image.tmdb.org"],
  },
};

export default nextConfig;


