import type { Page } from "@playwright/test";
import fs from "node:fs";

export const DIRECT = "/product/muslin-swaddle-set";
export const AFFILIATE = "/product/white-noise-machine";

export const ROUTES = [
  "/", "/products", "/category/baby", "/category/feeding", "/deals", "/creator-picks", "/search?q=חיתול",
  DIRECT, AFFILIATE, "/cart", "/checkout", "/guides", "/guides/before-birth-checklist",
  "/about", "/contact", "/faq", "/policies/returns", "/policies/privacy", "/policies/terms",
  "/account", "/track", "/wishlist", "/registry", "/gift-card", "/cancel",
];

/** מזריק axe-core לעמוד ומחזיר הפרות WCAG 2.1 AA */
export async function axeViolations(page: Page) {
  const src = fs.readFileSync(require.resolve("axe-core/axe.min.js"), "utf8");
  await page.evaluate(src);
  return page.evaluate(async () => {
    // @ts-expect-error axe מוזרק בזמן ריצה
    const r = await window.axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] } });
    return r.violations.map((v: { id: string; nodes: { target: string[] }[] }) => `${v.id}: ${v.nodes.slice(0, 3).map((n) => n.target.join(" ")).join(" | ")}`);
  });
}

export async function dismissOverlays(page: Page) {
  // באנר עוגיות עלול לחסום לחיצות
  const btn = page.getByRole("button", { name: /רק הכרחיות/ });
  if (await btn.isVisible().catch(() => false)) await btn.click();
}
