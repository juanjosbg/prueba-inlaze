import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactRoot: true,
    nextScriptWorkers: true,
    turbopack: false,
  }
};

export default nextConfig;


