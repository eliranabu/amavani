import Link from "next/link";
import { brand } from "@/lib/brand";
import { ProductImage } from "./ProductImage";
import { IconWhatsApp } from "./Icons";

/** Bento שירותים – 4 עמודות בדסקטופ, 2 בטאבלט, 1 במובייל */
export function ServicesBento() {
  return (
    <section className="container section" aria-labelledby="bento-title">
      <div className="section-head"><h2 id="bento-title">יותר מחנות</h2></div>
      <div className="bento">
        <Link href="/registry" className="bento__card bento__card--img bento--reg">
          <div className="bento__bg"><ProductImage tone="sand" shape="arch" src="/images/g-before-birth.jpg" alt="" sizes="(min-width:1024px) 50vw, 100vw" /></div>
          <div className="bento__body">
            <span className="mono" lang="en" aria-hidden="true">Birth list ✦</span>
            <h3>רשימת לידה בקישור אחד</h3>
            <p>בוחרות מה באמת צריך, שולחות בוואטסאפ, וכולם קונים ממנה.</p>
            <span className="btn btn--sm bento__cta">לבניית רשימה</span>
          </div>
        </Link>

        <div className="bento__card bento--wine bento--pay">
          <span className="bento__big latin" aria-hidden="true">3×</span>
          <div>
            <h3>עד {brand.installments} תשלומים ללא ריבית</h3>
            <p>ומשלמים גם ב-<bdi>bit</bdi>, ב-<bdi>Apple Pay</bdi> וב-<bdi>Google Pay</bdi>.</p>
          </div>
        </div>

        <a href={`https://wa.me/${brand.whatsapp}`} target="_blank" rel="noopener noreferrer" className="bento__card bento--forest bento--wa">
          <IconWhatsApp width={30} height={30} />
          <div>
            <h3>אמא אמיתית בצד השני</h3>
            <p>שאלה על מידה או מוצר? עונות בוואטסאפ. <span className="visually-hidden">(נפתח בחלון חדש)</span></p>
          </div>
        </a>

        <Link href="/policies/returns" className="bento__card bento--paper bento--ret">
          <span className="bento__big latin" aria-hidden="true">14</span>
          <div>
            <h3>ימים להחזרה</h3>
            <p>בלי שאלות ובלי לנמק.</p>
          </div>
        </Link>

        <Link href="/category/gifts" className="bento__card bento__card--img bento--gift">
          <div className="bento__bg"><ProductImage tone="rose" shape="stack" src="/images/p-giftbox-1.jpg" alt="" sizes="(min-width:1024px) 50vw, 100vw" /></div>
          <div className="bento__body">
            <h3>שולחות מתנה ליולדת?</h3>
            <p>ברכה בכתב יד, אריזה, ובלי מחירים בחבילה.</p>
          </div>
        </Link>

        <Link href="/gift-card" className="bento__card bento--mesh bento--card">
          <span className="mono" lang="en" aria-hidden="true">Gift card</span>
          <div>
            <h3>לא בטוחות מה לקנות?</h3>
            <p>כרטיס מתנה דיגיטלי, נשלח במייל או בוואטסאפ.</p>
          </div>
        </Link>
      </div>
    </section>
  );
}
