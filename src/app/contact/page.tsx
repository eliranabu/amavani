import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { Breadcrumbs } from "@/components/ui";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = { title: "יצירת קשר" };

export default function ContactPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "יצירת קשר" }]} />
      <header className="page-head">
        <h1 className="page-title">דברי איתנו</h1>
        <p>אנחנו עונות בימים {brand.business.hours}. בדרך כלל תוך יום עסקים.</p>
      </header>
      <div className="info-grid" style={{ marginBottom: 48 }}>
        <div className="info-card"><h3>וואטסאפ</h3><p><a href={`https://wa.me/${brand.whatsapp}`} style={{ textDecoration: "underline" }}>שליחת הודעה</a> – הדרך הכי מהירה.</p></div>
        <div className="info-card"><h3>מייל</h3><p><a href={`mailto:${brand.email}`} dir="ltr" style={{ textDecoration: "underline" }}>{brand.email}</a></p></div>
        <div className="info-card"><h3>טלפון</h3><p><a href={`tel:${brand.phone}`} dir="ltr">{brand.phone}</a></p></div>
      </div>
      <div style={{ maxWidth: 640 }}><ContactForm /></div>
    </div>
  );
}
