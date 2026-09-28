/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /* AVIF en premier : ~30 % plus léger que le WebP à qualité équivalente.
       Next retombe automatiquement sur WebP pour les navigateurs qui ne le
       gèrent pas. Les pages services affichent jusqu'à 12 photos, le gain est
       significatif. */
    formats: ["image/avif", "image/webp"],

    /* Aucune image du site ne s'affiche au-delà de 1920 px : les heros font
       100vw, tout le reste est plus étroit. Les tailles 2048 et 3840 par
       défaut ne seraient jamais servies — les retirer évite d'encombrer le
       cache de l'optimiseur avec des variantes mortes. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],

    /* Les vignettes les plus petites du site sont les logos, autour de 60 px
       d'affichage. En dessous de 64 px, plus rien n'est utilisé. */
    imageSizes: [64, 96, 128, 256, 384],

    /* Par défaut Next ne garde une variante optimisée que 60 secondes. Nos
       photos ne changent qu'au déploiement : une journée de fraîcheur évite
       de régénérer l'AVIF à chaque visite. */
    minimumCacheTTL: 86400,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        /* Sans cette règle, les photos partent en `max-age=0,
           must-revalidate` : chaque page vue revalide les images une par une,
           soit un aller-retour réseau par image. C'est ce qui coûte le plus
           cher sur les connexions lentes.

           `stale-while-revalidate` laisse le navigateur afficher l'image en
           cache immédiatement tout en la rafraîchissant en arrière-plan : on
           garde la vitesse sans figer un visuel pendant un mois si on le
           remplace. */
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=2592000",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
