import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategory, getProduct, products, relatedProducts } from "@/lib/data";
import { Breadcrumbs } from "@/components/ui";
import { ProductCard } from "@/components/commerce";
import { SectionHead } from "@/components/sections";
import { ProductDetail } from "./ProductDetail";
import { RecentlyViewed } from "@/components/extras";
import { brand } from "@/lib/brand";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).slug);
  return {
    title: p?.name ?? "מוצר", description: p?.short,
    openGraph: p ? { title: p.name, description: p.short, images: p.images?.slice(0, 1), locale: "he_IL", type: "website" } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) notFound();
  const c = getCategory(p.category);

  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.description,
    brand: { "@type": "Brand", name: p.brand }, image: p.images ?? [], sku: p.id,
    offers: {
      "@type": "Offer", priceCurrency: "ILS", price: p.price,
      availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: brand.name },
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="container">
        <Breadcrumbs items={[{ label: "בית", href: "/" }, ...(c ? [{ label: c.name, href: `/category/${c.slug}` }] : []), { label: p.name }]} />
        <ProductDetail p={p} />
      </div>
      <section className="container section" style={{ marginTop: 48 }}>
        <SectionHead title="אולי יתאים לך גם" href={c ? `/category/${c.slug}` : "/products"} linkLabel={c ? `עוד ב${c.name}` : undefined} />
        <div className="product-grid">
          {relatedProducts(p).map((r) => <ProductCard key={r.id} p={r} />)}
        </div>
      </section>
      <RecentlyViewed current={p.slug} />
    </>
  );
}
