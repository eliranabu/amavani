import { expect, test } from "@playwright/test";
import { ROUTES, axeViolations, dismissOverlays } from "./helpers";

for (const route of ROUTES) {
  test.describe(route, () => {
    test("נטען בלי שגיאות, עם h1 ובלי גלישה אופקית", async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.locator("h1").first()).toBeVisible();
      expect(errors).toEqual([]);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow, "גלישה אופקית").toBeLessThanOrEqual(1);
    });

    test("נגישות WCAG 2.1 AA (axe)", async ({ page }) => {
      await page.goto(route);
      await dismissOverlays(page);
      expect(await axeViolations(page)).toEqual([]);
    });
  });
}

test("עמוד שלא קיים מחזיר 404 מעוצב", async ({ page }) => {
  const res = await page.goto("/no-such-page");
  expect(res?.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
});

test("sitemap ו-robots זמינים", async ({ request }) => {
  expect((await request.get("/sitemap.xml")).status()).toBe(200);
  expect((await request.get("/robots.txt")).status()).toBe(200);
});
