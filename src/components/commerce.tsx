"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { discountPercent, formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "./ProductImage";
import { IconExternal, IconPlus, IconStore } from "./Icons";
import { WishButton } from "./extras";

/* ---------- ProductPrice ---------- */
export function ProductPrice({ price, compareAt, large }: { price: number; compareAt?: number; large?: boolean }) {
  const off = discountPercent(price, compareAt);
  return (
    <span className={`price${large ? " price--lg" : ""}`}>
      <span className={`price__now${off ? " price__now--sale" : ""}`}>{formatPrice(price)}</span>
      {off > 0 && (
        <>
          <span className="price__was"><span className="visually-hidden">מחיר קודם: </span>{formatPrice(compareAt!)}</span>
        </>
      )}
    </span>
  );
}

/* ---------- Purchase type label ---------- */
export function PurchaseTypeLabel({ p }: { p: Product }) {
  return p.purchaseType === "direct" ? (
    <span className="product-card__type"><IconStore /> נמכר ונשלח על ידינו</span>
  ) : (
    <span className="product-card__type product-card__type--affiliate"><IconExternal /> נרכש באתר שותף</span>
  );
}

/* ---------- AddToCartButton ---------- */
export function AddToCartButton({
  p, variantId, qty = 1, className = "btn", label = "הוספה לסל", disabledReason,
}: { p: Product; variantId?: string; qty?: number; className?: string; label?: string; disabledReason?: string }) {
  const { add } = useCart();
  const [loading, setLoading] = useState(false);
  if (!p.inStock) return <button className={className} disabled aria-disabled="true">אזל מהמלאי</button>;
  return (
    <button
      className={className}
      aria-disabled={!!disabledReason}
      title={disabledReason}
      onClick={() => {
        if (disabledReason) return;
        setLoading(true);
        // השהיה קצרה כדי לתת משוב (Loading state) – בחיבור ל-API אמיתי זו תהיה הבקשה עצמה
        window.setTimeout(() => { add(p.slug, variantId, qty); setLoading(false); }, 350);
      }}
    >
      {loading ? <><span className="spinner" aria-hidden="true" /> מוסיפה...</> : label}
    </button>
  );
}

/* ---------- AffiliateCTA ---------- */
export function AffiliateCTA({ p, className = "btn btn--affiliate" }: { p: Product; className?: string }) {
  if (!p.partner) return null;
  if (!p.inStock) return <button className={className} disabled>לא זמין כרגע אצל השותף</button>;
  return (
    <a className={className} href={p.partner.url} target="_blank" rel="sponsored noopener noreferrer">
      לרכישה באתר השותף <IconExternal width={16} height={16} />
      <span className="visually-hidden">(נפתח בחלון חדש)</span>
    </a>
  );
}

/* ---------- ProductCard ---------- */
function CardActions({ p }: { p: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState<string | null>(null);
  const flash = (id: string) => { setAdded(id); window.setTimeout(() => setAdded(null), 1400); };

  if (!p.inStock) return <p className="card-actions__note">אזל זמנית, אפשר להירשם לעדכון בעמוד המוצר</p>;

  if (p.purchaseType === "affiliate" && p.partner) {
    return (
      <div className="card-actions">
        <a className="card-btn" href={p.partner.url} target="_blank" rel="sponsored noopener noreferrer">
          לרכישה באתר השותף <IconExternal /><span className="visually-hidden">(חלון חדש)</span>
        </a>
      </div>
    );
  }

  if (p.variants && p.variants.length > 1) {
    return (
      <div className="card-actions">
        <div className="size-chips" role="group" aria-label={`${p.variantLabel} – לחיצה מוסיפה לסל`}>
          {p.variants.map((v) => (
            <button
              key={v.id} type="button" className={`size-chip${added === v.id ? " is-added" : ""}`}
              disabled={!v.inStock} onClick={() => { add(p.slug, v.id); flash(v.id); }}
              aria-label={`הוספת ${p.name}, ${p.variantLabel} ${v.label}, לסל`}
            >
              {added === v.id ? "✓" : v.label}
            </button>
          ))}
        </div>
        <span className="card-actions__note">בחירת {p.variantLabel} מוסיפה לסל</span>
      </div>
    );
  }

  return (
    <div className="card-actions">
      <button type="button" className={`card-btn${added ? " is-added" : ""}`} onClick={() => { add(p.slug, p.variants?.[0]?.id); flash("one"); }}>
        {added ? "נוסף לסל ✓" : <><IconPlus /> הוספה לסל</>}
      </button>
    </div>
  );
}

export function ProductCard({ p, note, priority, index }: { p: Product; note?: string; priority?: boolean; index?: number }) {
  const off = discountPercent(p.price, p.compareAt);
  return (
    <article className="product-card">
      <div className="product-card__media">
        <div className="product-card__badges">
          {off > 0 && <span className="badge badge--sale"><span aria-hidden="true">-{off}%</span><span className="visually-hidden">{off}% הנחה</span></span>}
          {p.badge === "חדש" && <span className="badge badge--new" lang="en">NEW</span>}
          {!off && p.badge !== "חדש" && index !== undefined && <span className="badge" aria-hidden="true">Nº{String(index + 1).padStart(2, "0")}</span>}
          {!p.inStock && <span className="badge"><span lang="en" aria-hidden="true">SOLD OUT</span><span className="visually-hidden">אזל מהמלאי</span></span>}
        </div>
        <ProductImage tone={p.tone} shape={p.shape} src={p.images?.[0]} hoverSrc={p.images?.[1]} alt={p.name} priority={priority} />
        <WishButton slug={p.slug} name={p.name} />
      </div>
      <div className="product-card__body">
        <div className="product-card__top">
          <h3 className="product-card__name"><Link href={`/product/${p.slug}`}>{p.name}</Link></h3>
          <ProductPrice price={p.price} compareAt={p.compareAt} />
        </div>
        <PurchaseTypeLabel p={p} />
        {note && <p className="pick-note">״{note}״</p>}
        <CardActions p={p} />
      </div>
    </article>
  );
}
