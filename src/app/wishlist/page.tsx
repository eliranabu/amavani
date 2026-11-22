"use client";

import Link from "next/link";
import { useLists } from "@/context/ListsContext";
import { getProduct } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/commerce";
import { Breadcrumbs } from "@/components/ui";
import { IconHeart } from "@/components/Icons";

export default function WishlistPage() {
  const { wishlist, ready } = useLists();
  const items = wishlist.map(getProduct).filter(Boolean) as Product[];
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "מועדפים" }]} />
      <header className="page-head"><h1 className="page-title">המועדפים שלי</h1><p>המוצרים שסימנת בלב נשמרים כאן, בדפדפן הזה.</p></header>
      {!ready ? <p className="muted">טוען…</p> : items.length ? (
        <div className="product-grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      ) : (
        <div className="empty-state">
          <IconHeart />
          <h2>עוד לא שמרת מוצרים</h2>
          <p>לחיצה על הלב בכל מוצר שומרת אותו כאן, כדי לחזור אליו אחר כך.</p>
          <Link href="/products" className="btn">לחנות</Link>
        </div>
      )}
    </div>
  );
}
