import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.co.il";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout", "/cart", "/account", "/search", "/wishlist"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
