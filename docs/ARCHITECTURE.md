# ארכיטקטורה (טיוטה – לא מומשה)

הכול כאן הצעה לאישור. שום דבר מזה עוד לא נבנה, ושום שירות חיצוני לא נוצר.

## עקרונות
1. **מחירים, קופונים ומלאי נקבעים בשרת בלבד.** הדפדפן שולח מזהי מוצר וכמויות, והשרת מחשב סכום (`lib/pricing.ts`).
2. **ספקים מאחורי ממשק (adapter).** סליקה, מייל וספק Dropshipping מוגדרים כממשק, כך שהחלפת ספק לא נוגעת בשאר הקוד.
3. **המותג הוא קונפיגורציה.** שם, לוגו, מיילים ופרטי עסק ב-`brand.ts` וב-env. החלפת שם = שינוי במקום אחד.
4. **RLS מופעל על כל טבלה כברירת מחדל.** בלי policy אין גישה. כל policy נבדקת בבדיקה אוטומטית.

## Stack מוצע
| שכבה | בחירה | סיבה |
|---|---|---|
| Frontend | Next.js 16 (קיים) | |
| DB + Auth + Storage | Supabase (Postgres, RLS) | RLS מופיע באפיון; כולל התחברות ואחסון תמונות |
| לוגיקה בשרת | Route Handlers / Server Actions ב-Next + Edge Functions ל-webhooks | |
| מייל | Resend (או Postmark) | |
| סליקה | PayPlus / Cardcom / Tranzila (לבחירה) | |
| פריסה | Vercel | |
| בדיקות | Vitest (קיים) + Playwright (E2E ונגישות עם axe) | |

## מודל נתונים (טיוטה)
- `profiles` (id → auth.users, שם, טלפון, `role`: customer/admin)
- `addresses` (user_id, כתובת)
- `categories`, `products` (כולל `purchase_type`: direct/affiliate, `partner_url`, `supplier_id`, `supplier_sku`), `product_variants` (מלאי), `product_images`
- `coupons` (קוד, סוג, ערך, תוקף, מינימום הזמנה, מגבלת שימושים), `coupon_redemptions`
- `orders` (סטטוס, סכומים, כתובת, מתנה, מזהה עסקת סליקה), `order_items` (**צילום מחיר ושם ברגע הרכישה**), `order_events` (יומן סטטוסים)
- `affiliate_clicks` (product_id, זמן, referrer, ללא PII), `wishlists`, `registries`
- `guides`, `creator_picks`, `site_content` (תוכן ניהולי)
- `suppliers`, `supplier_sync_log`
- `audit_log` (מי שינה מה בלוח הניהול)
- `stock_alerts` ("עדכנו אותי כשיחזור"), `newsletter_subscribers` (עם הסכמה)

## מדיניות RLS (עקרונות)
- קטלוג (מוצרים פעילים, קטגוריות, מדריכים): קריאה לכולם, כתיבה ל-admin בלבד.
- `profiles`, `addresses`, `wishlists`, `registries`: המשתמשת רואה ומשנה רק את שלה.
- `orders` / `order_items`: קריאה לבעלת ההזמנה ול-admin; **יצירה ועדכון סטטוס רק מהשרת** (service role), לא מהדפדפן.
- `coupons`: אין קריאה ישירה מהלקוח; אימות דרך פונקציית שרת.
- `affiliate_clicks`: הוספה דרך השרת בלבד; קריאה ל-admin.
- תפקיד admin נקבע בטבלה ולא ב-user_metadata שהמשתמשת יכולה לערוך.

## זרימת הזמנה
1. Checkout שולח `{items:[{slug,variantId,qty}], coupon, shipping, address}`.
2. השרת טוען מחירים ממסד הנתונים, בודק מלאי וקופון, ויוצר `orders` בסטטוס `pending`.
3. השרת פותח עמוד תשלום אצל הספק ומחזיר URL.
4. webhook מהספק (חתום, idempotent) מעדכן ל-`paid`, מוריד מלאי, שולח מייל ומעביר לספק Dropshipping.
5. עמוד הצלחה וקישור מעקב.

## Affiliate
קישור `/go/[slug]` מתעד קליק בשרת ומפנה (302) ל-`partner_url` עם `rel="sponsored"`. הדוח בלוח הניהול מקבץ לפי מוצר ותאריך.

## לוח ניהול `/admin`
מוגן בתפקיד admin (middleware + RLS). מסכים: מוצרים ומלאי, קטגוריות, הזמנות, קופונים, תוכן, Affiliate, ספק. כל שינוי נרשם ב-`audit_log`.

## אבטחה
- מפתח service role רק בשרת; לעולם לא ב-`NEXT_PUBLIC_*`.
- אימות חתימה ב-webhooks, Rate limit על התחברות, קופונים והרשמה לניוזלטר.
- כותרות אבטחה ו-CSP; ולידציה (zod) לכל קלט.
- אין שמירת פרטי כרטיס אצלנו. הסליקה בעמוד מתארח של הספק.
- הסכמה לדיוור (חוק הספאם) ומדיניות פרטיות.
