"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "@/lib/types";
import { ProductImage } from "./ProductImage";

/** רשימת קטגוריות טיפוגרפית; בדסקטופ התמונה מתחלפת לפי השורה שמעליה העכבר/פוקוס */
export function CategoryIndex({ categories, counts }: { categories: Category[]; counts: Record<string, number> }) {
  const [active, setActive] = useState(categories[0].slug);
  return (
    <>
      <div className="cat-index">
        <ul className="cat-index__list">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/category/${c.slug}`} className="cat-index__item"
                onMouseEnter={() => setActive(c.slug)} onFocus={() => setActive(c.slug)}
              >
                <span className="cat-index__name">{c.name}</span>
                <span className="cat-index__meta">{c.description}<br />{counts[c.slug] ?? 0} מוצרים</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="cat-index__preview" aria-hidden="true">
          {categories.map((c) => (
            <div key={c.slug} className={`cat-index__slide${active === c.slug ? " is-active" : ""}`}>
              <ProductImage tone={c.tone} shape={c.shape} src={c.image} alt="" sizes="34vw" />
            </div>
          ))}
        </div>
      </div>
      <div className="cat-index__rail" aria-label="קטגוריות בתמונות">
        {categories.map((c) => (
          <Link key={c.slug} href={`/category/${c.slug}`} tabIndex={-1} aria-hidden="true">
            <div className="cat-index__railimg"><ProductImage tone={c.tone} shape={c.shape} src={c.image} alt="" sizes="62vw" /></div>
            <span>{c.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
