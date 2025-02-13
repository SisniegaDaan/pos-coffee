import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  /* Con el siguiente código nos aseguramos que la aplicación admina
  imágenes que provengan de este dominio (cloudinary) para mostrarlas
  en las diferentes partes de la aplicación */
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'res.cloudinary.com'
    }]
  }
};

export default nextConfig;
