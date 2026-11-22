/**
 * חישובי מחיר טהורים (ללא React וללא דפדפן).
 * משמשים גם את הסל בצד הלקוח וגם, בהמשך, את השרת בעת יצירת הזמנה –
 * השרת הוא מקור האמת למחירים, ואסור לסמוך על סכומים שמגיעים מהדפדפן.
 */
export type CouponDef = { type: "percent" | "fixed"; value: number; label: string };

/** סכום ההנחה בש״ח, מעוגל לאגורה ולעולם לא גבוה מסכום הביניים */
export function computeDiscount(subtotal: number, coupon: CouponDef | undefined | null): number {
  if (!coupon || subtotal <= 0) return 0;
  const raw = coupon.type === "percent" ? (subtotal * coupon.value) / 100 : coupon.value;
  return Math.min(Math.round(raw * 100) / 100, subtotal);
}

/** כמה חסר למשלוח חינם (0 כשהסף הושג) */
export function freeShippingRemaining(subtotal: number, discount: number, threshold: number): number {
  return Math.max(0, threshold - (subtotal - discount));
}

export function normalizeCouponCode(code: string): string {
  return code.trim().toUpperCase();
}
