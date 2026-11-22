"use client";

import { useCallback, useMemo, useState } from "react";
import type { AgeGroup, Product } from "@/lib/types";
import { ageLabels } from "@/lib/data";
import { ProductCard } from "./commerce";
import { IconClose, IconFilter, IconSearch } from "./Icons";
import { useDialog } from "./ui";

type Sort = "featured" | "price-asc" | "price-desc" | "discount";

interface Filters {
  ages: AgeGroup[];
  brands: string[];
  types: string[];
  purchase: ("direct" | "affiliate")[];
  inStockOnly: boolean;
  maxPrice: number | null;
}
const EMPTY: Filters = { ages: [], brands: [], types: [], purchase: [], inStockOnly: false, maxPrice: null };
const PRICE_STEPS = [100, 200, 300];

export function ProductListing({ products, emptyText = "לא נמצאו מוצרים", initialAges = [] }: { products: Product[]; emptyText?: string; initialAges?: AgeGroup[] }) {
  const [filters, setFilters] = useState<Filters>({ ...EMPTY, ages: initialAges });
  const [draft, setDraft] = useState<Filters>(EMPTY);
  const [sort, setSort] = useState<Sort>("featured");
  const [sheetOpen, setSheetOpen] = useState(false);
  const closeSheet = useCallback(() => setSheetOpen(false), []);
  const sheetRef = useDialog(sheetOpen, closeSheet);

  const options = useMemo(() => ({
    ages: (Object.keys(ageLabels) as AgeGroup[]).filter((a) => products.some((p) => p.ages.includes(a))),
    brands: Array.from(new Set(products.map((p) => p.brand))),
    types: Array.from(new Set(products.map((p) => p.productType))),
  }), [products]);

  const apply = (f: Filters) => products.filter((p) =>
    (!f.ages.length || f.ages.some((a) => p.ages.includes(a))) &&
    (!f.brands.length || f.brands.includes(p.brand)) &&
    (!f.types.length || f.types.includes(p.productType)) &&
    (!f.purchase.length || f.purchase.includes(p.purchaseType)) &&
    (!f.inStockOnly || p.inStock) &&
    (f.maxPrice === null || p.price <= f.maxPrice)
  );

  const result = useMemo(() => {
    const r = apply(filters);
    const sorted = [...r];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "discount") sorted.sort((a, b) => ((b.compareAt ?? b.price) - b.price) / (b.compareAt ?? b.price) - ((a.compareAt ?? a.price) - a.price) / (a.compareAt ?? a.price));
    return sorted;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, sort, products]);

  const activeCount = filters.ages.length + filters.brands.length + filters.types.length + filters.purchase.length + (filters.inStockOnly ? 1 : 0) + (filters.maxPrice ? 1 : 0);

  return (
    <div className="listing">
      <aside className="filters-desktop" aria-label="סינון מוצרים">
        <FilterControls f={filters} setF={setFilters} options={options} />
        {activeCount > 0 && <button className="btn btn--text" onClick={() => setFilters(EMPTY)} style={{ marginTop: 8 }}>ניקוי כל הסינונים</button>}
      </aside>

      <div>
        <div className="listing__bar">
          <button className="btn btn--secondary btn--sm filters-mobile-btn" onClick={() => { setDraft(filters); setSheetOpen(true); }}>
            <IconFilter /> סינון{activeCount ? ` (${activeCount})` : ""}
          </button>
          <span className="listing__count" aria-live="polite">{result.length} מוצרים</span>
          <label className="visually-hidden" htmlFor="sort">מיון</label>
          <select id="sort" className="select" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
            <option value="featured">מומלצים</option>
            <option value="price-asc">מחיר: מהנמוך לגבוה</option>
            <option value="price-desc">מחיר: מהגבוה לנמוך</option>
            <option value="discount">ההנחה הגדולה ביותר</option>
          </select>
        </div>

        {activeCount > 0 && (
          <div className="active-filters">
            {filters.ages.map((a) => <Chip key={a} label={ageLabels[a]} onRemove={() => setFilters({ ...filters, ages: filters.ages.filter((x) => x !== a) })} />)}
            {filters.types.map((t) => <Chip key={t} label={t} onRemove={() => setFilters({ ...filters, types: filters.types.filter((x) => x !== t) })} />)}
            {filters.brands.map((b) => <Chip key={b} label={b} onRemove={() => setFilters({ ...filters, brands: filters.brands.filter((x) => x !== b) })} />)}
            {filters.purchase.map((b) => <Chip key={b} label={b === "direct" ? "רכישה ישירה" : "אתר שותף"} onRemove={() => setFilters({ ...filters, purchase: filters.purchase.filter((x) => x !== b) })} />)}
            {filters.maxPrice && <Chip label={`עד ₪${filters.maxPrice}`} onRemove={() => setFilters({ ...filters, maxPrice: null })} />}
            {filters.inStockOnly && <Chip label="במלאי בלבד" onRemove={() => setFilters({ ...filters, inStockOnly: false })} />}
          </div>
        )}

        {result.length ? (
          <div className="product-grid product-grid--3">
            {result.map((p, i) => <ProductCard key={p.id} p={p} priority={i < 2} />)}
          </div>
        ) : (
          <div className="empty-state">
            <IconSearch />
            <h2>{emptyText}</h2>
            <p>אפשר לנסות להסיר חלק מהסינונים.</p>
            {activeCount > 0 && <button className="btn btn--secondary" onClick={() => setFilters(EMPTY)}>ניקוי סינונים</button>}
          </div>
        )}
      </div>

      {/* Mobile filter sheet */}
      <div className={`overlay${sheetOpen ? " is-open" : ""}`} onClick={closeSheet} aria-hidden="true" />
      <div ref={sheetRef} className={`sheet${sheetOpen ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="סינון" aria-hidden={!sheetOpen} inert={!sheetOpen}>
        <div className="drawer__head">
          <h2>סינון</h2>
          <button className="icon-btn" onClick={closeSheet} aria-label="סגירה"><IconClose /></button>
        </div>
        <div className="drawer__body"><FilterControls f={draft} setF={setDraft} options={options} /></div>
        <div className="sheet__foot">
          <button className="btn btn--secondary" onClick={() => setDraft(EMPTY)}>איפוס</button>
          <button className="btn" onClick={() => { setFilters(draft); closeSheet(); }}>הצגת {apply(draft).length} תוצאות</button>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <button className="chip" onClick={onRemove} aria-label={`הסרת סינון ${label}`}>
      {label} <IconClose width={14} height={14} />
    </button>
  );
}

function toggle<T>(arr: T[], v: T) { return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]; }

function FilterControls({ f, setF, options }: { f: Filters; setF: (f: Filters) => void; options: { ages: AgeGroup[]; brands: string[]; types: string[] } }) {
  return (
    <>
      <div className="filter-group">
        <h3>מחיר</h3>
        <div className="search__suggest" style={{ marginTop: 0 }}>
          {PRICE_STEPS.map((s) => (
            <button key={s} className="chip" aria-pressed={f.maxPrice === s} onClick={() => setF({ ...f, maxPrice: f.maxPrice === s ? null : s })}>עד ₪{s}</button>
          ))}
        </div>
      </div>
      {options.ages.length > 1 && (
        <fieldset className="filter-group" style={{ border: 0, margin: 0, padding: "16px 0", borderBottom: "1px solid var(--color-border)" }}>
          <legend className="visually-hidden">גיל</legend>
          <h3 aria-hidden="true">גיל</h3>
          {options.ages.map((a) => (
            <label key={a} className="checkbox"><input type="checkbox" checked={f.ages.includes(a)} onChange={() => setF({ ...f, ages: toggle(f.ages, a) })} />{ageLabels[a]}</label>
          ))}
        </fieldset>
      )}
      {options.types.length > 1 && (
        <div className="filter-group">
          <h3>סוג מוצר</h3>
          {options.types.map((t) => (
            <label key={t} className="checkbox"><input type="checkbox" checked={f.types.includes(t)} onChange={() => setF({ ...f, types: toggle(f.types, t) })} />{t}</label>
          ))}
        </div>
      )}
      {options.brands.length > 1 && (
        <div className="filter-group">
          <h3>מותג</h3>
          {options.brands.map((b) => (
            <label key={b} className="checkbox"><input type="checkbox" checked={f.brands.includes(b)} onChange={() => setF({ ...f, brands: toggle(f.brands, b) })} />{b}</label>
          ))}
        </div>
      )}
      <div className="filter-group">
        <h3>אופן רכישה</h3>
        <label className="checkbox"><input type="checkbox" checked={f.purchase.includes("direct")} onChange={() => setF({ ...f, purchase: toggle(f.purchase, "direct") })} />רכישה ישירה באתר</label>
        <label className="checkbox"><input type="checkbox" checked={f.purchase.includes("affiliate")} onChange={() => setF({ ...f, purchase: toggle(f.purchase, "affiliate") })} />רכישה באתר שותף</label>
      </div>
      <div className="filter-group" style={{ borderBottom: 0 }}>
        <h3>זמינות</h3>
        <label className="checkbox"><input type="checkbox" checked={f.inStockOnly} onChange={() => setF({ ...f, inStockOnly: !f.inStockOnly })} />במלאי בלבד</label>
      </div>
    </>
  );
}
