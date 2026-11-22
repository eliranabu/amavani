import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategory, productsByCategory } from "@/lib/data";
import { ProductListing } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/ui";
import { ProductImage } from "@/components/ProductImage";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const c = getCategory((await params).slug);
  return { title: c?.name ?? "קטגוריה", description: c?.description };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "כל המוצרים", href: "/products" }, { label: c.name }]} />
      <header className="listing-hero">
        <div>
          <h1>{c.name}</h1>
          <p style={{ marginTop: 16 }}>{c.description}</p>
        </div>
        <div className="listing-hero__img"><ProductImage tone={c.tone} shape={c.shape} src={c.image} alt="" priority sizes="(min-width:1024px) 50vw, 100vw" /></div>
      </header>
      <ProductListing products={productsByCategory(slug)} emptyText="אין עדיין מוצרים בקטגוריה הזו" />
    </div>
  );
}
