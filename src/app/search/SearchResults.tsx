"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { categories, searchProducts } from "@/lib/data";
import { ProductListing } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/ui";
import { IconSearch } from "@/components/Icons";

export function SearchResults() {
  const params = useSearchParams();
  const router = useRouter();
  const q = params.get("q") ?? "";
  const [value, setValue] = useState(q);
  useEffect(() => setValue(q), [q]);
  const results = searchProducts(q);

  return (
    <>
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "חיפוש" }]} />
      <header className="page-head">
        <h1 className="page-title">{q ? <>תוצאות עבור ״{q}״</> : "חיפוש"}</h1>
        <form role="search" onSubmit={(e) => { e.preventDefault(); router.push(`/search?q=${encodeURIComponent(value.trim())}`); }} style={{ maxWidth: 560, marginTop: 16 }}>
          <div className="search__field">
            <IconSearch />
            <label htmlFor="search-page-input" className="visually-hidden">חיפוש</label>
            <input id="search-page-input" type="search" value={value} onChange={(e) => setValue(e.target.value)} placeholder="מה מחפשות?" />
          </div>
        </form>
      </header>
      {q && results.length > 0 && <ProductListing products={results} />}
      {q && results.length === 0 && (
        <div className="empty-state">
          <IconSearch />
          <h2>לא מצאנו תוצאות עבור ״{q}״</h2>
          <p>כדאי לבדוק את האיות, לנסות מילה כללית יותר, או להתחיל מקטגוריה:</p>
          <div className="search__suggest" style={{ justifyContent: "center" }}>
            {categories.map((c) => <Link key={c.slug} className="chip" href={`/category/${c.slug}`}>{c.name}</Link>)}
          </div>
        </div>
      )}
    </>
  );
}
