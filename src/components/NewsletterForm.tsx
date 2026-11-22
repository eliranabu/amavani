"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  if (state === "done") return <p role="status" style={{ fontWeight: 500, marginTop: 12 }}>תודה! נרשמת בהצלחה ✓</p>;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: חיבור לספק דיוור (למשל Klaviyo / Mailchimp / ActiveTrail)
        setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
      }}
    >
      <label htmlFor="nl-email" className="visually-hidden">כתובת מייל</label>
      <input
        id="nl-email" className="input" type="email" inputMode="email" placeholder="כתובת המייל שלך" dir="ltr"
        style={{ textAlign: "right" }}
        value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
        aria-invalid={state === "error"} aria-describedby={state === "error" ? "nl-err" : undefined}
      />
      <button className="btn" type="submit">הצטרפות</button>
      {state === "error" && <p id="nl-err" className="field-error" style={{ width: "100%" }}>נראה שכתובת המייל חסרה או לא תקינה</p>}
    </form>
  );
}
