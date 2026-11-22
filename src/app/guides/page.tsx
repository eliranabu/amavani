import type { Metadata } from "next";
import { guides } from "@/lib/data";
import { EditorialCard } from "@/components/sections";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "מדריכים ותוכן" };

export default function GuidesPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "מדריכים" }]} />
      <header className="page-head">
        <h1 className="page-title">מדריכים והשראה</h1>
        <p>תשובות קצרות ומעשיות – מה באמת צריך, מתי, ולמה.</p>
      </header>
      <div className="editorial-grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
        {guides.map((g) => <EditorialCard key={g.slug} g={g} />)}
      </div>
    </div>
  );
}
