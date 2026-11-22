import { describe, expect, it } from "vitest";
import { computeDiscount, freeShippingRemaining, normalizeCouponCode } from "@/lib/pricing";
import { coupons } from "@/lib/data";

describe("computeDiscount", () => {
  it("מחשב אחוז הנחה", () => {
    expect(computeDiscount(200, coupons.WELCOME10)).toBe(20);
  });
  it("מחשב הנחה קבועה", () => {
    expect(computeDiscount(200, coupons.MOM20)).toBe(20);
  });
  it("לא עולה על סכום הביניים", () => {
    expect(computeDiscount(15, coupons.MOM20)).toBe(15);
  });
  it("מעגל לאגורה", () => {
    expect(computeDiscount(33.33, { type: "percent", value: 10, label: "" })).toBe(3.33);
  });
  it("מחזיר 0 בלי קופון או בסל ריק", () => {
    expect(computeDiscount(100, null)).toBe(0);
    expect(computeDiscount(0, coupons.MOM20)).toBe(0);
  });
});

describe("freeShippingRemaining", () => {
  it("מחשב מה חסר אחרי הנחה", () => {
    expect(freeShippingRemaining(300, 30, 299)).toBe(29);
  });
  it("0 כשהסף הושג", () => {
    expect(freeShippingRemaining(400, 0, 299)).toBe(0);
  });
});

describe("normalizeCouponCode", () => {
  it("מנקה רווחים ואותיות", () => {
    expect(normalizeCouponCode("  welcome10 ")).toBe("WELCOME10");
  });
});
