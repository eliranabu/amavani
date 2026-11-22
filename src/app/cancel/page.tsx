"use client";

import Link from "next/link";
import { useState } from "react";
import { brand } from "@/lib/brand";
import { Breadcrumbs } from "@/components/ui";
import { IconAlert } from "@/components/Icons";

export default function CancelPage() {
  const [sent, setSent] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "ביטול עסקה" }]} />
      <header className="page-head">
        <h1 className="page-title">ביטול עסקה</h1>
        <p>אפשר לבטל רכישה בתוך 14 יום מקבלת המוצר. ממלאים את הטופס, ואנחנו חוזרות אלייך עם הוראות ההחזרה.</p>
      </header>
      {sent ? (
        <p role="status" className="notify-ok" style={{ maxWidth: 560 }}>בקשת הביטול התקבלה. אישור נשלח למייל, ונחזור אלייך תוך יום עסקים. [דמו]</p>
      ) : (
        <form className="form-grid" style={{ maxWidth: 560 }} noValidate onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          if (!String(fd.get("name")).trim() || !String(fd.get("order")).trim() || !/^\S+@\S+\.\S+$/.test(String(fd.get("email")))) { setErr("יש למלא שם, מספר הזמנה ומייל תקין"); return; }
          // TODO: שליחה לשרת + מייל אישור
          setSent(true);
        }}>
          <div className="form-grid form-grid--2">
            <div className="field"><label htmlFor="name">שם מלא</label><input id="name" name="name" className="input" /></div>
            <div className="field"><label htmlFor="order">מספר הזמנה</label><input id="order" name="order" className="input" inputMode="numeric" /></div>
          </div>
          <div className="form-grid form-grid--2">
            <div className="field"><label htmlFor="email">מייל</label><input id="email" name="email" className="input" type="email" dir="ltr" style={{ textAlign: "right" }} /></div>
            <div className="field"><label htmlFor="phone">טלפון</label><input id="phone" name="phone" className="input" type="tel" dir="ltr" style={{ textAlign: "right" }} /></div>
          </div>
          <div className="field"><label htmlFor="reason">סיבת הביטול <span className="muted">(רשות)</span></label><textarea id="reason" name="reason" className="input" /></div>
          {err && <p className="field-error"><IconAlert />{err}</p>}
          <button className="btn" type="submit" style={{ justifySelf: "start" }}>שליחת בקשת ביטול</button>
        </form>
      )}
      <p className="muted" style={{ marginTop: 32, maxWidth: 560, fontSize: 14 }}>
        אפשר לבטל גם בטלפון {brand.phone} או במייל {brand.email}. פרטים מלאים ב<Link href="/policies/returns" style={{ textDecoration: "underline" }}>מדיניות הביטולים</Link>.
      </p>
    </div>
  );
}
