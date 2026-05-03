import type { NextConfig } from "next";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "";
  if (value === "/") return "";

  const clean = value.replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "";
}

const nextConfig: NextConfig = {
  // Optional basePath for reverse-proxy subpaths (example: /files).
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),

  // Better packaging for PM2/self-hosted deployments.
  output: "standalone",

  // Allows common LAN origins in development mode only.
  allowedDevOrigins: [
    "localhost",
    "*.localhost",
    "127.0.0.1",
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
  ],

  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
