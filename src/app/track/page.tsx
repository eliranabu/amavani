"use client";

import { useState } from "react";
import { Breadcrumbs } from "@/components/ui";
import { IconAlert } from "@/components/Icons";

export default function TrackPage() {
  const [result, setResult] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "מעקב הזמנה" }]} />
      <header className="page-head"><h1 className="page-title">איפה ההזמנה שלי?</h1><p>מספר ההזמנה מופיע במייל אישור ההזמנה.</p></header>
      <form style={{ maxWidth: 480 }} className="form-grid" noValidate onSubmit={(e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const no = String(fd.get("order")).replace("#", "").trim();
        if (!/^\d{4,}$/.test(no) || !/^0\d{8,9}$/.test(String(fd.get("phone")).replace(/\D/g, ""))) { setErr("צריך מספר הזמנה (ספרות בלבד) ומספר טלפון תקין"); setResult(null); return; }
        setErr(null);
        // TODO: חיבור ל-API של חברת השילוח (צ'יטה / HFD / דואר ישראל)
        setResult(`הזמנה #${no} נקלטה ונמצאת בהכנה למשלוח. מספר מעקב יישלח ב-SMS כשהחבילה תצא.`);
      }}>
        <div className="field"><label htmlFor="order">מספר הזמנה</label><input id="order" name="order" className="input" inputMode="numeric" /></div>
        <div className="field"><label htmlFor="phone">טלפון שהוזן בהזמנה</label><input id="phone" name="phone" className="input" type="tel" dir="ltr" style={{ textAlign: "right" }} /></div>
        {err && <p className="field-error"><IconAlert />{err}</p>}
        <button className="btn" type="submit" style={{ justifySelf: "start" }}>בדיקת סטטוס</button>
      </form>
      {result && <p role="status" className="notify-ok" style={{ maxWidth: 480, marginTop: 24 }}>{result}<br /><span className="muted" style={{ fontWeight: 400 }}>[דמו – הסטטוס אינו אמיתי]</span></p>}
    </div>
  );
}
