import type { MetadataRoute } from "next";
import { categories, guides, products } from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.co.il";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/creator-picks", "/deals", "/guides", "/about", "/faq", "/contact", "/registry", "/gift-card"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${BASE}/category/${c.slug}`, priority: 0.8 })),
    ...products.map((p) => ({ url: `${BASE}/product/${p.slug}`, priority: 0.9 })),
    ...guides.map((g) => ({ url: `${BASE}/guides/${g.slug}`, priority: 0.6 })),
  ];
}
