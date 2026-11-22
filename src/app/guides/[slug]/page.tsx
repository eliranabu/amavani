import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, guides } from "@/lib/data";
import { ProductCard } from "@/components/commerce";
import { ProductImage } from "@/components/ProductImage";
import { Breadcrumbs } from "@/components/ui";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return guides.map((g) => ({ slug: g.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  return { title: g?.title, description: g?.excerpt };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const g = guides.find((x) => x.slug === slug);
  if (!g) notFound();
  const related = g.relatedProducts.map(getProduct).filter((p) => !!p);
  return (
    <article className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "מדריכים", href: "/guides" }, { label: g.title }]} />
      <header className="article-head">
        <span className="meta">{g.readTime}</span>
        <h1>{g.title}</h1>
        <p className="muted" style={{ fontSize: 18 }}>{g.excerpt}</p>
      </header>
      <div className="article-media"><ProductImage tone={g.tone} shape={g.shape} src={g.image} alt="" priority sizes="100vw" /></div>
      <div className="prose" style={{ marginInline: "auto" }}>
        {g.body.map((para, i) => <p key={i}>{para}</p>)}
      </div>
      <section className="section">
        <h2 style={{ fontSize: "var(--fs-h3)", marginBottom: 24 }}>המוצרים מהמדריך</h2>
        <div className="product-grid product-grid--3">{related.map((p) => <ProductCard key={p!.id} p={p!} />)}</div>
      </section>
    </article>
  );
}
