"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/format";
import { IconCheck } from "@/components/Icons";

export default function SuccessPage() {
  const [order, setOrder] = useState<{ orderNo: string; email: string; total: number; name: string; eta?: { from: string; to: string }; method?: string; gift?: boolean } | null>(null);
  useEffect(() => {
    try { const raw = sessionStorage.getItem("last-order"); if (raw) setOrder(JSON.parse(raw)); } catch {}
  }, []);

  return (
    <div className="container">
      <div className="success">
        <div className="success__icon"><IconCheck /></div>
        <h1 className="page-title">{order?.name ? `תודה, ${order.name}!` : "תודה!"} ההזמנה התקבלה</h1>
        {order && <p className="muted">מספר הזמנה <strong style={{ color: "var(--color-text)" }}>#{order.orderNo}</strong> · סה״כ {formatPrice(order.total)}</p>}
        <p>שלחנו אישור הזמנה {order?.email ? <>ל-<span dir="ltr">{order.email}</span></> : "למייל שלך"}. כשהחבילה תצא לדרך, נשלח גם מספר מעקב.</p>
        {order?.eta && <p><strong>{order.method}:</strong> צפוי להגיע בין {order.eta.from} ל{order.eta.to}.{order.gift ? " החבילה תישלח כמתנה, בלי מחירים." : ""}</p>}
        <p className="muted" style={{ fontSize: 14 }}>אפשר לעקוב אחרי ההזמנה בעמוד <Link href="/track" style={{ textDecoration: "underline" }}>מעקב הזמנה</Link>. לביטול – עד 14 יום מקבלת המוצר.</p>
        <p className="demo-note">[MVP] זו הזמנת דמו – לא בוצע חיוב ולא נשלח מייל.</p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/" className="btn">חזרה לחנות</Link>
          <Link href="/guides" className="btn btn--secondary">למדריכים</Link>
        </div>
      </div>
    </div>
  );
}
