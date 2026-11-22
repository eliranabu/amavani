import type { Metadata } from "next";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { Accordion, Breadcrumbs } from "@/components/ui";

export const metadata: Metadata = { title: "שאלות נפוצות" };

const faqs = [
  { title: "מה ההבדל בין ״נמכר ונשלח על ידינו״ ל״רכישה באתר שותף״?", content: <p>מוצרים שמסומנים ״נמכר ונשלח על ידינו״ נרכשים כאן באתר, דרך הסל והתשלום המאובטח שלנו. מוצרים שמסומנים ״רכישה באתר שותף״ נרכשים באתר חיצוני – הלחיצה מעבירה אותך לשם, והתשלום, המשלוח וההחזרות מתבצעים מול אותו אתר. ייתכן שנקבל עמלה על רכישה כזו, בלי עלות נוספת עבורך.</p> },
  { title: "כמה זמן לוקח משלוח?", content: <p>משלוח עם שליח עד הבית: 3-5 ימי עסקים. איסוף מנקודת חלוקה: 3-6 ימי עסקים. משלוח חינם בהזמנה מעל ₪{brand.freeShippingThreshold}. <Link href="/policies/shipping" style={{ textDecoration: "underline" }}>למדיניות המשלוחים</Link></p> },
  { title: "איך מחזירים מוצר?", content: <p>אפשר לבטל בתוך 14 יום מקבלת המוצר. דמי הביטול: 5% או 100 ₪, הנמוך מביניהם (במוצר פגום – בלי דמי ביטול). <Link href="/policies/returns" style={{ textDecoration: "underline" }}>למדיניות ההחזרות והביטולים</Link></p> },
  { title: "צריך לפתוח חשבון כדי להזמין?", content: <p>לא. אפשר להזמין כאורחת, רק עם מייל, טלפון וכתובת.</p> },
  { title: "אפשר לשלם בתשלומים או ב-bit?", content: <p>כן. בכרטיס אשראי אפשר לחלק עד {brand.installments} תשלומים ללא ריבית בהזמנה מעל ₪150. אפשר לשלם גם ב-<bdi>bit</bdi>, ב-<bdi>Apple Pay</bdi> וב-<bdi>Google Pay</bdi>.</p> },
  { title: "אפשר לשלוח מתנה ישירות ליולדת?", content: <p>כן. בעמוד התשלום מסמנים ״זו מתנה״, ממלאים את הכתובת שלה ומוסיפים ברכה. המחירים לא יופיעו בחבילה, ואפשר להוסיף אריזת מתנה.</p> },
  { title: "מה זו רשימת לידה?", content: <p>רשימה של מוצרים שבחרת, עם קישור אחד שאפשר לשלוח למשפחה ולחברות. <Link href="/registry" style={{ textDecoration: "underline" }}>לבניית רשימה</Link></p> },
  { title: "איך משתמשים בקופון?", content: <p>בסל הקניות או בעמוד התשלום יש שדה ״קוד קופון״. קופונים תקפים לרכישה ישירה באתר בלבד.</p> },
];

export default function FaqPage() {
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: "שאלות נפוצות" }]} />
      <header className="page-head"><h1 className="page-title">שאלות נפוצות</h1></header>
      <div className="faq"><Accordion items={faqs} /></div>
      <p className="muted" style={{ marginTop: 32 }}>לא מצאת תשובה? <Link href="/contact" style={{ textDecoration: "underline" }}>דברי איתנו</Link></p>
    </div>
  );
}
