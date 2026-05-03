import type { NextConfig } from "next";

function normalizeBasePath(value: string | undefined): string {
  if (!value) return "/files";
  if (value === "/") return "";

  const clean = value.replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "";
}

const nextConfig: NextConfig = {
  // This path is used by Nginx and can be changed per environment.
  // Example: NEXT_PUBLIC_BASE_PATH=/files
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
