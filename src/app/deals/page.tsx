import type { Metadata } from "next";
import { coupons, dealProducts } from "@/lib/data";
import { ProductListing } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "מבצעים וקופונים" };

export default function DealsPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "מבצעים" }]} />
      <header className="page-head">
        <h1 className="page-title">מבצעים וקופונים</h1>
        <p>מחיר קודם מוצג רק כשהמוצר נמכר בו בפועל. בלי טיימרים ובלי ״נשארו 2 במלאי״.</p>
      </header>
      <div className="coupon-tiles" style={{ marginBottom: 40 }}>
        {Object.entries(coupons).map(([code, c]) => (
          <div className="coupon-tile" key={code}>
            <div><code>{code}</code><p>{c.label} · לרכישה ישירה באתר</p></div>
          </div>
        ))}
      </div>
      <ProductListing products={dealProducts()} emptyText="אין מבצעים פעילים כרגע" />
    </div>
  );
}
