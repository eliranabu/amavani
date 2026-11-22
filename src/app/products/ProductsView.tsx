"use client";

import { useSearchParams } from "next/navigation";
import { ageLabels, products } from "@/lib/data";
import type { AgeGroup } from "@/lib/types";
import { ProductListing } from "@/components/ProductListing";

/** קורא את ?age= בצד הלקוח, כך שהעמוד עצמו נשאר סטטי (נדרש גם לייצוא סטטי) */
export function ProductsView() {
  const age = useSearchParams().get("age") ?? undefined;
  const initialAges = age && age in ageLabels ? [age as AgeGroup] : [];
  return <ProductListing key={age ?? "all"} products={products} initialAges={initialAges} />;
}
