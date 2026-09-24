/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* AVIF en premier : ~30 % plus léger que le WebP à qualité équivalente.
       Next retombe automatiquement sur WebP pour les navigateurs qui ne le
       gèrent pas. Les pages services affichent jusqu'à 12 photos, le gain est
       significatif. */
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
