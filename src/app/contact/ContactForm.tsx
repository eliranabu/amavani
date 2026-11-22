"use client";

import { useState } from "react";
import { IconAlert } from "@/components/Icons";

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  if (sent) return <p role="status" style={{ fontWeight: 500 }}>ההודעה נשלחה ✓ נחזור אלייך בהקדם.</p>;
  return (
    <form noValidate onSubmit={(e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const er: Record<string, string> = {};
      if (!String(fd.get("name")).trim()) er.name = "יש להזין שם";
      if (!/^\S+@\S+\.\S+$/.test(String(fd.get("email")))) er.email = "כתובת המייל לא תקינה";
      if (String(fd.get("message")).trim().length < 5) er.message = "יש לכתוב הודעה קצרה";
      setErrors(er);
      // TODO: שליחה לשרת / שירות מייל
      if (!Object.keys(er).length) setSent(true);
    }}>
      <div className="form-grid">
        <div className="form-grid form-grid--2">
          <F name="name" label="שם" errors={errors} />
          <F name="email" label="מייל" type="email" errors={errors} ltr />
        </div>
        <F name="order" label="מספר הזמנה (רשות)" errors={errors} />
        <div className="field">
          <label htmlFor="message">איך אפשר לעזור?</label>
          <textarea id="message" name="message" className="input" aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-err" : undefined} />
          {errors.message && <span id="message-err" className="field-error"><IconAlert />{errors.message}</span>}
        </div>
        <button className="btn" type="submit" style={{ justifySelf: "start" }}>שליחה</button>
      </div>
    </form>
  );
}

function F({ name, label, type = "text", errors, ltr }: { name: string; label: string; type?: string; errors: Record<string, string>; ltr?: boolean }) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} className="input" dir={ltr ? "ltr" : undefined} style={ltr ? { textAlign: "right" } : undefined}
        aria-invalid={!!errors[name]} aria-describedby={errors[name] ? `${name}-err` : undefined} />
      {errors[name] && <span id={`${name}-err`} className="field-error"><IconAlert />{errors[name]}</span>}
    </div>
  );
}
