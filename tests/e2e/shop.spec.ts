import { expect, test } from "@playwright/test";
import { AFFILIATE, DIRECT, dismissOverlays } from "./helpers";

test("מוצר Affiliate: אין הוספה לסל, והקישור sponsored ונפתח בחלון חדש", async ({ page }) => {
  await page.goto(AFFILIATE);
  await expect(page.getByRole("button", { name: /הוספה לסל/ })).toHaveCount(0);
  const link = page.getByRole("link", { name: /לרכישה באתר השותף/ }).first();
  await expect(link).toHaveAttribute("rel", /sponsored/);
  await expect(link).toHaveAttribute("target", "_blank");
});

test("חיפוש מחזיר תוצאות ומטפל בחוסר תוצאות", async ({ page }) => {
  await page.goto("/search?q=חיתול");
  await expect(page.locator("main a[href^='/product/']").first()).toBeVisible();
  await page.goto("/search?q=zzzzqqq");
  await expect(page.locator("main a[href^='/product/']")).toHaveCount(0);
});

test("סל וקנייה: הוספה, קופון, ולידציית checkout, הזמנה והופעה במעקב ובחשבון", async ({ page }) => {
  await page.goto(DIRECT);
  await dismissOverlays(page);
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: /הוספה לסל/ }).first().click();
  await expect(page.getByRole("dialog")).toBeVisible(); // מגירת הסל נפתחת אחרי ההוספה

  await page.goto("/cart");
  await expect(page.getByText("סט חיתולי טטרה מוסלין").first()).toBeVisible();
  const main = page.locator("main"); // מגירת הסל (סגורה) מכילה שדה קופון נוסף
  await main.getByLabel("קוד קופון").fill("welcome10");
  await main.getByRole("button", { name: "החלה" }).click();
  await expect(main.getByText("הנחת קופון")).toBeVisible();

  await page.goto("/checkout");
  await page.locator("main form button[type=submit]").click();
  await expect(page.locator(".field-error").first()).toBeVisible();

  await page.fill("#email", "mom@example.com");
  await page.fill("#firstName", "דנה");
  await page.fill("#lastName", "לוי");
  await page.fill("#phone", "050-1234567");
  await page.fill("#city", "תל אביב");
  await page.fill("#street", "הרצל");
  await page.fill("#house", "5");
  await page.check("input[name=terms]");
  await page.locator("main form button[type=submit]").click();
  await page.waitForURL(/\/checkout\/success\/?$/);
  const orderNo = (await page.locator("strong", { hasText: /^#\d+$/ }).first().textContent())!.replace("#", "");

  await page.goto("/track");
  await page.fill("#order", orderNo);
  await page.fill("#phone", "0501234567");
  await page.getByRole("button", { name: "בדיקת סטטוס" }).click();
  await expect(page.locator(".notify-ok")).toContainText(orderNo);

  await page.fill("#order", "999999");
  await page.getByRole("button", { name: "בדיקת סטטוס" }).click();
  await expect(page.locator(".field-error")).toContainText("לא נמצאה");
});

test("חשבון: הרשמה, הזמנה מופיעה, התנתקות, כניסה עם סיסמה שגויה ונכונה", async ({ page }) => {
  const email = `t${Date.now()}@example.com`;
  await page.goto("/account");
  await page.getByRole("button", { name: "הרשמה" }).click();
  await page.getByRole("button", { name: "יצירת חשבון" }).click();
  await expect(page.locator(".field-error").first()).toBeVisible();

  await page.fill("#firstName", "דנה");
  await page.fill("#lastName", "לוי");
  await page.fill("#email", email);
  await page.fill("#phone", "050-1234567");
  await page.fill("#password", "password123");
  await page.check("input[name=terms]");
  await page.getByRole("button", { name: "יצירת חשבון" }).click();
  await expect(page.getByRole("heading", { name: "ההזמנות שלי" })).toBeVisible();

  await page.getByRole("button", { name: "התנתקות" }).click();
  await page.fill("#email", email);
  await page.fill("#password", "wrong-password");
  await page.getByRole("button", { name: "התחברות", exact: true }).last().click();
  await expect(page.locator("p[role=alert]")).toContainText("לא נכונים");
  await page.fill("#password", "password123");
  await page.getByRole("button", { name: "התחברות", exact: true }).last().click();
  await expect(page.getByRole("heading", { name: "ההזמנות שלי" })).toBeVisible();
});
