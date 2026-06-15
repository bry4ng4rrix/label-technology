import { MetadataRoute } from "next";

const BASE_URL = "https://labeltechnology.mg";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE_URL,                              lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/services`,                lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/callcenter`,     lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/dev`,            lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/services/marketing`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/digital`,        lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/data`,           lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/materiel`,       lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/projets`,                 lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/a-propos`,                lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`,                    lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE_URL}/contact`,                 lastModified: now, changeFrequency: "yearly",  priority: 0.8 },
  ];
}
