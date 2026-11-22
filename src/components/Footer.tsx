import Link from "next/link";
import { brand } from "@/lib/brand";
import { categories } from "@/lib/data";
import { NewsletterForm } from "./NewsletterForm";
import { PaymentMethods } from "./extras";

export function NewsletterSection() {
  return (
    <section className="newsletter" aria-labelledby="nl-title">
      <div style={{ display: "grid", justifyItems: "center" }}>
        <h2 id="nl-title" lang="en">Join the club</h2>
        <p>נרשמות ומקבלות 10% על ההזמנה הראשונה, ומדריך קצר פעם בחודש. בלי הצפות.</p>
      </div>
      <NewsletterForm />
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <p style={{ marginTop: 0, color: "var(--ink)", fontSize: 18 }}>{brand.tagline}.</p>
            <p>חנות ישראלית קטנה, עם שירות אנושי ומידע שקוף על כל מוצר. {brand.email}</p>
          </div>
          <div>
            <h3>החנות</h3>
            <ul>
              {categories.slice(0, 4).map((c) => <li key={c.slug}><Link href={`/category/${c.slug}`}>{c.name}</Link></li>)}
              <li><Link href="/deals">מבצעים</Link></li>
              <li><Link href="/creator-picks">בחירות האמא</Link></li>
            </ul>
          </div>
          <div>
            <h3>שירות לקוחות</h3>
            <ul>
              <li><Link href="/contact">יצירת קשר</Link></li>
              <li><Link href="/faq">שאלות נפוצות</Link></li>
              <li><Link href="/policies/shipping">מדיניות משלוחים</Link></li>
              <li><Link href="/policies/returns">החזרות וביטולים</Link></li>
              <li><Link href="/cancel">ביטול עסקה</Link></li>
              <li><Link href="/track">מעקב הזמנה</Link></li>
            </ul>
          </div>
          <div>
            <h3>עלינו</h3>
            <ul>
              <li><Link href="/about">אודות</Link></li>
              <li><Link href="/guides">מדריכים ותוכן</Link></li>
              <li><Link href="/registry">רשימת לידה</Link></li>
              <li><Link href="/gift-card">כרטיס מתנה</Link></li>
              <li><a href={brand.social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href={brand.social.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__legal">
          <PaymentMethods />
          <p>{brand.business.legalName} | {brand.business.id} | {brand.business.address} | שירות: {brand.business.hours}, טלפון {brand.phone}</p>
        </div>
        <div className="footer__wordmark" aria-hidden="true">{brand.name}</div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {brand.name}. כל הזכויות שמורות.</span>
          <span style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/policies/privacy">מדיניות פרטיות</Link>
            <Link href="/policies/terms">תנאי שימוש</Link>
            <Link href="/policies/accessibility">הצהרת נגישות</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
