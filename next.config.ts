import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Eliminamos el basePath para que la app funcione en la raíz del puerto 3001
  basePath: "",

  // 2. Mantenemos las Server Actions habilitadas para tu IP
  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ["192.168.0.102:3001", "localhost:3001"],
  //   },
  // },

  // 3. Permitimos conexiones desde cualquier dispositivo de tu red
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "192.168.0.102",
    "192.168.*.*",
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
