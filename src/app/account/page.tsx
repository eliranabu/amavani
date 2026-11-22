import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "החשבון שלי" };

export default function AccountPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "החשבון שלי" }]} />
      <div className="empty-state">
        <h1 style={{ fontSize: "var(--fs-h3)" }}>חשבונות משתמשים יופעלו בקרוב</h1>
        <p>בינתיים אפשר להזמין כאורחת. לבירור על הזמנה קיימת – נשמח לעזור.</p>
        <Link href="/contact" className="btn btn--secondary">יצירת קשר</Link>
      </div>
    </div>
  );
}
