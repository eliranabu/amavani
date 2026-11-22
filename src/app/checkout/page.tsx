"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { demoAddOrder } from "@/lib/demo-store";
import { GIFT_WRAP_PRICE, getProduct, shippingMethods } from "@/lib/data";
import { deliveryWindow } from "@/lib/delivery";
import { brand } from "@/lib/brand";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/ProductImage";
import { CouponField } from "@/components/CartDrawer";
import { IconAlert, IconBag, IconLock } from "@/components/Icons";

type FieldName = "email" | "firstName" | "lastName" | "phone" | "city" | "street" | "house" | "terms";
type Errors = Partial<Record<FieldName, string>>;

const validators: Record<Exclude<FieldName, "terms">, (v: string) => string | undefined> = {
  email: (v) => (!v ? "יש להזין כתובת מייל" : !/^\S+@\S+\.\S+$/.test(v) ? "כתובת המייל לא תקינה" : undefined),
  firstName: (v) => (!v.trim() ? "יש להזין שם פרטי" : undefined),
  lastName: (v) => (!v.trim() ? "יש להזין שם משפחה" : undefined),
  phone: (v) => (!v ? "יש להזין מספר טלפון" : !/^0\d{1,2}-?\d{7}$/.test(v.replace(/\s/g, "")) ? "מספר הטלפון לא תקין (לדוגמה 050-1234567)" : undefined),
  city: (v) => (!v.trim() ? "יש להזין עיר" : undefined),
  street: (v) => (!v.trim() ? "יש להזין רחוב" : undefined),
  house: (v) => (!v.trim() ? "יש להזין מספר בית" : undefined),
};

