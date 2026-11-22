"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { products } from "@/lib/data";
import type { AgeGroup } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { ProductImage } from "./ProductImage";

/** "איזה שלב אתן?" – כמו מחשבון מידות, רק לשלב בחיים: שבוע היריון או גיל התינוק → מה באמת צריך עכשיו */
const STAGES: { max: number; group: AgeGroup; title: string; note: string }[] = [
  { max: -1, group: "pregnancy", title: "היריון", note: "זה הזמן להתארגן: כרית הנקה, תיק לבית החולים ומשהו נעים לך." },
  { max: 6, group: "0-6m", title: "החודשים הראשונים", note: "שינה, הנקה והחתלה. כל מה שמקל על הלילות." },
  { max: 12, group: "6-12m", title: "מתחילים לאכול", note: "כלי אוכל ראשונים, נשכנים וציוד לטיולים ארוכים יותר." },
  { max: 36, group: "1-3y", title: "פעוט עצמאי", note: "תיק לגן, שק שינה במידה הבאה וכלים שהוא אוכל איתם לבד." },
];

export function StageFinder() {
  const [pregnant, setPregnant] = useState(false);
  const [months, setMonths] = useState(4);

  const stage = pregnant ? STAGES[0] : STAGES.find((s) => s.max >= 0 && months <= s.max) ?? STAGES[3];
  const picks = useMemo(
    () => products.filter((p) => p.ages.includes(stage.group) && p.inStock).sort((a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller)).slice(0, 3),
    [stage.group]
  );

  return (
    <section className="finder" aria-labelledby="finder-title">
      <div className="noise" aria-hidden="true" />
      <div className="container finder__grid">
        <div className="finder__intro">
          <h2 id="finder-title">כל שלב,<br />והדברים שלו</h2>
          <p>לא צריך לקנות הכול מראש. מזיזות את הפס לגיל של הקטנטן, <strong>ורואות רק את מה שבאמת צריך עכשיו</strong>. אפשר לחזור לכאן בכל שלב.</p>
        </div>

        <div className="finder__card">
          <div className="finder__step">
            <span className="finder__label"><span className="finder__num">1</span> איפה אתן עכשיו?</span>
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className={`size-chip${pregnant ? " is-added" : ""}`} aria-pressed={pregnant} onClick={() => setPregnant(true)} style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>בהיריון</button>
              <button type="button" className={`size-chip${!pregnant ? " is-added" : ""}`} aria-pressed={!pregnant} onClick={() => setPregnant(false)} style={{ fontFamily: "var(--font-sans)", fontSize: 14 }}>התינוק כבר כאן</button>
            </div>
          </div>

          {!pregnant && (
            <div className="finder__step">
              <label className="finder__label" htmlFor="finder-age">
                <span className="finder__num">2</span> בן או בת כמה?
                <span className="finder__value" aria-hidden="true">{months < 12 ? `${months}m` : `${(months / 12).toFixed(months % 12 ? 1 : 0)}y`}</span>
              </label>
              <input
                id="finder-age" type="range" min={0} max={36} value={months} onChange={(e) => setMonths(Number(e.target.value))}
                aria-valuetext={months < 12 ? `${months} חודשים` : `${Math.floor(months / 12)} שנים ו-${months % 12} חודשים`}
              />
            </div>
          )}

          <div className="finder__result" aria-live="polite">
            <span className="mono" lang="en" aria-hidden="true" style={{ color: "var(--grey)" }}>Recommended stage</span>
            <span className="finder__stage">{stage.title}</span>
            <p style={{ fontSize: 14.5 }}>{stage.note}</p>
            <div className="finder__picks">
              {picks.map((p) => (
                <Link key={p.id} href={`/product/${p.slug}`} className="finder__pick">
                  <div className="ph-wrap"><ProductImage tone={p.tone} shape={p.shape} src={p.images?.[0]} alt="" sizes="140px" /></div>
                  <span>{p.name}</span>
                  <strong>{formatPrice(p.price)}</strong>
                </Link>
              ))}
            </div>
            <Link href={`/products?age=${stage.group}`} className="text-link">לכל המוצרים לשלב הזה</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
