import Link from "next/link";
import Image from "next/image";
import { bestSellers, categories, creatorPicks, products } from "@/lib/data";
import { brand } from "@/lib/brand";
import { ProductCard } from "@/components/commerce";
import { ProductImage } from "@/components/ProductImage";
import { StageFinder } from "@/components/StageFinder";
import { ServicesBento } from "@/components/ServicesBento";

function OutlineMarquee({ word }: { word: string }) {
  return (
    <div className="outline-marquee" aria-hidden="true">
      <div className="marquee">
        {[0, 1].map((g) => (
          <div className="marquee__group" key={g}>
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="outline-marquee__word">{word}<span className="star">✦</span></span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const STRIP = ["/images/cat-baby.jpg", "/images/p-noise-2.jpg", "/images/cat-feeding.jpg", "/images/g-gifts.jpg", "/images/cat-sleep.jpg", "/images/p-teether-2.jpg", "/images/cat-on-the-go.jpg", "/images/p-backpack-1.jpg"];

export default function HomePage() {
  const picks = creatorPicks().slice(0, 4);
  const best = bestSellers();

  return (
    <>
      {/* HERO */}
      <section className="hero4" aria-labelledby="hero-title">
        <div className="hero4__img">
          <Image src="/images/hero.jpg" alt="אמא מחזיקה תינוק שזה עתה נולד ליד חלון" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "76% 30%" }} />
        </div>
        <div className="hero4__content">
          <span className="mono hero4__eyebrow" lang="en">Winter edit ✦ 2026</span>
          <h1 id="hero-title" className="hero4__title" aria-label={`${brand.name} – ${brand.tagline}`}>
            <span>IMA</span><span className="star" aria-hidden="true">✦</span><span>ME</span>
          </h1>
          <p className="hero4__lead">דברים קטנים שעושים את הימים הראשונים קצת יותר פשוטים. נבחרו אחד-אחד, ונוסו אצלנו בבית.</p>
          <div className="hero4__actions">
            <Link href="/products" className="btn">לקולקציה</Link>
            <Link href="/creator-picks" className="btn btn--ghost-light">מה אני הייתי קונה?</Link>
          </div>
        </div>
      </section>

      {/* NEW IN */}
      <OutlineMarquee word="NEW IN" />
      <section aria-labelledby="best-title" style={{ paddingBottom: "clamp(48px, 6vw, 96px)" }}>
        <div className="rail-head">
          <h2 id="best-title">מה שאמהות קונות שוב</h2>
          <Link href="/products" className="text-link">לכל המוצרים</Link>
        </div>
        <div className="rail">
          {best.map((p, i) => <ProductCard key={p.id} p={p} index={i} priority={i < 2} />)}
        </div>
      </section>

      {/* STAGE FINDER */}
      <StageFinder />

      {/* STORY */}
      <section className="container section">
        <div className="story">
          <div className="story__img">
            <ProductImage tone="sand" shape="arch" src="/images/manifesto.jpg" alt="אמא מחבקת את התינוק שלה" sizes="(min-width:1000px) 45vw, 100vw" />
          </div>
          <div className="story__text">
            <h2>הסיפור שלנו</h2>
            <p className="big">התחלנו כי נמאס לנו לקנות דברים שנשארו בארון. אז בחרנו מעט, בדקנו הכול על עצמנו, וכתבנו בכנות מה עבד.</p>
            <p className="small">כל מוצר כאן עבר בבית שלנו לפני שעלה לאתר. אם משהו לא החזיק מעמד – הוא לא פה. ואם קונים אצל שותף, זה כתוב בגדול.</p>
            <span className="story__sign">— {brand.creatorName}</span>
            <Link href="/about" className="btn btn--secondary">עוד עלינו</Link>
          </div>
        </div>
      </section>

      {/* CATEGORY INDEX */}
      <section className="container section" aria-labelledby="cats-title">
        <div className="section-head"><h2 id="cats-title">כל הקטגוריות</h2></div>
        <div className="cindex">
          {categories.map((c, i) => {
            const items = products.filter((p) => p.category === c.slug);
            const inStock = items.filter((p) => p.inStock).length;
            const thumbs = [c.image, ...items.map((p) => p.images?.[0])].filter(Boolean).slice(0, 4) as string[];
            return (
              <Link key={c.slug} href={`/category/${c.slug}`} className="cindex__row">
                <span className="cindex__name"><span className="num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{c.name}</span>
                <span className="cindex__thumbs" aria-hidden="true">
                  {thumbs.map((t) => <div key={t}><ProductImage tone={c.tone} shape={c.shape} src={t} alt="" sizes="60px" /></div>)}
                </span>
                <span className="cindex__meta">
                  <span className="mono" lang="en" aria-hidden="true">{String(items.length).padStart(2, "0")} pieces</span>
                  <span className={`mono${inStock < items.length ? " low" : ""}`} lang="en" aria-hidden="true">{inStock < items.length ? "some sold out" : "in stock"}</span>
                  <span className="visually-hidden">{items.length} מוצרים{inStock < items.length ? ", חלקם אזלו" : ", כולם במלאי"}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* CREATOR PICKS */}
      <section className="section section--alt" aria-labelledby="picks-title">
        <div className="container">
          <div className="creator">
            <div className="creator__side">
              <div className="creator__media">
                <ProductImage tone="rose" shape="circle" src="/images/creator.jpg" alt={`${brand.creatorName} עם התינוק`} sizes="(min-width:1024px) 40vw, 100vw" />
                <span className="creator__caption">{brand.creatorName}</span>
              </div>
              <div className="creator__intro">
                <h2 id="picks-title">בחירות האמא</h2>
                <p className="creator__quote">״אלה הדברים שהיו איתי ביום-יום. אני ממליצה עליהם לחברות הכי קרובות – אז גם לך.״</p>
                <Link href="/creator-picks" className="btn btn--secondary" style={{ alignSelf: "flex-start" }}>לכל הבחירות שלי</Link>
              </div>
            </div>
            <div className="creator__list">
              {picks.map((p) => <ProductCard key={p.id} p={p} note={p.creatorPick} />)}
            </div>
          </div>
        </div>
      </section>

      {/* BENTO */}
      <ServicesBento />

      {/* PHOTO STRIP */}
      <div className="strip" aria-hidden="true">
        {STRIP.map((src) => <div key={src}><Image src={src} alt="" fill sizes="300px" style={{ objectFit: "cover" }} /></div>)}
      </div>
    </>
  );
}
