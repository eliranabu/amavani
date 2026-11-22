# אמא ואני (Ima & Me) – הנחיות לפרויקט

חנות אונליין ישראלית לאימהות ולתינוקות (היריון עד גיל 3). עברית, RTL מלא.
מודל מכירה כפול: רכישה ישירה (Dropshipping) ומוצרי Affiliate שנרכשים באתר שותף.

## פקודות
- `npm run dev` – שרת פיתוח (http://localhost:3000)
- `npm run build` – build לפרודקשן (חייב לעבור לפני כל commit)
- `npm run lint` – בדיקת TypeScript (`tsc --noEmit`)
- `npm test` – בדיקות יחידה (Vitest, `tests/unit`)
- `npm run test:e2e` – בדיקות דפדפן (Playwright, דסקטופ + מובייל, כולל axe); דורש build קודם. בסביבת Claude Code: `CHROMIUM_PATH=/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`
- `npm run check` – lint + בדיקות + build + E2E (להריץ לפני כל commit)
- מפת הדרכים והשלבים: `ROADMAP.md`

## Stack
Next.js 16 (App Router) · React 19 · TypeScript · CSS רגיל (בלי Tailwind) · גופנים מקומיים דרך @fontsource.

## מבנה
- `src/lib/brand.ts` – שם המותג, פרטי העסק, טלפון, הודעות ה-Marquee
- `src/lib/pricing.ts` – חישובי הנחה/משלוח טהורים, משותפים ללקוח ולשרת. **מחירים נקבעים בשרת בלבד**
- `src/lib/data.ts` – נתוני דמו: מוצרים, קטגוריות, מדריכים, קופונים, שיטות משלוח
- `src/context/CartContext.tsx` – סל (localStorage). **מוצר Affiliate לעולם לא נכנס לסל**
- `src/context/AuthContext.tsx` + `src/lib/demo-store.ts` – חשבון והזמנות במצב דמו (localStorage). **להחליף ב-Supabase; הממשק נשאר**
- `src/context/ListsContext.tsx` – מועדפים, נצפו לאחרונה, רשימת לידה
- `src/app/tokens.css` – Design Tokens (צבעים, ריווח, תנועה)
- `src/app/globals.css` – בסיס הרכיבים; `src/app/v4.css` – השפה העיצובית הנוכחית (נטען אחרון ודורס)
- `src/components/` – Header, CartDrawer, ProductCard (commerce.tsx), extras.tsx, StageFinder, ServicesBento

## שפה עיצובית (v4)
- צבעים: שמנת `#F8F3E3`, יין `#74261F`, ירוק יער `#23402B`, אבן `#D9D5CB`, דיו `#141414`
- גופנים: Rubik 800–900 לכותרות בעברית · Unbounded 900 לאנגלית ולמספרים גדולים · IBM Plex Sans Hebrew לטקסט · IBM Plex Mono לתוויות ומחירים · Bellefair לציטוטים
- לא להוסיף: כרטיסים זהים עם צל, אנימציית כניסה לכל אזור, eyebrow מעל כל כותרת, אותיות רווחות בעברית

## כללים שאסור לשבור
1. הפרדה ברורה בין רכישה ישירה ל-Affiliate (תווית, כפתור, ובלי סל).
2. אין ביקורות, טיימרים, מלאי או הנחות מזויפים. `compareAt` רק כשהמחיר באמת ירד.
3. אין הבטחות בטיחות או תקנים בלי מסמכים מהספק.
4. נגישות WCAG 2.1 AA: פוקוס נראה, יעדי מגע ≥44px, `prefers-reduced-motion`, axe ללא הפרות.
5. RTL: להשתמש בתכונות לוגיות (`inset-inline-*`, `margin-inline-*`); טווחי מספרים עם מקף רגיל (`0-6`) ולא en-dash; שמות לועזיים בתוך עברית ב-`<bdi>`.
6. ביטול עסקה לפי חוק הגנת הצרכן: 14 יום, דמי ביטול 5% או 100 ₪ (הנמוך).

## מה פתוח (TODO)
- חיבור סליקה ישראלית (Cardcom / Tranzila / Meshulam / PayPlus) כולל bit ו-Apple Pay – `src/app/checkout/page.tsx`
- העברת `data.ts` ל-Backend/CMS (Shopify Storefront / Supabase / Sanity)
- הזמנות, מיילים ומעקב משלוחים אמיתיים; חשבונות כרגע דמו מקומי
- תמונות מוצר אמיתיות במקום תמונות Unsplash הזמניות
- פרטי העסק ב-`brand.ts` ונוסחים משפטיים עם עורך דין
