"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { brand } from "@/lib/brand";
import { getProduct, products, sizeGuides } from "@/lib/data";
import { deliveryWindow } from "@/lib/delivery";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";
import { useCart } from "@/context/CartContext";
import { useLists } from "@/context/ListsContext";
import { ProductImage } from "./ProductImage";
import { IconAccess, IconBell, IconClose, IconHeart, IconHeartFill, IconRuler, IconShare, IconTruck, IconWhatsApp } from "./Icons";
import { useDialog } from "./ui";

/* ---------- מועדפים ---------- */
export function WishButton({ slug, name, className = "wish-btn" }: { slug: string; name: string; className?: string }) {
  const { isWished, toggleWish } = useLists();
  const on = isWished(slug);
  return (
    <button className={className} aria-pressed={on} onClick={() => toggleWish(slug)} aria-label={on ? `הסרת ${name} מהמועדפים` : `שמירת ${name} במועדפים`}>
      {on ? <IconHeartFill /> : <IconHeart />}
    </button>
  );
}

/* ---------- וואטסאפ צף ---------- */
export function WhatsAppFloat() {
  const text = encodeURIComponent("היי, יש לי שאלה לגבי מוצר באתר");
  return (
    <a className="wa-float" href={`https://wa.me/${brand.whatsapp}?text=${text}`} target="_blank" rel="noopener noreferrer" aria-label="שליחת הודעה בוואטסאפ (חלון חדש)">
      <IconWhatsApp />
    </a>
  );
}

