import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.co.il";
/** גרסת תצוגה (לא לאינדוקס) – STATIC_EXPORT=1 או PREVIEW=1 */
const preview = process.env.STATIC_EXPORT === "1" || process.env.PREVIEW === "1";

export default function robots(): MetadataRoute.Robots {
  if (preview) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/checkout", "/cart", "/account", "/search", "/wishlist"] },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
