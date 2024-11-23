import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactRoot: true,
    nextScriptWorkers: true,
    turbopack: false,
  },
  images: {
    domains: ["image.tmdb.org", "via.placeholder.com"],
  },
};

export default nextConfig;