/* ---------- שיתוף (וואטסאפ / Web Share) ---------- */
export function ShareButton({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="btn btn--text btn--sm"
      onClick={async () => {
        const url = `${window.location.origin}${path}`;
        if (navigator.share) { try { await navigator.share({ title, url }); return; } catch { return; } }
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`, "_blank", "noopener");
        try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {}
      }}
    >
      <IconShare width={16} height={16} /> {copied ? "הקישור הועתק" : "שליחה לחברה"}
    </button>
  );
}

/* ---------- זמני הגעה ---------- */
export function DeliveryEstimate({ minDays = 3, maxDays = 5 }: { minDays?: number; maxDays?: number }) {
  const [w, setW] = useState<{ from: string; to: string } | null>(null);
  useEffect(() => setW(deliveryWindow(minDays, maxDays)), [minDays, maxDays]);
  if (!w) return null;
  return <div><IconTruck /> בהזמנה היום, יגיע בין {w.from} ל{w.to}</div>;
}

/* ---------- אמצעי תשלום ---------- */
export function PaymentMethods({ compact }: { compact?: boolean }) {
  const methods = ["Visa", "Mastercard", "Amex", "Diners", "bit", "Apple Pay", "Google Pay"];
  return (
    <ul className={`pay-methods${compact ? " pay-methods--compact" : ""}`} aria-label="אמצעי תשלום">
      {methods.map((m) => <li key={m}>{m}</li>)}
    </ul>
  );
}

export function InstallmentsNote({ price }: { price: number }) {
  if (price < 150) return null;
  const n = brand.installments;
  return <p className="installments">או {n} תשלומים של {formatPrice(Math.ceil((price / n) * 100) / 100)} ללא ריבית</p>;
}

/* ---------- עדכון כשחוזר למלאי ---------- */
export function NotifyMe({ name }: { name: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "err" | "ok">("idle");
  if (state === "ok") return <p className="notify-ok" role="status">נעדכן אותך במייל כש{name} יחזור למלאי.</p>;
  return (
    <form className="notify" noValidate onSubmit={(e) => { e.preventDefault(); setState(/^\S+@\S+\.\S+$/.test(email) ? "ok" : "err"); }}>
      <p className="notify__title"><IconBell width={18} height={18} /> אזל זמנית. רוצה שנודיע לך כשיחזור?</p>
      <div className="coupon-field">
        <label htmlFor="notify-email" className="visually-hidden">מייל לעדכון</label>
        <input id="notify-email" className="input" type="email" dir="ltr" style={{ textAlign: "right" }} placeholder="כתובת מייל" value={email}
          onChange={(e) => { setEmail(e.target.value); setState("idle"); }} aria-invalid={state === "err"} />
        <button className="btn" type="submit">עדכנו אותי</button>
      </div>
      {state === "err" && <p className="field-error">כתובת המייל לא תקינה</p>}
    </form>
  );
}

/* ---------- טבלת מידות ---------- */
export function SizeGuide({ slug }: { slug: string }) {
  const guide = sizeGuides[slug];
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDialog(open, close);
  if (!guide) return null;
  return (
    <>
      <button className="btn btn--text btn--sm" onClick={() => setOpen(true)}><IconRuler width={16} height={16} /> טבלת מידות</button>
      <div className={`overlay${open ? " is-open" : ""}`} onClick={close} aria-hidden="true" />
      <div ref={ref} className={`dialog${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="sg-title" aria-hidden={!open} inert={!open}>
        <div className="drawer__head"><h2 id="sg-title">טבלת מידות</h2><button className="icon-btn" onClick={close} aria-label="סגירה"><IconClose /></button></div>
        <div style={{ padding: 24, overflowX: "auto" }}>
          <table className="size-table">
            <thead><tr>{guide.cols.map((c) => <th key={c} scope="col">{c}</th>)}</tr></thead>
            <tbody>{guide.rows.map((r) => <tr key={r[0]}>{r.map((c, i) => i === 0 ? <th key={i} scope="row">{c}</th> : <td key={i}>{c}</td>)}</tr>)}</tbody>
          </table>
          <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>בין שתי מידות? מומלץ לבחור את הגדולה. המידות לפי נתוני הספק (דמו).</p>
        </div>
      </div>
    </>
  );
}

/* ---------- נצפו לאחרונה ---------- */
export function RecentlyViewed({ current }: { current?: string }) {
  const { recent, pushRecent, ready } = useLists();
  useEffect(() => { if (current && ready) pushRecent(current); }, [current, pushRecent, ready]);
  const list = recent.filter((s) => s !== current).map(getProduct).filter(Boolean).slice(0, 6) as Product[];
  if (!ready || !list.length) return null;
  return (
    <section className="container section" aria-labelledby="recent-title">
      <h2 id="recent-title" style={{ fontSize: "var(--fs-h3)", marginBottom: 24 }}>צפית לאחרונה</h2>
      <div className="mini-rail">
        {list.map((p) => (
          <Link key={p.id} href={`/product/${p.slug}`} className="mini-card">
            <div className="mini-card__img"><ProductImage tone={p.tone} shape={p.shape} src={p.images?.[0]} alt="" sizes="160px" /></div>
            <span>{p.name}</span>
            <strong>{formatPrice(p.price)}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ---------- השלמה למשלוח חינם בסל ---------- */
export function CartUpsell() {
  const { lines, freeShippingLeft, add } = useCart();
  if (!lines.length) return null;
  const inCart = new Set(lines.map((l) => l.slug));
  const target = freeShippingLeft > 0 ? freeShippingLeft : 0;
  const options = products
    .filter((p) => p.purchaseType === "direct" && p.inStock && !inCart.has(p.slug) && !(p.variants && p.variants.length > 1))
    .sort((a, b) => (target ? Math.abs(a.price - target) - Math.abs(b.price - target) : a.price - b.price))
    .slice(0, 3);
  if (!options.length) return null;
  return (
    <div className="upsell">
      <h3>{target ? "להשלמה למשלוח חינם" : "אמהות הוסיפו גם"}</h3>
      {options.map((p) => (
        <div key={p.id} className="upsell__item">
          <div className="upsell__img"><ProductImage tone={p.tone} shape={p.shape} src={p.images?.[0]} alt="" sizes="56px" /></div>
          <div><span>{p.name}</span><strong>{formatPrice(p.price)}</strong></div>
          <button className="btn btn--secondary btn--sm" onClick={() => add(p.slug, p.variants?.[0]?.id)}>הוספה<span className="visually-hidden"> של {p.name} לסל</span></button>
        </div>
      ))}
    </div>
  );
}

/* ---------- באנר עוגיות ---------- */
export function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { try { setShow(!localStorage.getItem("cookie-consent")); } catch {} }, []);
  if (!show) return null;
  const decide = (v: string) => { try { localStorage.setItem("cookie-consent", v); } catch {} setShow(false); };
  return (
    <div className="cookie" role="region" aria-label="הסכמה לעוגיות">
      <p>אנחנו משתמשות בעוגיות כדי שהאתר יעבוד ולמדידה אנונימית. <Link href="/policies/privacy">מדיניות פרטיות</Link></p>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn--sm" onClick={() => decide("all")}>מאשרת</button>
        <button className="btn btn--secondary btn--sm" onClick={() => decide("essential")}>רק הכרחיות</button>
      </div>
    </div>
  );
}

/* ---------- תפריט נגישות ---------- */
const A11Y_KEY = "a11y-prefs";
type A11y = { size: 0 | 1 | 2; contrast: boolean; links: boolean; motion: boolean; readable: boolean };
const A11Y_DEFAULT: A11y = { size: 0, contrast: false, links: false, motion: false, readable: false };

export function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<A11y>(A11Y_DEFAULT);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDialog(open, close);

  useEffect(() => { try { const s = localStorage.getItem(A11Y_KEY); if (s) setPrefs(JSON.parse(s)); } catch {} }, []);
  useEffect(() => {
    const h = document.documentElement;
    h.dataset.a11ySize = String(prefs.size);
    h.classList.toggle("a11y-contrast", prefs.contrast);
    h.classList.toggle("a11y-links", prefs.links);
    h.classList.toggle("a11y-motion", prefs.motion);
    h.classList.toggle("a11y-readable", prefs.readable);
    try { localStorage.setItem(A11Y_KEY, JSON.stringify(prefs)); } catch {}
  }, [prefs]);

  const T = ({ k, label }: { k: "contrast" | "links" | "motion" | "readable"; label: string }) => (
    <button className="a11y-opt" aria-pressed={prefs[k]} onClick={() => setPrefs({ ...prefs, [k]: !prefs[k] })}>{label}</button>
  );

  return (
    <>
      <button className="a11y-float" onClick={() => setOpen(true)} aria-label="תפריט נגישות" aria-expanded={open}><IconAccess /></button>
      <div className={`overlay${open ? " is-open" : ""}`} onClick={close} aria-hidden="true" />
      <div ref={ref} className={`drawer drawer--start a11y-panel${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="a11y-title" aria-hidden={!open} inert={!open}>
        <div className="drawer__head"><h2 id="a11y-title">נגישות</h2><button className="icon-btn" onClick={close} aria-label="סגירת תפריט נגישות"><IconClose /></button></div>
        <div className="drawer__body" style={{ display: "grid", gap: 10, alignContent: "start" }}>
          <div className="a11y-size" role="group" aria-label="גודל טקסט">
            {(["רגיל", "גדול", "גדול מאוד"] as const).map((l, i) => (
              <button key={l} className="a11y-opt" aria-pressed={prefs.size === i} onClick={() => setPrefs({ ...prefs, size: i as 0 | 1 | 2 })}>{l}</button>
            ))}
          </div>
          <T k="contrast" label="ניגודיות גבוהה" />
          <T k="links" label="הדגשת קישורים" />
          <T k="readable" label="גופן קריא" />
          <T k="motion" label="עצירת אנימציות" />
          <button className="btn btn--secondary" onClick={() => setPrefs(A11Y_DEFAULT)}>איפוס הגדרות</button>
          <Link href="/policies/accessibility" className="text-link" onClick={close}>הצהרת נגישות</Link>
        </div>
      </div>
    </>
  );
}
