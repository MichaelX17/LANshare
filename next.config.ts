/** @type {import('next').NextConfig} */
const nextConfig = {
  // 💡 ESTA ES LA CLAVE: Indica a Next.js que la app vive en /archivos
  basePath: '/archivos',

  // Permite orígenes de desarrollo habituales en redes locales (solo aplica en dev).
  allowedDevOrigins: ['localhost', '*.localhost', '192.168.*.*', '10.*.*.*', '172.*.*.*'],

  // Permitir servir archivos estáticos desde uploads en desarrollo (opcional)
  async headers() {
    return [
      {
        // ⚠️ Nota: Al añadir basePath, Next.js buscará automáticamente en /archivos/uploads/
        source: "/uploads/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

module.exports = nextConfig;
