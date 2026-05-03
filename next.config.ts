/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite orígenes de desarrollo habituales en redes locales (solo aplica en dev).
  allowedDevOrigins: ['localhost', '*.localhost', '192.168.*.*', '10.*.*.*', '172.*.*.*'],

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

