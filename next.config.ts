import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
    // Las portadas ya vienen a un tamaño razonable desde Supabase Storage
    // y el plan gratuito de Vercel limita las transformaciones de imagen
    // (con 45+ discos se agota rápido y las imágenes dejan de cargar con
    // un 402). Servirlas tal cual evita depender de esa cuota.
    unoptimized: true,
  },
};

export default nextConfig;
