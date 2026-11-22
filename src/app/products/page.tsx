import type { Metadata } from "next";
import { ageLabels, products } from "@/lib/data";
import type { AgeGroup } from "@/lib/types";
import { ProductListing } from "@/components/ProductListing";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "כל המוצרים" };

export default async function AllProducts({ searchParams }: { searchParams: Promise<{ age?: string }> }) {
  const { age } = await searchParams;
  const initialAges = age && age in ageLabels ? [age as AgeGroup] : [];
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "כל המוצרים" }]} />
      <header className="listing-hero" style={{ gridTemplateColumns: "1fr" }}>
        <div>
          <h1>החנות</h1>
          <p style={{ marginTop: 16 }}>{products.length} מוצרים שבחרנו לאמא, לתינוק ולפעוט. כל אחד מהם עבר אצלנו בבית.</p>
        </div>
      </header>
      <ProductListing key={age ?? "all"} products={products} initialAges={initialAges} />
    </div>
  );
}
