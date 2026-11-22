"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/brand";
import { getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useCart, type CartLine } from "@/context/CartContext";
import { ProductImage } from "./ProductImage";
import { IconBag, IconClose, IconLock } from "./Icons";
import { Quantity, useDialog } from "./ui";
import { CartUpsell, PaymentMethods } from "./extras";

export function CartItem({ line }: { line: CartLine }) {
  const { setQty, remove } = useCart();
  const p = getProduct(line.slug);
  if (!p) return null;
  const variant = p.variants?.find((v) => v.id === line.variantId);
  return (
    <div className="cart-item">
      <Link href={`/product/${p.slug}`} className="cart-item__media" tabIndex={-1} aria-hidden="true">
        <ProductImage tone={p.tone} shape={p.shape} src={p.images?.[0]} alt="" />
      </Link>
      <div>
        <div className="cart-item__top">
          <div>
            <Link href={`/product/${p.slug}`} className="cart-item__name">{p.name}</Link>
            {variant && <div className="cart-item__variant">{p.variantLabel}: {variant.label}</div>}
          </div>
          <strong style={{ fontWeight: 600, whiteSpace: "nowrap" }}>{formatPrice(p.price * line.qty)}</strong>
        </div>
        <div className="cart-item__bottom">
          <Quantity small value={line.qty} onChange={(n) => setQty(line.key, n)} label={`כמות עבור ${p.name}`} />
          <button className="cart-item__remove" onClick={() => remove(line.key)}>הסרה<span className="visually-hidden"> של {p.name}</span></button>
        </div>
      </div>
    </div>
  );
}

export function ShippingProgress() {
  const { freeShippingLeft, subtotal, discount } = useCart();
  const pct = Math.min(100, ((subtotal - discount) / brand.freeShippingThreshold) * 100);
  return (
    <div className="ship-progress">
      {freeShippingLeft > 0 ? (
        <>עוד <strong>{formatPrice(freeShippingLeft)}</strong> למשלוח חינם</>
      ) : (
        <strong style={{ color: "var(--color-success)" }}>ההזמנה שלך זכאית למשלוח חינם</strong>
      )}
      <div className="ship-progress__bar" aria-hidden="true"><span style={{ width: `${pct}%` }} /></div>
    </div>
  );
}

export function CartDrawer() {
  const { isOpen, close, lines, subtotal, discount } = useCart();
  const ref = useDialog(isOpen, close);

  return (
    <>
      <div className={`overlay${isOpen ? " is-open" : ""}`} onClick={close} aria-hidden="true" />
      <div ref={ref} className={`drawer drawer--end${isOpen ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="cart-title" aria-hidden={!isOpen} inert={!isOpen}>
        <div className="drawer__head">
          <h2 id="cart-title">הסל שלי</h2>
          <button className="icon-btn" onClick={close} aria-label="סגירת הסל"><IconClose /></button>
        </div>

        {lines.length === 0 ? (
          <div className="drawer__body">
            <div className="empty-state">
              <IconBag />
              <h2>הסל עדיין ריק</h2>
              <p>כדאי להתחיל מהמוצרים האהובים עלינו.</p>
              <Link href="/products" className="btn" onClick={close}>לכל המוצרים</Link>
            </div>
          </div>
        ) : (
          <>
            <div className="drawer__body">
              <ShippingProgress />
              {lines.map((l) => <CartItem key={l.key} line={l} />)}
              <CartUpsell />
              <p className="muted" style={{ fontSize: 12.5, marginTop: 16 }}>
                הסל כולל מוצרים שנמכרים ונשלחים ישירות מאיתנו. מוצרים של אתרי שותפים נרכשים באתר השותף.
              </p>
            </div>
            <div className="drawer__foot" style={{ display: "grid", gap: 12 }}>
              <div className="summary-row"><span>סכום ביניים</span><strong>{formatPrice(subtotal)}</strong></div>
              {discount > 0 && <div className="summary-row summary-row--discount"><span>הנחת קופון</span><span>‎-{formatPrice(discount)}</span></div>}
              <p className="muted" style={{ fontSize: 13 }}>עלות המשלוח תחושב בשלב הבא.</p>
              <Link href="/checkout" className="btn btn--block" onClick={close}><IconLock width={16} height={16} /> מעבר לתשלום</Link>
              <PaymentMethods compact />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <button className="btn btn--text" onClick={close}>המשך קנייה</button>
                <Link href="/cart" className="btn btn--text" onClick={close}>לצפייה בסל המלא</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export function Toast() {
  const { toast } = useCart();
  if (!toast) return null;
  return <div className="toast" role="status">{toast}</div>;
}

export function CouponField() {
  const { coupon, applyCoupon, removeCoupon } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState<{ ok: boolean; message: string } | null>(null);

  if (coupon) {
    return (
      <div className="summary-row" style={{ alignItems: "center" }}>
        <span>קופון <strong>{coupon}</strong> הופעל</span>
        <button className="btn btn--text btn--sm" onClick={() => { removeCoupon(); setMsg(null); }}>הסרה</button>
      </div>
    );
  }
  return (
    <form onSubmit={(e) => { e.preventDefault(); setMsg(applyCoupon(code)); }}>
      <label htmlFor="coupon" className="visually-hidden">קוד קופון</label>
      <div className="coupon-field">
        <input
          id="coupon" className="input" placeholder="קוד קופון" value={code}
          onChange={(e) => setCode(e.target.value)} aria-invalid={msg ? !msg.ok : undefined}
          aria-describedby={msg ? "coupon-msg" : undefined}
        />
        <button className="btn btn--secondary" type="submit">החלה</button>
      </div>
      {msg && <p id="coupon-msg" className={`coupon-msg ${msg.ok ? "coupon-msg--ok" : "coupon-msg--err"}`} role="status">{msg.message}</p>}
    </form>
  );
}
