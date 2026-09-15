import type { NextConfig } from "next";
import path from "path";

const API_ORIGIN = process.env.API_ORIGIN || "http://localhost:4000";

const nextConfig: NextConfig = {
  // Keep build cache off the slow F: path if possible is not trivial;
  // at least stop watching local CRM data files.
  webpack: (config) => {
    config.watchOptions = {
      ...(config.watchOptions || {}),
      ignored: [
        "**/node_modules/**",
        "**/.git/**",
        "**/data/**",
        "**/.next/**",
      ],
    };
    return config;
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async rewrites() {
    return [
      { source: "/api/agents", destination: `${API_ORIGIN}/api/agents` },
      {
        source: "/api/agents/:path*",
        destination: `${API_ORIGIN}/api/agents/:path*`,
      },
      { source: "/api/health", destination: `${API_ORIGIN}/api/health` },
    ];
  },
};

export default nextConfig;
