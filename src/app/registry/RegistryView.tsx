"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useLists } from "@/context/ListsContext";
import { getProduct } from "@/lib/data";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/commerce";
import { IconGift, IconWhatsApp } from "@/components/Icons";

export function RegistryView() {
  const params = useSearchParams();
  const shared = params.get("items");
  const owner = params.get("name");
  const { registry, ready } = useLists();
  const [name, setName] = useState("");
  const [copied, setCopied] = useState(false);

  // צפייה ברשימה ששותפה (קישור מחברה)
  if (shared) {
    const items = shared.split(",").map(getProduct).filter(Boolean) as Product[];
    return (
      <>
        <header className="page-head">
          <h1 className="page-title">{owner ? `רשימת הלידה של ${owner}` : "רשימת לידה"}</h1>
          <p>אלה הדברים שהיא הכי צריכה. אפשר לבחור מוצר, לקנות אותו ולשלוח ישירות אליה כמתנה עם ברכה.</p>
        </header>
        <div className="product-grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
      </>
    );
  }

  const items = registry.map(getProduct).filter(Boolean) as Product[];
  const shareUrl = () => {
    const u = new URL("/registry", window.location.origin);
    u.searchParams.set("items", registry.join(","));
    if (name.trim()) u.searchParams.set("name", name.trim());
    return u.toString();
  };

  return (
    <>
      <header className="page-head">
        <h1 className="page-title">רשימת לידה</h1>
        <p>אוספים את מה שבאמת צריך, ושולחים קישור אחד למשפחה ולחברות. ככה מקבלים מתנות שימושיות ולא עוד דובי ענק.</p>
      </header>
      <div className="registry-hint">
        <strong>איך זה עובד</strong>
        <ol>
          <li>בעמוד של כל מוצר לוחצים על ״הוספה לרשימת לידה״.</li>
          <li>כותבים כאן את השם שיופיע ברשימה.</li>
          <li>שולחים את הקישור בוואטסאפ. מי שפותחת אותו רואה את הרשימה ויכולה לקנות ולשלוח כמתנה.</li>
        </ol>
      </div>
      {!ready ? <p className="muted">טוען…</p> : items.length ? (
        <>
          <div className="list-page__actions">
            <div className="field" style={{ minWidth: 220 }}>
              <label htmlFor="reg-name">השם שיופיע ברשימה</label>
              <input id="reg-name" className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="לדוגמה: נועה" />
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-end", flexWrap: "wrap" }}>
              <a className="btn" href="#" onClick={(e) => { e.preventDefault(); window.open(`https://wa.me/?text=${encodeURIComponent("רשימת הלידה שלי 🤍 " + shareUrl())}`, "_blank", "noopener"); }}>
                <IconWhatsApp width={18} height={18} /> שליחה בוואטסאפ
              </a>
              <button className="btn btn--secondary" onClick={async () => { try { await navigator.clipboard.writeText(shareUrl()); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch {} }}>
                {copied ? "הקישור הועתק" : "העתקת קישור"}
              </button>
            </div>
          </div>
          <div className="product-grid">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        </>
      ) : (
        <div className="empty-state">
          <IconGift />
          <h2>הרשימה עדיין ריקה</h2>
          <p>אפשר להתחיל מהמדריך ״מה באמת צריך לקנות לפני הלידה״.</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
            <Link href="/guides/before-birth-checklist" className="btn">למדריך</Link>
            <Link href="/products" className="btn btn--secondary">לחנות</Link>
          </div>
        </div>
      )}
    </>
  );
}
