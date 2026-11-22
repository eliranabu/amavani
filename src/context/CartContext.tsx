"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { coupons, getProduct } from "@/lib/data";
import { brand } from "@/lib/brand";
import { computeDiscount, freeShippingRemaining, normalizeCouponCode } from "@/lib/pricing";

export interface CartLine {
  key: string;
  slug: string;
  variantId?: string;
  qty: number;
}

interface CartState {
  lines: CartLine[];
  coupon: string | null;
  isOpen: boolean;
  ready: boolean;
  toast: string | null;
  count: number;
  subtotal: number;
  discount: number;
  freeShippingLeft: number;
  open: () => void;
  close: () => void;
  add: (slug: string, variantId?: string, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  applyCoupon: (code: string) => { ok: boolean; message: string };
  removeCoupon: () => void;
  clear: () => void;
  showToast: (msg: string) => void;
}

const Ctx = createContext<CartState | null>(null);
const STORAGE_KEY = "store-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        // רק מוצרי רכישה ישירה נכנסים לסל
        setLines((data.lines ?? []).filter((l: CartLine) => getProduct(l.slug)?.purchaseType === "direct"));
        setCoupon(data.coupon ?? null);
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ lines, coupon }));
    } catch {}
  }, [lines, coupon, hydrated]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const [live, setLive] = useState("");
  const add = useCallback((slug: string, variantId?: string, qty = 1) => {
    const p = getProduct(slug);
    if (!p || p.purchaseType !== "direct") return; // הפרדה קריטית: Affiliate לא נכנס לסל
    const v = p.variants?.find((x) => x.id === variantId);
    setLive(`${p.name}${v ? `, ${v.label}` : ""} נוסף לסל`);
    const key = `${slug}__${variantId ?? "default"}`;
    setLines((prev) => {
      const found = prev.find((l) => l.key === key);
      if (found) return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 10) } : l));
      return [...prev, { key, slug, variantId, qty }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, qty: Math.max(1, Math.min(qty, 10)) } : l)));
  }, []);

  const remove = useCallback((key: string) => setLines((prev) => prev.filter((l) => l.key !== key)), []);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + (getProduct(l.slug)?.price ?? 0) * l.qty, 0),
    [lines]
  );

  const discount = useMemo(() => {
    return computeDiscount(subtotal, coupon ? coupons[coupon] : null);
  }, [coupon, subtotal]);

  const applyCoupon = useCallback((code: string) => {
    const normalized = normalizeCouponCode(code);
    if (!normalized) return { ok: false, message: "יש להזין קוד קופון" };
    if (!coupons[normalized]) return { ok: false, message: "הקוד לא תקף. כדאי לבדוק שאין שגיאת הקלדה." };
    setCoupon(normalized);
    return { ok: true, message: `הקופון הופעל: ${coupons[normalized].label}` };
  }, []);

  const value: CartState = {
    lines, coupon, isOpen, toast, ready: hydrated,
    count: lines.reduce((s, l) => s + l.qty, 0),
    subtotal, discount,
    freeShippingLeft: freeShippingRemaining(subtotal, discount, brand.freeShippingThreshold),
    open: () => setOpen(true),
    close: () => setOpen(false),
    add, setQty, remove, applyCoupon,
    removeCoupon: () => setCoupon(null),
    clear: () => { setLines([]); setCoupon(null); },
    showToast,
  };

  return (
    <Ctx.Provider value={value}>
      {children}
      {/* הכרזה לקוראי מסך על כל הוספה לסל */}
      <div className="visually-hidden" role="status" aria-live="polite">{live}</div>
    </Ctx.Provider>
  );
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
