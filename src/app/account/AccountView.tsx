"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { demoOrdersFor, type DemoOrder } from "@/lib/demo-store";
import { formatPrice } from "@/lib/format";
import { IconAlert } from "@/components/Icons";

const statusLabel: Record<DemoOrder["status"], string> = { received: "התקבלה", preparing: "בהכנה", shipped: "נשלחה" };
const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v);
const phoneOk = (v: string) => /^0\d{1,2}-?\d{7}$/.test(v.replace(/\s/g, ""));

function AuthForms() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const v = (k: string) => String(fd.get(k) ?? "").trim();
    const next: Record<string, string> = {};
    if (!emailOk(v("email"))) next.email = "כתובת המייל לא תקינה";
    if (mode === "register") {
      if (!v("firstName")) next.firstName = "יש להזין שם פרטי";
      if (!v("lastName")) next.lastName = "יש להזין שם משפחה";
      if (!phoneOk(v("phone"))) next.phone = "מספר הטלפון לא תקין (לדוגמה 050-1234567)";
      if (String(fd.get("password") ?? "").length < 8) next.password = "הסיסמה צריכה להיות באורך 8 תווים לפחות";
      if (!fd.get("terms")) next.terms = "יש לאשר את תנאי השימוש ומדיניות הפרטיות";
    } else if (!fd.get("password")) next.password = "יש להזין סיסמה";
    setErrors(next); setFormError("");
    const first = Object.keys(next)[0];
    if (first) { (e.currentTarget.querySelector(`[name="${first}"]`) as HTMLElement | null)?.focus(); return; }
    setBusy(true);
    const r = mode === "login"
      ? await login(v("email"), String(fd.get("password")))
      : await register({ email: v("email"), firstName: v("firstName"), lastName: v("lastName"), phone: v("phone"), password: String(fd.get("password")) });
    setBusy(false);
    if (!r.ok) setFormError(r.error);
  };

  const Err = ({ n }: { n: string }) => errors[n] ? <span id={`${n}-err`} className="field-error"><IconAlert />{errors[n]}</span> : null;
  const a = (n: string) => ({ "aria-invalid": errors[n] ? true : undefined, "aria-describedby": errors[n] ? `${n}-err` : undefined });

  return (
    <div style={{ maxWidth: 520 }}>
      <div className="segmented" role="group" aria-label="התחברות או הרשמה" style={{ display: "flex", gap: 8, marginBottom: 24 }}>
        <button type="button" className={`btn ${mode === "login" ? "" : "btn--secondary"}`} aria-pressed={mode === "login"} onClick={() => { setMode("login"); setErrors({}); setFormError(""); }}>התחברות</button>
        <button type="button" className={`btn ${mode === "register" ? "" : "btn--secondary"}`} aria-pressed={mode === "register"} onClick={() => { setMode("register"); setErrors({}); setFormError(""); }}>הרשמה</button>
      </div>
      <form className="form-grid" noValidate onSubmit={onSubmit} key={mode}>
        {mode === "register" && (
          <div className="form-grid form-grid--2">
            <div className="field"><label htmlFor="firstName">שם פרטי</label><input id="firstName" name="firstName" className="input" autoComplete="given-name" {...a("firstName")} /><Err n="firstName" /></div>
            <div className="field"><label htmlFor="lastName">שם משפחה</label><input id="lastName" name="lastName" className="input" autoComplete="family-name" {...a("lastName")} /><Err n="lastName" /></div>
          </div>
        )}
        <div className="field"><label htmlFor="email">מייל</label><input id="email" name="email" type="email" className="input" dir="ltr" style={{ textAlign: "right" }} autoComplete="email" {...a("email")} /><Err n="email" /></div>
        {mode === "register" && (
          <div className="field"><label htmlFor="phone">טלפון נייד</label><input id="phone" name="phone" type="tel" className="input" dir="ltr" style={{ textAlign: "right" }} autoComplete="tel" placeholder="050-1234567" {...a("phone")} /><Err n="phone" /></div>
        )}
        <div className="field"><label htmlFor="password">סיסמה</label><input id="password" name="password" type="password" className="input" dir="ltr" style={{ textAlign: "right" }} autoComplete={mode === "login" ? "current-password" : "new-password"} {...a("password")} />{mode === "register" && <span className="hint">לפחות 8 תווים</span>}<Err n="password" /></div>
        {mode === "register" && (
          <div className="field">
            <label className="checkbox"><input type="checkbox" name="terms" {...a("terms")} /> קראתי ואני מאשרת את <Link href="/policies/terms" style={{ textDecoration: "underline" }}>תנאי השימוש</Link> ו<Link href="/policies/privacy" style={{ textDecoration: "underline" }}>מדיניות הפרטיות</Link></label>
            <Err n="terms" />
          </div>
        )}
        {formError && <p className="field-error" role="alert"><IconAlert />{formError}</p>}
        <button className="btn" type="submit" disabled={busy} style={{ justifySelf: "start" }}>{busy ? "רגע…" : mode === "login" ? "התחברות" : "יצירת חשבון"}</button>
      </form>
      <p className="demo-note" style={{ marginTop: 24 }}>[דמו] החשבון נשמר בדפדפן הזה בלבד, עד לחיבור שרת אמיתי.</p>
    </div>
  );
}

