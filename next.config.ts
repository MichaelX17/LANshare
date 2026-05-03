/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permitir servir archivos estáticos desde uploads en desarrollo (opcional)
  async headers() {
    return [
      {
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

module.exports = nextConfig;

module.exports = {
  allowedDevOrigins: ['192.168.0.101'],
}

