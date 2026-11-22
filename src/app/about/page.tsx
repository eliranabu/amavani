import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { ProductImage } from "@/components/ProductImage";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "אודות" };

export default function AboutPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "אודות" }]} />
      <header className="article-head">
        <h1>מי אנחנו</h1>
        <p className="muted" style={{ fontSize: 18 }}>{brand.tagline}.</p>
      </header>
      <div className="article-media"><ProductImage tone="sand" shape="arch" src="/images/g-before-birth.jpg" alt="" priority sizes="100vw" /></div>
      <div className="prose" style={{ marginInline: "auto" }}>
        <p className="demo-note">[טקסט זמני] יש להחליף בסיפור האמיתי של המותג ושל {brand.creatorName}.</p>
        <p>{brand.name} נולדה מתוך הרגע שבו הבנו כמה מוצרים יש בשוק – וכמה קשה לדעת מה באמת שווה. אנחנו בוחרות כל מוצר בקפידה, משתמשות בו בעצמנו, ומציגות עליו מידע שקוף.</p>
        <h2>מה חשוב לנו</h2>
        <ul>
          <li>פחות מוצרים, יותר טובים.</li>
          <li>מידע ברור: חומרים, גילאים, משלוחים והחזרות.</li>
          <li>שקיפות מלאה: מה נמכר אצלנו ומה נרכש באתר שותף.</li>
          <li>בלי טיימרים מזויפים, בלי ביקורות מומצאות.</li>
        </ul>
        <h2>מי עומדת מאחורי החנות</h2>
        <p>[פרטי העסק: שם העסק, ח.פ./עוסק, כתובת למשלוח החזרות ודרכי יצירת קשר.]</p>
      </div>
    </div>
  );
}