function Dashboard() {
  const { user, logout, updateProfile } = useAuth();
  const [orders, setOrders] = useState<DemoOrder[]>([]);
  const [saved, setSaved] = useState(false);
  const [phoneErr, setPhoneErr] = useState("");
  useEffect(() => { if (user) setOrders(demoOrdersFor(user.email)); }, [user]);
  if (!user) return null;

  return (
    <div className="account-grid" style={{ display: "grid", gap: 40 }}>
      <section aria-labelledby="orders-h">
        <h2 id="orders-h" style={{ fontSize: "var(--fs-h3)", marginBottom: 16 }}>ההזמנות שלי</h2>
        {orders.length === 0 ? (
          <div className="empty-state" style={{ padding: "24px 0" }}>
            <p>עוד אין הזמנות בחשבון הזה.</p>
            <Link href="/products" className="btn">לכל המוצרים</Link>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: 16 }}>
            {orders.map((o) => (
              <li key={o.orderNo} className="summary-card">
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <strong>הזמנה #{o.orderNo}</strong>
                  <span>{statusLabel[o.status]} · {new Date(o.createdAt).toLocaleDateString("he-IL")}</span>
                </div>
                <ul style={{ margin: "12px 0", paddingInlineStart: 18 }}>
                  {o.items.map((i) => <li key={i.slug + (i.variant ?? "")}>{i.name}{i.variant ? ` (${i.variant})` : ""} × {i.qty}</li>)}
                </ul>
                <strong>סה״כ {formatPrice(o.total)}</strong>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="profile-h" style={{ maxWidth: 520 }}>
        <h2 id="profile-h" style={{ fontSize: "var(--fs-h3)", marginBottom: 16 }}>הפרטים שלי</h2>
        <form className="form-grid" noValidate onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const phone = String(fd.get("phone"));
          if (!phoneOk(phone)) { setPhoneErr("מספר הטלפון לא תקין (לדוגמה 050-1234567)"); setSaved(false); return; }
          setPhoneErr("");
          updateProfile({ firstName: String(fd.get("firstName")).trim(), lastName: String(fd.get("lastName")).trim(), phone });
          setSaved(true);
        }}>
          <div className="form-grid form-grid--2">
            <div className="field"><label htmlFor="pf">שם פרטי</label><input id="pf" name="firstName" className="input" defaultValue={user.firstName} /></div>
            <div className="field"><label htmlFor="pl">שם משפחה</label><input id="pl" name="lastName" className="input" defaultValue={user.lastName} /></div>
          </div>
          <div className="field"><label htmlFor="pe">מייל</label><input id="pe" className="input" value={user.email} readOnly dir="ltr" style={{ textAlign: "right" }} /></div>
          <div className="field"><label htmlFor="pp">טלפון</label><input id="pp" name="phone" type="tel" className="input" dir="ltr" style={{ textAlign: "right" }} defaultValue={user.phone} aria-invalid={phoneErr ? true : undefined} aria-describedby={phoneErr ? "pp-err" : undefined} />{phoneErr && <span id="pp-err" className="field-error"><IconAlert />{phoneErr}</span>}</div>
          <button className="btn" type="submit" style={{ justifySelf: "start" }}>שמירה</button>
          {saved && <p role="status" className="notify-ok">הפרטים נשמרו</p>}
        </form>
      </section>

      <nav aria-label="קיצורים" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Link href="/wishlist" className="btn btn--secondary">המועדפים שלי</Link>
        <Link href="/registry" className="btn btn--secondary">רשימת הלידה</Link>
        <button type="button" className="btn btn--secondary" onClick={logout}>התנתקות</button>
      </nav>
    </div>
  );
}

export function AccountView() {
  const { user, ready } = useAuth();
  if (!ready) return <p className="muted">טוען…</p>;
  return user ? <Dashboard /> : <AuthForms />;
}
