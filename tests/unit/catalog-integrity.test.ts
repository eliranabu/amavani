import { describe, expect, it } from "vitest";
import { categories, guides, products, shippingMethods } from "@/lib/data";

/** בדיקות שמגינות על "הכללים שאסור לשבור" מתוך CLAUDE.md */
describe("שלמות הקטלוג", () => {
  it("slug ו-id ייחודיים", () => {
    expect(new Set(products.map((p) => p.slug)).size).toBe(products.length);
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });

  it("לכל מוצר יש קטגוריה קיימת", () => {
    const slugs = new Set(categories.map((c) => c.slug));
    for (const p of products) expect(slugs.has(p.category), p.slug).toBe(true);
  });

  it("מוצר Affiliate חייב קישור שותף; מוצר ישיר לא אמור להיות עם partner", () => {
    for (const p of products) {
      if (p.purchaseType === "affiliate") {
        expect(p.partner?.url, p.slug).toMatch(/^https?:\/\//);
      } else {
        expect(p.partner, p.slug).toBeUndefined();
      }
    }
  });

  it("מחיר קודם (compareAt) רק כשהוא באמת גבוה מהמחיר", () => {
    for (const p of products) if (p.compareAt !== undefined) expect(p.compareAt, p.slug).toBeGreaterThan(p.price);
  });

  it("מחירים חיוביים", () => {
    for (const p of products) expect(p.price, p.slug).toBeGreaterThan(0);
  });

  it("אין ביקורות מומצאות בנתוני הדמו", () => {
    for (const p of products) expect(p.reviews, p.slug).toHaveLength(0);
  });

  it("מוצרים קשורים במדריכים קיימים", () => {
    const slugs = new Set(products.map((p) => p.slug));
    for (const g of guides) for (const r of g.relatedProducts) expect(slugs.has(r), `${g.slug}→${r}`).toBe(true);
  });

  it("טווחי מספרים עם מקף רגיל ולא en-dash (כלל RTL)", () => {
    for (const p of products) expect(p.ageRange, p.slug).not.toContain("–");
    for (const m of shippingMethods) expect(m.eta).not.toContain("–");
  });
});
