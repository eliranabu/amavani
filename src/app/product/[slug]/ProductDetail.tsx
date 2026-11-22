"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { brand } from "@/lib/brand";
import { formatPrice } from "@/lib/format";
import { AddToCartButton, AffiliateCTA, ProductPrice } from "@/components/commerce";
import { ProductImage } from "@/components/ProductImage";
import { Accordion, Quantity } from "@/components/ui";
import { IconCheck, IconExternal, IconGift, IconReturn, IconStore, IconWhatsApp } from "@/components/Icons";
import { DeliveryEstimate, InstallmentsNote, NotifyMe, ShareButton, SizeGuide, WishButton } from "@/components/extras";
import { useLists } from "@/context/ListsContext";

const GALLERY_COUNT = 4;

/* ---------- ProductGallery ---------- */
function ProductGallery({ p }: { p: Product }) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);
  const count = p.images?.length || GALLERY_COUNT;

  return (
    <div className="gallery">
      <div
        ref={mainRef}
        className={`gallery__main${zoom ? " is-zoomed" : ""}`}
        onClick={() => setZoom((z) => !z)}
        onMouseMove={(e) => {
          const r = mainRef.current!.getBoundingClientRect();
          mainRef.current!.style.setProperty("--zx", `${((e.clientX - r.left) / r.width) * 100}%`);
          mainRef.current!.style.setProperty("--zy", `${((e.clientY - r.top) / r.height) * 100}%`);
        }}
        onMouseLeave={() => setZoom(false)}
        role="button" tabIndex={0} aria-label={zoom ? "הקטנת תמונה" : "הגדלת תמונה"}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setZoom((z) => !z); } }}
      >
        <ProductImage tone={p.tone} shape={p.shape} src={p.images?.[active]} alt={`${p.name} – תמונה ${active + 1}`} variant={active} priority sizes="(min-width:1024px) 50vw, 100vw" label={p.images?.length ? undefined : "תמונת מוצר · 1200×1500"} />
      </div>
      <div className="gallery__thumbs" role="group" aria-label="תמונות נוספות">
        {Array.from({ length: count }).map((_, i) => (
          <button key={i} aria-current={i === active} onClick={() => { setActive(i); setZoom(false); }} aria-label={`תמונה ${i + 1}`}>
            <ProductImage tone={p.tone} shape={p.shape} src={p.images?.[i]} alt="" variant={i} sizes="80px" />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ---------- ProductVariantSelector ---------- */
function ProductVariantSelector({ p, value, onChange }: { p: Product; value?: string; onChange: (id: string) => void }) {
  if (!p.variants?.length) return null;
  const current = p.variants.find((v) => v.id === value);
  return (
    <fieldset className="variant-group">
      <legend>{p.variantLabel}: <span className="muted">{current?.label ?? "יש לבחור"}</span></legend>
      <div className="variant-options">
        {p.variants.map((v) => (
          <label key={v.id} className={`variant-option${v.inStock ? "" : " is-out"}`}>
            <input
              type="radio" name={`variant-${p.slug}`} value={v.id} className="visually-hidden"
              checked={v.id === value} disabled={!v.inStock} onChange={() => onChange(v.id)}
            />
            {v.swatch && <span className="swatch" style={{ background: v.swatch }} aria-hidden="true" />}
            {v.label}
            {!v.inStock && <span className="visually-hidden">(אזל מהמלאי)</span>}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/* ---------- Sticky add to cart (Dropshipping/ישיר בלבד) ---------- */
function StickyAddToCart({ p, variantId, target }: { p: Product; variantId?: string; target: React.RefObject<HTMLDivElement | null> }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = target.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    document.body.classList.add("has-sticky-atc");
    return () => { io.disconnect(); document.body.classList.remove("has-sticky-atc"); };
  }, [target]);
  return (
    <div className={`sticky-atc${visible ? " is-visible" : ""}`} aria-hidden={!visible} inert={!visible}>
      <div className="sticky-atc__info">
        <strong>{p.name}</strong>
        <ProductPrice price={p.price} compareAt={p.compareAt} />
      </div>
      <AddToCartButton p={p} variantId={variantId} disabledReason={p.variants?.length && !variantId ? "יש לבחור אפשרות" : undefined} />
    </div>
  );
}

/* ---------- Product detail ---------- */
export function ProductDetail({ p }: { p: Product }) {
  const [variantId, setVariantId] = useState<string | undefined>(p.variants?.find((v) => v.inStock)?.id);
  const [qty, setQty] = useState(1);
  const buyRef = useRef<HTMLDivElement>(null);
  const isDirect = p.purchaseType === "direct";
  const { inRegistry, toggleRegistry } = useLists();
  const waText = encodeURIComponent(`היי, יש לי שאלה על ${p.name}`);

  const accordion = [
    { title: "על המוצר", content: <p>{p.description}</p> },
    {
      title: "פרטים טכניים",
      content: (
        <table className="spec-table"><tbody>
          <tr><th scope="row">גיל / טווח שימוש</th><td>{p.ageRange}</td></tr>
          {Object.entries(p.specs).map(([k, v]) => <tr key={k}><th scope="row">{k}</th><td>{v}</td></tr>)}
          <tr><th scope="row">חומרים</th><td>{p.materials}</td></tr>
        </tbody></table>
      ),
    },
    { title: "שימוש וניקוי", content: <p>{p.care}</p> },
    { title: "בטיחות ותקנים", content: <p>{p.safety}</p> },
    {
      title: isDirect ? "משלוחים והחזרות" : "משלוח והחזרות אצל השותף",
      content: isDirect ? (
        <p>משלוח עם שליח עד הבית תוך 3-5 ימי עסקים, או איסוף מנקודת חלוקה. משלוח חינם בהזמנה מעל {formatPrice(brand.freeShippingThreshold)}. ביטול עסקה והחזרה לפי <Link href="/policies/returns" style={{ textDecoration: "underline" }}>מדיניות ההחזרות</Link>.</p>
      ) : (
        <p>המוצר נרכש ונשלח על ידי {p.partner?.name}. תנאי המשלוח, ההחזרה והאחריות נקבעים באתר השותף. ייתכן שנקבל עמלה על רכישה דרך הקישור – בלי עלות נוספת עבורך.</p>
      ),
    },
    {
      title: "ביקורות",
      content: p.reviews.length ? (
        <ul style={{ display: "grid", gap: 16 }}>{p.reviews.map((r, i) => <li key={i}><strong>{r.author}</strong> {r.verified && <span className="badge badge--direct">רכישה מאומתת</span>}<p>{r.text}</p></li>)}</ul>
      ) : <p className="muted">עדיין אין ביקורות למוצר הזה. ביקורות יופיעו כאן רק מלקוחות שרכשו בפועל.</p>,
    },
  ];

  return (
    <div className="pdp">
      <ProductGallery p={p} />

      <div className="pdp__info">
        <div>
          <span className="pdp__brand">{p.brand}</span>
          <h1>{p.name}</h1>
        </div>
        <ProductPrice price={p.price} compareAt={p.compareAt} large />
        {isDirect && <InstallmentsNote price={p.price} />}
        {p.reviews.length === 0 && <span className="pdp__rating">עדיין אין ביקורות</span>}
        <p className="pdp__short">{p.short}</p>

        <div className={`purchase-note purchase-note--${p.purchaseType}`}>
          {isDirect ? <IconStore /> : <IconExternal />}
          <div>
            {isDirect ? (
              <><strong>נמכר ונשלח על ידינו</strong>הרכישה מתבצעת כאן באתר, והתשלום מאובטח.</>
            ) : (
              <><strong>המוצר נמכר באתר שותף: {p.partner?.name}</strong>לחיצה על הכפתור תעביר אותך לאתר חיצוני. הרכישה, התשלום והמשלוח מתבצעים שם.</>
            )}
          </div>
        </div>

        {isDirect && <ProductVariantSelector p={p} value={variantId} onChange={setVariantId} />}
        {isDirect && <div style={{ marginTop: -8 }}><SizeGuide slug={p.slug} /></div>}

        <div ref={buyRef}>
          {!p.inStock ? (
            <NotifyMe name={p.name} />
          ) : isDirect ? (
            <div className="buy-row">
              <Quantity value={qty} onChange={setQty} />
              <AddToCartButton p={p} variantId={variantId} qty={qty} disabledReason={p.variants?.length && !variantId ? "יש לבחור אפשרות" : undefined} />
              <WishButton slug={p.slug} name={p.name} className="wish-btn wish-btn--inline" />
            </div>
          ) : (
            <div className="buy-row">
              <AffiliateCTA p={p} className="btn btn--affiliate btn--block" />
              <WishButton slug={p.slug} name={p.name} className="wish-btn wish-btn--inline" />
            </div>
          )}
        </div>

        {isDirect && (
          <div className="pdp__ship">
            <DeliveryEstimate />
            <div><IconGift /> אפשר לשלוח כמתנה עם ברכה ואריזה, ישירות ליולדת</div>
            <div><IconReturn /> משלוח חינם מעל {formatPrice(brand.freeShippingThreshold)} · ביטול עד 14 יום</div>
          </div>
        )}

        <div className="pdp__tools">
          <a className="btn btn--text btn--sm" href={`https://wa.me/${brand.whatsapp}?text=${waText}`} target="_blank" rel="noopener noreferrer"><IconWhatsApp width={16} height={16} /> שאלה על המוצר</a>
          <ShareButton title={p.name} path={`/product/${p.slug}`} />
          <button className="btn btn--text btn--sm" aria-pressed={inRegistry(p.slug)} onClick={() => toggleRegistry(p.slug)}>
            <IconGift width={16} height={16} /> {inRegistry(p.slug) ? "ברשימת הלידה ✓" : "הוספה לרשימת לידה"}
          </button>
        </div>

        <ul className="benefits">
          {p.benefits.map((b) => <li key={b}><IconCheck />{b}</li>)}
        </ul>

        <Accordion items={accordion} defaultOpen={-1} />
      </div>

      {isDirect && p.inStock && <StickyAddToCart p={p} variantId={variantId} target={buyRef} />}
    </div>
  );
}
