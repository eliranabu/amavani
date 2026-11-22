import type { Metadata } from "next";
import { Suspense } from "react";
import { Breadcrumbs } from "@/components/ui";
import { RegistryView } from "./RegistryView";

export const metadata: Metadata = { title: "רשימת לידה", description: "בונים רשימת לידה ושולחים לחברים ולמשפחה בוואטסאפ." };

export default function RegistryPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "רשימת לידה" }]} />
      <Suspense fallback={<p className="page-head muted">טוען…</p>}><RegistryView /></Suspense>
    </div>
  );
}