export default function CheckoutPage() {
  const { lines, subtotal, discount, freeShippingLeft, clear, ready } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [shipping, setShipping] = useState(shippingMethods[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [giftWrap, setGiftWrap] = useState(true);
  const [payment, setPayment] = useState("card");
  const [installments, setInstallments] = useState(1);

  const method = shippingMethods.find((m) => m.id === shipping)!;
  const shipFree = (m: (typeof shippingMethods)[number]) => m.freeEligible && freeShippingLeft === 0;
  const shippingCost = shipFree(method) ? 0 : method.price;
  const wrapCost = isGift && giftWrap ? GIFT_WRAP_PRICE : 0;
  const total = Math.max(0, subtotal - discount) + shippingCost + wrapCost;

  if (!ready) return <div className="container"><p className="page-head muted">טוען…</p></div>;

  if (lines.length === 0) {
    return (
      <div className="container">
        <div className="empty-state">
          <IconBag />
          <h1 style={{ fontSize: "var(--fs-h3)" }}>אין פריטים לתשלום</h1>
          <p>הסל ריק. אפשר לחזור לחנות ולהוסיף מוצרים.</p>
          <Link href="/products" className="btn">לכל המוצרים</Link>
        </div>
      </div>
    );
  }

  const validateField = (name: FieldName, value: string | boolean) => {
    const msg = name === "terms" ? (value ? undefined : "יש לאשר את תנאי השימוש ומדיניות הפרטיות") : validators[name](String(value));
    setErrors((e) => ({ ...e, [name]: msg }));
    return msg;
  };

  const prefill: Partial<Record<FieldName, string>> = user ? { email: user.email, firstName: user.firstName, lastName: user.lastName, phone: user.phone } : {};
  const fieldProps = (name: Exclude<FieldName, "terms">) => ({
    id: name, name, defaultValue: prefill[name],
    className: `input${touched[name] && !errors[name] ? " is-valid" : ""}`,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-err` : undefined,
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => { setTouched((t) => ({ ...t, [name]: true })); validateField(name, e.target.value); },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => { if (errors[name]) validateField(name, e.target.value); },
  });

  const Err = ({ name }: { name: FieldName }) =>
    errors[name] ? <span id={`${name}-err`} className="field-error"><IconAlert />{errors[name]}</span> : null;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const next: Errors = {};
    (Object.keys(validators) as Exclude<FieldName, "terms">[]).forEach((k) => { const m = validators[k](String(fd.get(k) ?? "")); if (m) next[k] = m; });
    if (!fd.get("terms")) next.terms = "יש לאשר את תנאי השימוש ומדיניות הפרטיות";
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return; }

    setSubmitting(true);
    // TODO: כאן תתבצע יצירת הזמנה בשרת והפניה לעמוד הסליקה (Cardcom / Tranzila / Meshulam / PayPlus וכו')
    const orderNo = `${Date.now().toString().slice(-6)}`;
    demoAddOrder({
      orderNo, createdAt: new Date().toISOString(), email: String(fd.get("email")), phone: String(fd.get("phone")),
      items: lines.map((l) => { const p = getProduct(l.slug)!; return { slug: l.slug, name: p.name, variant: p.variants?.find((v) => v.id === l.variantId)?.label, qty: l.qty, price: p.price }; }),
      subtotal, discount, shipping: shippingCost + wrapCost, total, method: method.label, status: "received", gift: isGift,
    });
    try {
      sessionStorage.setItem("last-order", JSON.stringify({ orderNo, email: fd.get("email"), total, name: fd.get("firstName"), eta: deliveryWindow(method.minDays, method.maxDays), method: method.label, gift: isGift }));
    } catch {}
    window.setTimeout(() => { clear(); router.push("/checkout/success"); }, 900);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  const Summary = (
    <aside className="summary-card" aria-labelledby="co-sum">
      <h2 id="co-sum">ההזמנה שלך</h2>
      <div className="checkout__mini">
        {lines.map((l) => {
          const p = getProduct(l.slug)!;
          const v = p.variants?.find((x) => x.id === l.variantId);
          return (
            <div key={l.key} className="checkout__mini-item">
              <div className="checkout__mini-thumb">
                <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "4/5" }}><ProductImage tone={p.tone} shape={p.shape} src={p.images?.[0]} alt="" /></div>
                <span className="count-bubble">{l.qty}</span>
              </div>
              <div>{p.name}{v && <div className="muted" style={{ fontSize: 12.5 }}>{v.label}</div>}</div>
              <strong style={{ fontWeight: 600 }}>{formatPrice(p.price * l.qty)}</strong>
            </div>
          );
        })}
      </div>
      <CouponField />
      <div className="summary-row"><span>סכום ביניים</span><span>{formatPrice(subtotal)}</span></div>
      {discount > 0 && <div className="summary-row summary-row--discount"><span>הנחת קופון</span><span>‎-{formatPrice(discount)}</span></div>}
      <div className="summary-row"><span>משלוח ({method.label})</span><span>{shippingCost === 0 ? "חינם" : formatPrice(shippingCost)}</span></div>
      {wrapCost > 0 && <div className="summary-row"><span>אריזת מתנה</span><span>{formatPrice(wrapCost)}</span></div>}
      <div className="summary-row summary-row--total"><span>סה״כ לתשלום</span><span>{formatPrice(total)}</span></div>
      {installments > 1 && <p className="muted" style={{ fontSize: 13 }}>{installments} תשלומים של {formatPrice(Math.ceil((total / installments) * 100) / 100)}</p>}
      <p className="muted" style={{ fontSize: 12.5 }}>כל המחירים כוללים מע״מ.</p>
    </aside>
  );

  return (
    <div className="container">
      <div className="checkout">
        <div>
          <nav className="checkout__steps" aria-label="שלבי רכישה">
            <Link href="/cart">סל</Link><span aria-hidden="true">·</span>
            <span aria-current="step">פרטים ומשלוח</span><span aria-hidden="true">·</span>
            <span>תשלום</span><span aria-hidden="true">·</span><span>אישור</span>
          </nav>
          <h1 className="page-title">השלמת הזמנה</h1>
          <p className="muted" style={{ marginBottom: 24 }}>{user ? <>מחוברת כ-<bdi>{user.email}</bdi></> : "רכישה כאורחת – בלי צורך לפתוח חשבון."}</p>

          {/* סיכום מקופל במובייל */}
          <div className="checkout-summary-mobile" style={{ marginBottom: 24 }}>
            <button className="btn btn--secondary btn--block" type="button" aria-expanded={showSummary} onClick={() => setShowSummary((s) => !s)}>
              {showSummary ? "הסתרת" : "הצגת"} סיכום הזמנה · {formatPrice(total)}
            </button>
            {showSummary && <div style={{ marginTop: 12 }}>{Summary}</div>}
          </div>

          {errorCount > 1 && (
            <div className="form-alert" role="alert">יש {errorCount} שדות שצריך לתקן. הן מסומנות למטה.</div>
          )}

          <form key={user?.id ?? "guest"} ref={formRef} onSubmit={onSubmit} noValidate>
            <fieldset>
              <legend>פרטי קשר</legend>
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="email">מייל</label>
                  <input {...fieldProps("email")} type="email" inputMode="email" autoComplete="email" dir="ltr" style={{ textAlign: "right" }} />
                  <span className="hint">לשם נשלח את אישור ההזמנה ומספר המעקב</span>
                  <Err name="email" />
                </div>
                <div className="form-grid form-grid--2">
                  <div className="field"><label htmlFor="firstName">שם פרטי</label><input {...fieldProps("firstName")} autoComplete="given-name" /><Err name="firstName" /></div>
                  <div className="field"><label htmlFor="lastName">שם משפחה</label><input {...fieldProps("lastName")} autoComplete="family-name" /><Err name="lastName" /></div>
                </div>
                <div className="field">
                  <label htmlFor="phone">טלפון נייד</label>
                  <input {...fieldProps("phone")} type="tel" inputMode="tel" autoComplete="tel" dir="ltr" style={{ textAlign: "right" }} placeholder="050-1234567" />
                  <span className="hint">לתיאום עם השליח</span>
                  <Err name="phone" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>כתובת למשלוח</legend>
              <div className="form-grid">
                <div className="field"><label htmlFor="city">עיר / יישוב</label><input {...fieldProps("city")} autoComplete="address-level2" /><Err name="city" /></div>
                <div className="form-grid form-grid--2">
                  <div className="field"><label htmlFor="street">רחוב</label><input {...fieldProps("street")} autoComplete="address-line1" /><Err name="street" /></div>
                  <div className="form-grid form-grid--2">
                    <div className="field"><label htmlFor="house">מס׳ בית</label><input {...fieldProps("house")} inputMode="numeric" /><Err name="house" /></div>
                    <div className="field"><label htmlFor="apt">דירה <span className="muted">(רשות)</span></label><input id="apt" name="apt" className="input" inputMode="numeric" /></div>
                  </div>
                </div>
                <div className="field"><label htmlFor="notes">הערות לשליח <span className="muted">(רשות)</span></label><input id="notes" name="notes" className="input" placeholder="קוד לבניין, קומה וכו׳" /></div>
              </div>
            </fieldset>

            <fieldset>
              <legend>שולחת כמתנה?</legend>
              <label className="checkbox"><input type="checkbox" name="isGift" checked={isGift} onChange={(e) => setIsGift(e.target.checked)} /> כן, זו מתנה – לשלוח ישירות למקבלת</label>
              {isGift && (
                <div className="gift-box">
                  <p style={{ fontSize: 14 }}>את כתובת המשלוח למעלה ממלאים עם הכתובת של מקבלת המתנה. המחירים לא יופיעו בחבילה.</p>
                  <div className="form-grid form-grid--2">
                    <div className="field"><label htmlFor="giftName">שם מקבלת המתנה</label><input id="giftName" name="giftName" className="input" /></div>
                    <div className="field"><label htmlFor="giftPhone">הטלפון שלה (לתיאום עם השליח)</label><input id="giftPhone" name="giftPhone" className="input" type="tel" inputMode="tel" dir="ltr" style={{ textAlign: "right" }} /></div>
                  </div>
                  <div className="field">
                    <label htmlFor="giftMsg">ברכה אישית <span className="muted">(רשות, עד 200 תווים)</span></label>
                    <textarea id="giftMsg" name="giftMsg" className="input" maxLength={200} placeholder="מזל טוב! מחכות לפגוש את הקטנה…" style={{ minHeight: 90 }} />
                  </div>
                  <label className="checkbox"><input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} /> אריזת מתנה עם סרט ({formatPrice(GIFT_WRAP_PRICE)})</label>
                </div>
              )}
            </fieldset>

            <fieldset>
              <legend>שיטת משלוח</legend>
              <div className="form-grid">
                {shippingMethods.map((m) => {
                  const w = deliveryWindow(m.minDays, m.maxDays);
                  return (
                    <label key={m.id} className="choice">
                      <input type="radio" name="shipping" value={m.id} checked={shipping === m.id} onChange={() => setShipping(m.id)} />
                      <span className="choice__body">
                        <span>{m.label}<small>{m.eta}</small><span className="eta">יגיע בין {w.from} ל{w.to}</span></span>
                        <strong style={{ fontWeight: 600 }}>{shipFree(m) ? "חינם" : formatPrice(m.price)}</strong>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset>
              <legend>תשלום</legend>
              <div className="pay-choice">
                {[
                  { id: "card", label: "כרטיס אשראי", sub: "ויזה, מאסטרקארד, אמריקן אקספרס, דיינרס" },
                  { id: "bit", label: "bit", sub: "תשלום מהיר מהטלפון" },
                  { id: "wallet", label: "Apple Pay / Google Pay", sub: "במכשירים תומכים" },
                ].map((m) => (
                  <label key={m.id} className="choice">
                    <input type="radio" name="payment" value={m.id} checked={payment === m.id} onChange={() => { setPayment(m.id); if (m.id !== "card") setInstallments(1); }} />
                    <span className="choice__body"><span>{m.label}<small>{m.sub}</small></span></span>
                  </label>
                ))}
              </div>
              {payment === "card" && total >= 150 && (
                <div className="field" style={{ marginTop: 16, maxWidth: 280 }}>
                  <label htmlFor="installments">מספר תשלומים</label>
                  <select id="installments" className="select" style={{ backgroundColor: "var(--white)" }} value={installments} onChange={(e) => setInstallments(Number(e.target.value))}>
                    {Array.from({ length: brand.installments }, (_, i) => i + 1).map((n) => <option key={n} value={n}>{n === 1 ? "תשלום אחד" : `${n} תשלומים ללא ריבית`}</option>)}
                  </select>
                </div>
              )}
              <div className="payment-box" style={{ marginTop: 16 }}>
                <strong style={{ color: "var(--color-text)", display: "flex", gap: 8, alignItems: "center" }}><IconLock width={16} height={16} /> תשלום מאובטח</strong>
                <p style={{ marginTop: 6 }}>בלחיצה על ״לתשלום״ תעברי לעמוד סליקה מאובטח. פרטי האשראי לא נשמרים אצלנו. חשבונית מס נשלחת למייל.</p>
                <p className="demo-note" style={{ marginBottom: 0 }}>[MVP] חיבור לחברת סליקה ישראלית (כולל bit ו-Apple Pay) יתבצע בשלב הבא. כרגע הלחיצה מדמה הזמנה מוצלחת.</p>
              </div>
              <label className="checkbox" style={{ marginTop: 16, alignItems: "flex-start" }}>
                <input type="checkbox" name="terms" aria-invalid={errors.terms ? true : undefined} aria-describedby={errors.terms ? "terms-err" : undefined} onChange={(e) => errors.terms && validateField("terms", e.target.checked)} style={{ marginTop: 3 }} />
                <span>קראתי ואני מסכימה ל<Link href="/policies/terms" style={{ textDecoration: "underline" }}>תנאי השימוש</Link>, ל<Link href="/policies/returns" style={{ textDecoration: "underline" }}>מדיניות הביטולים</Link> ול<Link href="/policies/privacy" style={{ textDecoration: "underline" }}>מדיניות הפרטיות</Link></span>
              </label>
              <Err name="terms" />
              <label className="checkbox"><input type="checkbox" name="marketing" /> אשמח לקבל עדכונים והטבות במייל (רשות)</label>
            </fieldset>

            <button className="btn btn--block" type="submit" disabled={submitting} style={{ minHeight: 54 }}>
              {submitting ? <><span className="spinner" aria-hidden="true" /> מעבירה לתשלום…</> : <><IconLock width={16} height={16} /> לתשלום {formatPrice(total)}</>}
            </button>
          </form>
        </div>

        <div className="checkout-summary-desktop">{Summary}</div>
      </div>
    </div>
  );
}
