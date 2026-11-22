import Link from "next/link";
import Image from "next/image";
import type { Category, Guide } from "@/lib/types";
import { ProductImage } from "./ProductImage";
import { brand } from "@/lib/brand";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__grid">
        <div className="hero__media">
          <picture>
            <source media="(max-width: 899px)" srcSet="/images/hero-m.jpg" />
            <Image
              src="/images/hero.jpg" alt="אמא מחזיקה תינוק שזה עתה נולד ליד חלון, באור בוקר רך"
              fill priority sizes="(min-width: 900px) 58vw, 100vw" style={{ objectFit: "cover", objectPosition: "60% 40%" }}
            />
          </picture>
        </div>
        <div className="hero__content">
          <h1 id="hero-title" className="hero__title">
            <span>כל הדברים</span>
            <span>הקטנים שעושים</span>
            <span>את זה פשוט יותר</span>
          </h1>
          <div style={{ display: "grid", gap: 24 }}>
            <p className="hero__lead">חנות קטנה לאמא, לתינוק ולפעוט. כל מוצר כאן נבחר כי השתמשנו בו בבית – ולצידו כל מה שצריך לדעת לפני שקונים.</p>
            <div className="hero__actions">
              <Link href="/products" className="btn">גלי את הקולקציה</Link>
              <Link href="/creator-picks" className="text-link">מה אני הייתי קונה</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PromiseStrip() {
  const items = [
    { t: "משלוח חינם מעל ₪" + brand.freeShippingThreshold, s: "לכל הארץ, 3-5 ימי עסקים" },
    { t: "החזרה פשוטה", s: "מדיניות ביטול כתובה וברורה" },
    { t: "בלי הפתעות", s: "תמיד כתוב אם קונים אצלנו או אצל שותף" },
    { t: "אנשים אמיתיים בצד השני", s: "עונות בוואטסאפ ובמייל" },
  ];
  return (
    <div className="container">
      <ul className="promise">
        {items.map((i) => <li key={i.t}><strong>{i.t}</strong>{i.s}</li>)}
      </ul>
    </div>
  );
}

export function EditorialCard({ g }: { g: Guide }) {
  return (
    <Link href={`/guides/${g.slug}`} className="editorial-card">
      <div className="editorial-card__media"><ProductImage tone={g.tone} shape={g.shape} src={g.image} alt="" sizes="(min-width:720px) 50vw, 100vw" /></div>
      <span className="meta">{g.readTime}</span>
      <h3>{g.title}</h3>
      <p>{g.excerpt}</p>
    </Link>
  );
}

export function Journal({ guides }: { guides: Guide[] }) {
  const [feature, ...rest] = guides;
  return (
    <div className="journal">
      <Link href={`/guides/${feature.slug}`} className="journal__feature">
        <div className="journal__img"><ProductImage tone={feature.tone} shape={feature.shape} src={feature.image} alt="" sizes="(min-width:1024px) 55vw, 100vw" /></div>
        <span className="meta">{feature.readTime}</span>
        <h3>{feature.title}</h3>
        <p>{feature.excerpt}</p>
      </Link>
      <div className="journal__list">
        {rest.map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="journal__row">
            <div className="journal__img"><ProductImage tone={g.tone} shape={g.shape} src={g.image} alt="" sizes="96px" /></div>
            <div><h3>{g.title}</h3><p className="journal__meta">{g.readTime}</p></div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CategoryCard({ c }: { c: Category }) {
  return (
    <Link href={`/category/${c.slug}`} className="editorial-card">
      <div className="editorial-card__media" style={{ aspectRatio: "4/5" }}><ProductImage tone={c.tone} shape={c.shape} src={c.image} alt="" /></div>
      <h3>{c.name}</h3>
    </Link>
  );
}

export function SectionHead({ title, desc, href, linkLabel, id }: { title: string; desc?: string; href?: string; linkLabel?: string; id?: string }) {
  return (
    <div className="section-head">
      <div>
        <h2 id={id}>{title}</h2>
        {desc && <p>{desc}</p>}
      </div>
      {href && <Link href={href} className="text-link">{linkLabel ?? "לכל המוצרים"}</Link>}
    </div>
  );
}
