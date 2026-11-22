"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { CartItem, CouponField, ShippingProgress } from "@/components/CartDrawer";
import { Breadcrumbs } from "@/components/ui";
import { CartUpsell, DeliveryEstimate, PaymentMethods } from "@/components/extras";
import { IconBag, IconLock } from "@/components/Icons";

export default function CartPage() {
  const { lines, subtotal, discount, freeShippingLeft, ready } = useCart();

  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "סל קניות" }]} />
      <h1 className="page-title" style={{ marginTop: 24 }}>סל הקניות</h1>

      {!ready ? <p className="muted">טוען…</p> : lines.length === 0 ? (
        <div className="empty-state">
          <IconBag />
          <h2>הסל עדיין ריק</h2>
          <p>כל מה שתוסיפי יחכה לך כאן.</p>
          <Link href="/products" className="btn">לכל המוצרים</Link>
        </div>
      ) : (
        <div className="cart-page">
          <div>
            <ShippingProgress />
            {lines.map((l) => <CartItem key={l.key} line={l} />)}
            <CartUpsell />
            <Link href="/products" className="btn btn--text" style={{ marginTop: 16 }}>המשך קנייה</Link>
          </div>
          <aside className="summary-card" aria-labelledby="sum-title">
            <h2 id="sum-title">סיכום הזמנה</h2>
            <CouponField />
            <div className="summary-row"><span>סכום ביניים</span><span>{formatPrice(subtotal)}</span></div>
            {discount > 0 && <div className="summary-row summary-row--discount"><span>הנחת קופון</span><span>‎-{formatPrice(discount)}</span></div>}
            <div className="summary-row"><span>משלוח</span><span>{freeShippingLeft === 0 ? "חינם" : "החל מ-₪19.90"}</span></div>
            <div className="summary-row summary-row--total"><span>סה״כ (לפני משלוח)</span><span>{formatPrice(subtotal - discount)}</span></div>
            <p className="muted" style={{ fontSize: 13 }}>המחירים כוללים מע״מ. עלות המשלוח הסופית תוצג לפי שיטת המשלוח שתבחרי.</p>
            <Link href="/checkout" className="btn btn--block"><IconLock width={16} height={16} /> מעבר לתשלום</Link>
            <div className="pdp__ship"><DeliveryEstimate /></div>
            <PaymentMethods compact />
            <div className="secure-note"><IconLock /> תשלום מאובטח, אפשר לרכוש כאורחת</div>
          </aside>
        </div>
      )}
    </div>
  );
}
