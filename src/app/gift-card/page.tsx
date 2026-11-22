"use client";

import { useState } from "react";
import { brand } from "@/lib/brand";
import { formatPrice } from "@/lib/format";
import { Breadcrumbs } from "@/components/ui";
import { ProductImage } from "@/components/ProductImage";

const AMOUNTS = [100, 200, 300, 500];

export default function GiftCardPage() {
  const [amount, setAmount] = useState(200);
  const [sent, setSent] = useState(false);
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "כרטיס מתנה" }]} />
      <div className="pdp">
        <div className="gallery__main" style={{ cursor: "default" }}>
          <ProductImage tone="sand" shape="stack" src="/images/cat-gifts.jpg" alt="כרטיס מתנה" priority sizes="(min-width:1024px) 50vw, 100vw" />
        </div>
        <div className="pdp__info" style={{ position: "static" }}>
          <h1>כרטיס מתנה דיגיטלי</h1>
          <p className="pdp__short">כשלא בטוחים מה היא צריכה – שתבחר בעצמה. נשלח במייל או בוואטסאפ, עם ברכה אישית. תקף ל-5 שנים.</p>
          <fieldset className="variant-group">
            <legend>סכום</legend>
            <div className="variant-options">
              {AMOUNTS.map((a) => (
                <label key={a} className="variant-option">
                  <input type="radio" name="gc-amount" className="visually-hidden" checked={amount === a} onChange={() => setAmount(a)} />
                  {formatPrice(a)}
                </label>
              ))}
            </div>
          </fieldset>
          {sent ? <p className="notify-ok" role="status">[דמו] כרטיס מתנה על סך {formatPrice(amount)} יישלח אחרי חיבור הסליקה.</p> : (
            <form className="form-grid" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="form-grid form-grid--2">
                <div className="field"><label htmlFor="to">למי?</label><input id="to" className="input" required /></div>
                <div className="field"><label htmlFor="toPhone">טלפון או מייל שלה</label><input id="toPhone" className="input" required dir="ltr" style={{ textAlign: "right" }} /></div>
              </div>
              <div className="field"><label htmlFor="msg">ברכה</label><textarea id="msg" className="input" maxLength={200} style={{ minHeight: 90 }} /></div>
              <button className="btn" type="submit">רכישת כרטיס ב-{formatPrice(amount)}</button>
            </form>
          )}
          <p className="muted" style={{ fontSize: 13 }}>ניתן למימוש ברכישה ישירה ב{brand.name}. לא ניתן למימוש במוצרים של אתרי שותפים.</p>
        </div>
      </div>
    </div>
  );
}
