import type { Metadata } from "next";
import { Suspense } from "react";
import { products } from "@/lib/data";
import { ProductsView } from "./ProductsView";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "כל המוצרים" };

export default function AllProducts() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "כל המוצרים" }]} />
      <header className="listing-hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <h1>החנות</h1>
          <p style={{ marginTop: 16 }}>{products.length} מוצרים שבחרנו לאמא, לתינוק ולפעוט. כל אחד מהם עבר אצלנו בבית.</p>
        </div>
      </header>
      <Suspense fallback={<p className="muted">טוען מוצרים…</p>}>
        <ProductsView />
      </Suspense>
    </div>
  );
}
