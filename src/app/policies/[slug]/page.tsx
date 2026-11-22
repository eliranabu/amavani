import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/lib/brand";
import { Breadcrumbs } from "@/components/ui";
import Link from "next/link";

const policies: Record<string, { title: string; body: string[] }> = {
  shipping: { title: "מדיניות משלוחים", body: [
    `משלוח עם שליח עד הבית – 3-5 ימי עסקים, ₪29.90. איסוף מנקודת חלוקה – 3-6 ימי עסקים, ₪19.90.`,
    `משלוח חינם בהזמנה מעל ₪${brand.freeShippingThreshold} (לאחר הנחות).`,
    "זמני המשלוח נספרים מיום העסקים שאחרי ההזמנה. במוצרים שנשלחים מספק חיצוני יצוין זמן משלוח נפרד בעמוד המוצר.",
    "מוצרים שנרכשים באתרי שותפים נשלחים לפי מדיניות האתר השותף.",
  ]},
  returns: { title: "מדיניות החזרות וביטולים", body: [
    "אפשר לבטל רכישה שבוצעה באתר בתוך 14 יום מיום קבלת המוצר, או מיום קבלת המסמך עם פרטי העסקה (אישור ההזמנה) – לפי המאוחר מביניהם.",
    "בביטול שאינו בגלל פגם או אי-התאמה ייגבו דמי ביטול של 5% ממחיר העסקה או 100 ₪ – הנמוך מביניהם. המוצר מוחזר באריזתו המקורית ובלי שימוש.",
    "אזרחים ותיקים (גיל 65 ומעלה), אנשים עם מוגבלות ועולים חדשים רשאים לבטל עסקה שכללה שיחה עם נציג (גם בצ'אט או בוואטסאפ) בתוך 4 חודשים.",
    "מוצר פגום, מוצר שאינו תואם את התיאור או איחור באספקה – הביטול ללא דמי ביטול, ועלות האיסוף עלינו.",
    "ההחזר הכספי מתבצע בתוך 14 יום מקבלת הודעת הביטול, לאמצעי התשלום שבו בוצעה הרכישה.",
    "איך מבטלים: בטופס ביטול עסקה באתר, בטלפון, במייל או בוואטסאפ. אין צורך לנמק.",
    "[להשלמה עם יועץ משפטי: מוצרים שאינם ניתנים להחזרה מטעמי היגיינה, כגון נשכנים ובקבוקים שנפתחו, ומארזים בהתאמה אישית.]",
    "מוצרים שנרכשו באתר שותף – הביטול וההחזרה מתבצעים מול האתר השותף, לפי המדיניות שלו.",
  ]},
  privacy: { title: "מדיניות פרטיות", body: [
    "[טקסט זמני – יש להשלים עם יועץ משפטי בהתאם לחוק הגנת הפרטיות ולתיקון 13.]",
    "אנחנו אוספות רק את המידע הדרוש לביצוע ההזמנה ולשירות. פרטי אשראי לא נשמרים אצלנו – הם מעובדים אצל חברת הסליקה.",
    "קישורים לאתרי שותפים עשויים לכלול מזהה שותף לצורך תשלום עמלה.",
  ]},
  terms: { title: "תנאי שימוש", body: ["[טקסט זמני – יש להשלים עם יועץ משפטי.]"] },
  accessibility: { title: "הצהרת נגישות", body: [
    "האתר נבנה מתוך מטרה לעמוד בתקן הישראלי ת״י 5568 ברמה AA (מבוסס WCAG).",
    "[יש להשלים: תאריך בדיקת נגישות, פרטי רכזת הנגישות ודרכי פנייה.]",
  ]},
};

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return Object.keys(policies).map((slug) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> { return { title: policies[(await params).slug]?.title }; }

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const p = policies[slug];
  if (!p) notFound();
  return (
    <div className="container">
      <Breadcrumbs items={[{ label: "בית", href: "/" }, { label: p.title }]} />
      <header className="page-head"><h1 className="page-title">{p.title}</h1></header>
      <div className="prose">{p.body.map((b, i) => <p key={i}>{b}</p>)}</div>
      {slug === "returns" && <Link href="/cancel" className="btn" style={{ marginTop: 16 }}>לטופס ביטול עסקה</Link>}
    </div>
  );
}
