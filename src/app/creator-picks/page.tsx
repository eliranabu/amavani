import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { creatorPicks } from "@/lib/data";
import { ProductCard } from "@/components/commerce";
import { ProductImage } from "@/components/ProductImage";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "בחירות האמא" };

const collections = [
  { title: "המוצרים שהייתי קונה לתינוק הראשון שלי", slugs: ["muslin-swaddle-set", "nursing-pillow", "white-noise-machine"] },
  { title: "הדברים שהכי מקלים עליי ביום-יום", slugs: ["changing-bag", "postpartum-robe"] },
  { title: "המתנות שהייתי שמחה לקבל אחרי לידה", slugs: ["newborn-gift-box", "postpartum-robe"] },
];

export default function CreatorPicksPage() {
  const picks = creatorPicks();
  const bySlug = Object.fromEntries(picks.map((p) => [p.slug, p]));
  return (
    <>
      <section className="section--alt" style={{ paddingBottom: 48 }}>
        <div className="container">
          <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "בחירות האמא" }]} />
          <div className="creator" style={{ paddingTop: 32 }}>
            <div className="creator__intro" style={{ position: "static" }}>
              <div className="creator__media" style={{ maxWidth: 420 }}><ProductImage tone="rose" shape="circle" src="/images/creator.jpg" alt={`${brand.creatorName} עם התינוק`} priority sizes="420px" /><span className="creator__caption">{brand.creatorName}</span></div>
            </div>
            <div>
              <h1 className="listing-hero" style={{ display: "block", padding: 0, fontSize: "var(--fs-hero)", lineHeight: 1, marginBottom: 32 }}>בחירות האמא</h1>
              <p className="creator__quote" style={{ maxWidth: "36ch" }}>
                ״אני לא ממליצה על משהו שלא השתמשתי בו בעצמי. כאן ריכזתי את המוצרים שליוו אותי – עם כמה מילים אישיות על כל אחד.״
              </p>
              <p className="creator__sign" style={{ marginTop: 12 }}>— {brand.creatorName}</p>
              <p className="demo-note">שקיפות: חלק מהמוצרים נמכרים אצלנו וחלקם באתרי שותפים. אופן הרכישה מסומן בכל מוצר.</p>
            </div>
          </div>
        </div>
      </section>

      {collections.map((col) => (
        <section className="container section" key={col.title}>
          <h2 style={{ fontSize: "var(--fs-h2)", marginBottom: 40, maxWidth: "20ch" }}>{col.title}</h2>
          <div className="product-grid product-grid--3">
            {col.slugs.map((s) => bySlug[s]).filter(Boolean).map((p) => <ProductCard key={p.id} p={p} note={p.creatorPick} />)}
          </div>
        </section>
      ))}
    </>
  );
}
