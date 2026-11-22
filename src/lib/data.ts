import type { AgeGroup, Category, Guide, Product } from "./types";

/**
 * נתוני דמו בלבד.
 * מוצרים, מותגים ומחירים מומצאים לצורך בדיקת העיצוב והזרימות.
 * אין כאן ביקורות, תקנים או הבטחות בטיחות – יש להזין אותם רק ממקור אמיתי.
 */

export const ageLabels: Record<AgeGroup, string> = {
  pregnancy: "היריון",
  "0-6m": "0-6 חודשים",
  "6-12m": "6-12 חודשים",
  "1-3y": "1-3 שנים",
};

export const categories: Category[] = [
  { slug: "baby", image: "/images/cat-baby.jpg", name: "לתינוק", description: "בגדים, טקסטיל ואביזרים יומיומיים לתינוק", tone: "sand", shape: "arch" },
  { slug: "mom", image: "/images/cat-mom.jpg", name: "לאמא", description: "היריון, אחרי לידה והרגעים הקטנים שלך", tone: "rose", shape: "circle" },
  { slug: "feeding", image: "/images/cat-feeding.jpg", name: "האכלה והנקה", description: "כל מה שצריך לארוחה רגועה", tone: "sage", shape: "drop" },
  { slug: "sleep", image: "/images/cat-sleep.jpg", name: "שינה ורוגע", description: "שגרת ערב נעימה ולילות שקטים יותר", tone: "stone", shape: "wave" },
  { slug: "on-the-go", image: "/images/cat-on-the-go.jpg", name: "טיולים ויציאות", description: "התארגנות קלה מחוץ לבית", tone: "terracotta", shape: "pill" },
  { slug: "gifts", image: "/images/cat-gifts.jpg", name: "מתנות ולידה", description: "מתנות שמחות לקבל אחרי לידה", tone: "ivory", shape: "stack" },
];

const SAFETY_PLACEHOLDER =
  "[מוצר דמו] יש להזין כאן אזהרות בטיחות והתאמה לתקנים רק לפי מסמכים מהספק.";

export const products: Product[] = [
  {
    id: "p1", slug: "muslin-swaddle-set", images: ["/images/p-swaddle-1.jpg", "/images/p-swaddle-2.jpg"], name: "סט חיתולי טטרה מוסלין", brand: "Linnea",
    short: "3 חיתולים רכים ונושמים לעטיפה, כיסוי והנקה",
    description: "סט של שלושה חיתולי מוסלין גדולים בגוונים טבעיים. מתאימים לעטיפה, לכיסוי בעגלה, כמגבת קלה אחרי מקלחת או כמשטח החתלה מאולתר.",
    price: 129, category: "baby", productType: "טקסטיל", ages: ["0-6m", "6-12m"], ageRange: "מלידה",
    purchaseType: "direct", variantLabel: "גוון",
    variants: [
      { id: "v1", label: "חול", swatch: "#E4D8C6", inStock: true },
      { id: "v2", label: "מרווה", swatch: "#A9B4A6", inStock: true },
      { id: "v3", label: "ורוד עתיק", swatch: "#D9B8AF", inStock: false },
    ],
    badge: "הנמכר ביותר", inStock: true, tone: "sand", shape: "arch",
    benefits: ["בד נושם שמתרכך עם כל כביסה", "גודל נדיב של 120×120 ס״מ", "שימושים רבים לאורך היום"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "כמות": "3 יחידות", "מידות": "120×120 ס״מ" },
    materials: "100% כותנה (לפי הצהרת הספק – לאימות).", care: "כביסה במכונה ב-30°, ללא מרכך.",
    safety: SAFETY_PLACEHOLDER, reviews: [], bestSeller: true,
    creatorPick: "הדבר הראשון שהייתי מכניסה לתיק לבית החולים.",
  },
  {
    id: "p2", slug: "silicone-feeding-set", images: ["/images/p-feeding-1.jpg", "/images/p-feeding-2.jpg"], name: "סט האכלה מסיליקון", brand: "Morgon",
    short: "צלחת עם בסיס נצמד, קערה, כפית וכוס",
    description: "סט האכלה ראשון בגוונים רגועים. הצלחת נצמדת לשולחן כדי להפחית החלקות, והכפית בגודל שמתאים לידיים קטנות.",
    price: 159, compareAt: 189, category: "feeding", productType: "כלי אוכל", ages: ["6-12m", "1-3y"], ageRange: "מגיל 6 חודשים",
    purchaseType: "direct", variantLabel: "גוון",
    variants: [
      { id: "v1", label: "מרווה", swatch: "#A9B4A6", inStock: true },
      { id: "v2", label: "חול", swatch: "#E4D8C6", inStock: true },
    ],
    badge: "מבצע", inStock: true, tone: "sage", shape: "circle",
    benefits: ["בסיס נצמד לשולחן", "מתאים למדיח", "4 פריטים בסט אחד"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "פריטים": "צלחת, קערה, כפית, כוס", "משקל": "יעודכן לפי הספק" },
    materials: "סיליקון (סוג ותקן – לפי מסמכי הספק).", care: "מתאים למדיח כלים, מומלץ בסל העליון.",
    safety: SAFETY_PLACEHOLDER, reviews: [], bestSeller: true,
  },
  {
    id: "p3", slug: "nursing-pillow", images: ["/images/p-pillow-1.jpg", "/images/p-pillow-2.jpg"], name: "כרית הנקה רב-שימושית", brand: "Saga Home",
    short: "תמיכה נוחה בהנקה ובהאכלה, עם ציפה נשלפת",
    description: "כרית בצורת חצי ירח שעוזרת למצוא תנוחה נוחה בהנקה או בהאכלה מבקבוק. הציפה נשלפת לכביסה.",
    price: 249, category: "feeding", productType: "כריות", ages: ["pregnancy", "0-6m"], ageRange: "מהיריון ועד חודשים ראשונים",
    purchaseType: "direct", variantLabel: "ציפה",
    variants: [
      { id: "v1", label: "פשתן טבעי", swatch: "#DCCFBD", inStock: true },
      { id: "v2", label: "אפור אבן", swatch: "#C8C3BA", inStock: true },
    ],
    inStock: true, tone: "rose", shape: "arch",
    benefits: ["ציפה נשלפת לכביסה", "צורה שתומכת בגב ובזרועות", "מתאימה גם לישיבה בהיריון"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "מידות": "יעודכן לפי הספק", "מילוי": "יעודכן לפי הספק" },
    materials: "ציפה: כותנה (לאימות מול הספק).", care: "ציפה בכביסה ב-30°. את הכרית עצמה לא מכבסים.",
    safety: "אין להשאיר תינוק לישון על הכרית או בלי השגחה. " + SAFETY_PLACEHOLDER, reviews: [], bestSeller: true,
    creatorPick: "הצילה לי את הגב בחודשים הראשונים.",
  },
  {
    id: "p4", slug: "sleep-bag-tog", images: ["/images/p-sleepbag-1.jpg", "/images/p-sleepbag-2.jpg"], name: "שק שינה קל לקיץ", brand: "Nordlys",
    short: "שק שינה נושם עם רוכסן כפול להחתלה לילית נוחה",
    description: "שק שינה ללא שרוולים לימים החמים. רוכסן כפול מאפשר החלפת חיתול בלי להוציא את התינוק מהשק.",
    price: 189, category: "sleep", productType: "שקי שינה", ages: ["0-6m", "6-12m", "1-3y"], ageRange: "לפי מידה",
    purchaseType: "direct", variantLabel: "מידה",
    variants: [
      { id: "v1", label: "0-6 ח׳", inStock: true },
      { id: "v2", label: "6-18 ח׳", inStock: true },
      { id: "v3", label: "18-36 ח׳", inStock: true },
    ],
    badge: "חדש", inStock: true, tone: "stone", shape: "wave",
    benefits: ["רוכסן כפול להחתלה לילית", "בד קל לימי קיץ", "3 מידות עד גיל 3"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "עונה": "קיץ", "מידות": "0-6, 6-18, 18-36 חודשים" },
    materials: "כותנה אורגנית (לפי הצהרת הספק – לאימות).", care: "כביסה ב-30°, ייבוש בתלייה.",
    safety: SAFETY_PLACEHOLDER, reviews: [], bestSeller: true,
  },
  {
    id: "p5", slug: "white-noise-machine", images: ["/images/p-noise-1.jpg", "/images/p-noise-2.jpg"], name: "מכשיר רעש לבן ותאורת לילה", brand: "Tova",
    short: "צלילים מרגיעים ואור עמום להנקות לילה",
    description: "מכשיר קומפקטי עם מגוון צלילים מרגיעים, טיימר כיבוי ותאורת לילה חמה בעוצמה משתנה.",
    price: 219, category: "sleep", productType: "אביזרי שינה", ages: ["0-6m", "6-12m", "1-3y"], ageRange: "מלידה",
    purchaseType: "affiliate", partner: { name: "חנות שותפה", url: "https://example.com/partner/white-noise" },
    inStock: true, tone: "sage", shape: "circle",
    benefits: ["טיימר כיבוי", "תאורה חמה בעוצמה משתנה", "טעינה ב-USB-C"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "סוללה": "יעודכן לפי השותף", "צלילים": "יעודכן לפי השותף" },
    materials: "לפי פרטי המוצר באתר השותף.", care: "ניגוב במטלית יבשה.",
    safety: "יש להציב מחוץ להישג יד התינוק. " + SAFETY_PLACEHOLDER, reviews: [],
    creatorPick: "הדבר היחיד שעבד אצלנו בשעה 3 בלילה.",
  },
  {
    id: "p6", slug: "changing-bag", images: ["/images/p-bag-1.jpg"], name: "תיק החתלה תרמיל", brand: "Morgon",
    short: "תרמיל מאורגן עם תאים, משטח החתלה וכיס מבודד",
    description: "תרמיל בעיצוב נקי שלא נראה כמו תיק החתלה. כולל משטח החתלה מתקפל, כיס מבודד לבקבוקים ורצועות לעגלה.",
    price: 349, compareAt: 399, category: "on-the-go", productType: "תיקים", ages: ["0-6m", "6-12m", "1-3y"], ageRange: "לכל הגילים",
    purchaseType: "direct", variantLabel: "צבע",
    variants: [
      { id: "v1", label: "שחור פחם", swatch: "#3A3B38", inStock: true },
      { id: "v2", label: "חול", swatch: "#D8CBB8", inStock: true },
    ],
    badge: "מבצע", inStock: true, tone: "terracotta", shape: "pill",
    benefits: ["משטח החתלה מתקפל", "כיס מבודד לבקבוקים", "רצועות לחיבור לעגלה"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "נפח": "יעודכן לפי הספק", "תאים": "12" },
    materials: "פוליאסטר ממוחזר (לפי הצהרת הספק – לאימות).", care: "ניגוב במטלית לחה.",
    safety: SAFETY_PLACEHOLDER, reviews: [], bestSeller: true,
    creatorPick: "סוף-סוף תיק שאני באמת אוהבת לסחוב.",
  },
  {
    id: "p7", slug: "stroller-organizer", images: ["/images/p-organizer-1.jpg"], name: "ארגונית לעגלה", brand: "Linnea",
    short: "כיסים לכוס, טלפון ומגבונים – בהישג יד",
    description: "ארגונית שמתחברת לידית העגלה ומחזיקה את כל הקטנות שצריך בטיול: כוס, טלפון, מפתחות ומגבונים.",
    price: 89, category: "on-the-go", productType: "אביזרי עגלה", ages: ["0-6m", "6-12m", "1-3y"], ageRange: "לכל הגילים",
    purchaseType: "affiliate", partner: { name: "חנות שותפה", url: "https://example.com/partner/organizer" },
    inStock: true, tone: "sand", shape: "pill",
    benefits: ["מתאימה לרוב העגלות", "2 מחזיקי כוסות", "כיס עם רוכסן"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "התאמה": "לפי פרטי השותף" },
    materials: "לפי פרטי המוצר באתר השותף.", care: "ניגוב במטלית לחה.",
    safety: SAFETY_PLACEHOLDER, reviews: [],
  },
  {
    id: "p8", slug: "postpartum-robe", images: ["/images/p-robe-1.jpg", "/images/p-robe-2.jpg"], name: "חלוק הנקה רך", brand: "Saga Home",
    short: "חלוק נעים עם פתחי הנקה נוחים, לבית החולים ולבית",
    description: "חלוק מבד רך ונעים עם חגורה ופתחים שמקלים על הנקה. אחד הדברים שהכי נעים לקבל בימים הראשונים.",
    price: 229, category: "mom", productType: "הלבשה", ages: ["pregnancy", "0-6m"], ageRange: "היריון ואחרי לידה",
    purchaseType: "direct", variantLabel: "מידה",
    variants: [
      { id: "v1", label: "S/M", inStock: true },
      { id: "v2", label: "L/XL", inStock: true },
    ],
    inStock: true, tone: "rose", shape: "drop",
    benefits: ["פתחי הנקה נסתרים", "בד רך ונושם", "כיסים עמוקים"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "אורך": "יעודכן לפי הספק" },
    materials: "תערובת כותנה ומודאל (לאימות מול הספק).", care: "כביסה ב-30°.",
    safety: SAFETY_PLACEHOLDER, reviews: [],
    creatorPick: "המתנה שהכי שמחתי לקבל אחרי הלידה.",
  },
  {
    id: "p9", slug: "pregnancy-body-oil", images: ["/images/p-oil-1.jpg"], name: "שמן גוף להיריון", brand: "Tova",
    short: "שמן עדין לעיסוי ולטיפוח העור בהיריון",
    description: "שמן גוף עם מרקם קליל ובישום עדין לשגרת טיפוח רגועה. רכיבים מלאים – לפי תווית היצרן.",
    price: 119, category: "mom", productType: "טיפוח", ages: ["pregnancy"], ageRange: "היריון",
    purchaseType: "affiliate", partner: { name: "חנות שותפה", url: "https://example.com/partner/body-oil" },
    inStock: true, tone: "terracotta", shape: "drop",
    benefits: ["מרקם קליל שנספג מהר", "בישום עדין", "בקבוק עם משאבה"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "נפח": "יעודכן לפי השותף" },
    materials: "רשימת רכיבים מלאה – באתר השותף.", care: "לאחסן במקום קריר.",
    safety: "מומלץ להתייעץ עם גורם רפואי לפני שימוש בתכשירים בהיריון. " + SAFETY_PLACEHOLDER, reviews: [],
  },
  {
    id: "p10", slug: "knit-blanket", images: ["/images/p-blanket-1.jpg", "/images/p-blanket-2.jpg"], name: "שמיכת סריגה לתינוק", brand: "Nordlys",
    short: "שמיכה סרוגה ורכה לעגלה ולסלון",
    description: "שמיכה סרוגה בדוגמה עדינה, במשקל שמתאים לעגלה, לכיסוי בסלון או לצילומי ניובורן.",
    price: 179, category: "baby", productType: "טקסטיל", ages: ["0-6m", "6-12m", "1-3y"], ageRange: "מלידה",
    purchaseType: "direct", variantLabel: "גוון",
    variants: [
      { id: "v1", label: "שמנת", swatch: "#F1EBDF", inStock: true },
      { id: "v2", label: "מרווה", swatch: "#A9B4A6", inStock: true },
      { id: "v3", label: "ורוד עתיק", swatch: "#D9B8AF", inStock: true },
    ],
    inStock: true, tone: "ivory", shape: "wave",
    benefits: ["סריגה רכה למגע", "גודל נוח לעגלה", "גוונים טבעיים"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "מידות": "80×100 ס״מ" },
    materials: "כותנה (לאימות מול הספק).", care: "כביסה עדינה ב-30°, ייבוש שטוח.",
    safety: "אין להשתמש כשמיכה בעריסה לתינוקות צעירים. " + SAFETY_PLACEHOLDER, reviews: [],
  },
  {
    id: "p11", slug: "teething-ring", images: ["/images/p-teether-1.jpg", "/images/p-teether-2.jpg"], name: "נשכן עץ וסיליקון", brand: "Linnea",
    short: "נשכן קל לאחיזה לתקופת צמיחת השיניים",
    description: "נשכן בצורת טבעת משולב עץ וחרוזי סיליקון, קל לאחיזה בידיים קטנות.",
    price: 49, category: "baby", productType: "צעצועים ונשכנים", ages: ["0-6m", "6-12m"], ageRange: "מגיל 3 חודשים",
    purchaseType: "direct", inStock: true, tone: "sand", shape: "circle",
    benefits: ["קל לאחיזה", "משקל קל", "חומרים טבעיים למראה"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "קוטר": "יעודכן לפי הספק" },
    materials: "עץ וסיליקון (לפי מסמכי הספק).", care: "ניקוי במים חמימים וסבון. לא להשרות את העץ.",
    safety: "לשימוש תחת השגחת מבוגר בלבד. " + SAFETY_PLACEHOLDER, reviews: [], bestSeller: true,
  },
  {
    id: "p12", slug: "bottle-set", images: ["/images/p-bottles-1.jpg"], name: "סט בקבוקי זכוכית", brand: "Morgon",
    short: "2 בקבוקים עם שרוול מגן ופטמות בזרימה איטית",
    description: "בקבוקי זכוכית עם שרוול סיליקון שמגן ומשפר אחיזה. כוללים פטמות בזרימה איטית.",
    price: 139, category: "feeding", productType: "בקבוקים", ages: ["0-6m", "6-12m"], ageRange: "מלידה",
    purchaseType: "affiliate", partner: { name: "חנות שותפה", url: "https://example.com/partner/bottles" },
    inStock: true, tone: "stone", shape: "pill",
    benefits: ["זכוכית עם שרוול מגן", "פטמה בזרימה איטית", "קל לניקוי"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "נפח": "יעודכן לפי השותף" },
    materials: "זכוכית וסיליקון – לפי פרטי השותף.", care: "לפי הוראות היצרן.",
    safety: SAFETY_PLACEHOLDER, reviews: [],
  },
  {
    id: "p13", slug: "newborn-gift-box", images: ["/images/p-giftbox-1.jpg", "/images/p-giftbox-2.jpg"], name: "מארז מתנה ללידה", brand: "אמא ואני",
    short: "מארז מוכן עם חיתול מוסלין, נשכן וכובע לתינוק",
    description: "מארז מתנה אלגנטי שנבחר בקפידה, מגיע ארוז עם כרטיס ברכה אישי.",
    price: 289, category: "gifts", productType: "מארזים", ages: ["0-6m"], ageRange: "מלידה",
    purchaseType: "direct", variantLabel: "גוון",
    variants: [
      { id: "v1", label: "טבעי", swatch: "#E4D8C6", inStock: true },
      { id: "v2", label: "מרווה", swatch: "#A9B4A6", inStock: true },
    ],
    badge: "מתנה", inStock: true, tone: "rose", shape: "stack",
    benefits: ["אריזת מתנה מוכנה", "כרטיס ברכה אישי", "3 פריטים שנבחרו יחד"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "תכולה": "חיתול מוסלין, נשכן, כובע" },
    materials: "לפי פירוט כל פריט.", care: "לפי פירוט כל פריט.",
    safety: SAFETY_PLACEHOLDER, reviews: [], bestSeller: true,
    creatorPick: "זו המתנה שאני מביאה לכל חברה שילדה.",
  },
  {
    id: "p14", slug: "mom-gift-box", images: ["/images/p-momgift-1.jpg"], name: "מארז פינוק לאמא", brand: "אמא ואני",
    short: "מארז אחרי לידה: גרבי בית, מסיכת עיניים וספל",
    description: "מארז קטן שמזכיר שגם האמא צריכה רגע לעצמה. נשלח ארוז ומוכן למסירה.",
    price: 199, compareAt: 239, category: "gifts", productType: "מארזים", ages: ["pregnancy", "0-6m"], ageRange: "אחרי לידה",
    purchaseType: "direct", badge: "מבצע", inStock: true, tone: "terracotta", shape: "stack",
    benefits: ["אריזת מתנה מוכנה", "פריטים לרגע של שקט", "כרטיס ברכה אישי"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "תכולה": "גרבי בית, מסיכת עיניים, ספל" },
    materials: "לפי פירוט כל פריט.", care: "לפי פירוט כל פריט.",
    safety: SAFETY_PLACEHOLDER, reviews: [],
  },
  {
    id: "p15", slug: "toddler-backpack", images: ["/images/p-backpack-1.jpg", "/images/p-backpack-2.jpg"], name: "תיק גן קטן", brand: "Nordlys",
    short: "תרמיל קל בגודל שמתאים לפעוטות",
    description: "תרמיל קטן וקל לפעוטות, עם רצועת חזה וכיס לבקבוק מים. מתאים לגן ולטיולים קצרים.",
    price: 99, category: "on-the-go", productType: "תיקים", ages: ["1-3y"], ageRange: "1-3 שנים",
    purchaseType: "direct", variantLabel: "צבע",
    variants: [
      { id: "v1", label: "חול", swatch: "#D8CBB8", inStock: true },
      { id: "v2", label: "טרקוטה", swatch: "#C98C7A", inStock: true },
    ],
    badge: "חדש", inStock: true, tone: "sage", shape: "arch",
    benefits: ["קל משקל", "רצועת חזה", "מקום לשם הילד/ה"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "מידות": "יעודכן לפי הספק" },
    materials: "פוליאסטר (לאימות מול הספק).", care: "ניגוב במטלית לחה.",
    safety: SAFETY_PLACEHOLDER, reviews: [],
  },
  {
    id: "p16", slug: "room-humidifier", images: ["/images/p-humid-1.jpg", "/images/p-humid-2.jpg"], name: "מכשיר אדים קריר לחדר", brand: "Tova",
    short: "אדים קרירים בעיצוב שקט שמתאים לחדר הילדים",
    description: "מכשיר אדים בעיצוב מינימליסטי, עם מיכל גדול וכיבוי אוטומטי כשהמים נגמרים.",
    price: 299, category: "sleep", productType: "אביזרי שינה", ages: ["0-6m", "6-12m", "1-3y"], ageRange: "לכל הגילים",
    purchaseType: "affiliate", partner: { name: "חנות שותפה", url: "https://example.com/partner/humidifier" },
    inStock: false, tone: "ivory", shape: "drop",
    benefits: ["כיבוי אוטומטי", "פעולה שקטה", "מיכל גדול"],
    specs: { "יצרן": "יעודכן לפי הספק", "ארץ ייצור": "יעודכן לפי הספק", "נפח מיכל": "יעודכן לפי השותף" },
    materials: "לפי פרטי המוצר באתר השותף.", care: "לפי הוראות היצרן.",
    safety: "יש להציב מחוץ להישג יד הילד. " + SAFETY_PLACEHOLDER, reviews: [],
  },
];

export const guides: Guide[] = [
  {
    slug: "before-birth-checklist", image: "/images/g-before-birth.jpg", title: "מה באמת צריך לקנות לפני הלידה?", readTime: "6 דק׳ קריאה",
    excerpt: "רשימה קצרה ומפוכחת של מה שחייב להיות בבית – ומה אפשר לקנות אחר כך.", tone: "sand", shape: "arch",
    body: [
      "[טקסט דמו] לפני הלידה קל להיגרר לרשימות ארוכות. בפועל, בשבועות הראשונים צריך פחות ממה שנדמה.",
      "התחילו מהבסיס: מקום שינה בטוח, בגדים בכמה מידות קטנות, חיתולים, ציוד רחצה פשוט ותיק לבית החולים.",
      "את השאר – אביזרי האכלה מתקדמים, צעצועים וציוד לטיולים ארוכים – אפשר להשלים לפי הצורך.",
    ],
    relatedProducts: ["muslin-swaddle-set", "nursing-pillow", "changing-bag"],
  },
  {
    slug: "first-months-gear", image: "/images/g-first-months.jpg", title: "רשימת ציוד לחודשים הראשונים", readTime: "5 דק׳ קריאה",
    excerpt: "מה עזר לנו ביום-יום בבית, בלילות ובציאות הראשונות.", tone: "sage", shape: "circle",
    body: [
      "[טקסט דמו] החודשים הראשונים הם בעיקר שינה, האכלה והחתלה. כל מוצר שמקל על אחד מהשלושה שווה את המקום שלו.",
      "בלילות – תאורה עמומה ושק שינה עם רוכסן כפול חוסכים הרבה התעוררויות מיותרות.",
    ],
    relatedProducts: ["sleep-bag-tog", "white-noise-machine", "bottle-set"],
  },
  {
    slug: "gifts-for-new-moms", image: "/images/g-gifts.jpg", title: "מתנות ליולדת שבאמת משמחות", readTime: "4 דק׳ קריאה",
    excerpt: "רעיונות למתנות שמתייחסות גם לאמא, לא רק לתינוק.", tone: "rose", shape: "stack",
    body: [
      "[טקסט דמו] רוב המתנות אחרי לידה מיועדות לתינוק. מתנה שחושבת על האמא נזכרת הרבה יותר זמן.",
      "חלוק רך, משהו לרגע של שקט או ארוחה מוכנה – כל אלה אומרים ״חשבתי עלייך״.",
    ],
    relatedProducts: ["mom-gift-box", "postpartum-robe", "newborn-gift-box"],
  },
  {
    slug: "out-of-the-house", image: "/images/g-out.jpg", title: "מוצרים שעוזרים בהתארגנות מחוץ לבית", readTime: "4 דק׳ קריאה",
    excerpt: "איך לצאת מהבית בלי לסחוב את כל הבית.", tone: "terracotta", shape: "pill",
    body: [
      "[טקסט דמו] היציאה הראשונה מהבית יכולה להרגיש כמו מבצע לוגיסטי. תיק מאורגן אחד מפשט את רוב העניין.",
      "שווה להכין מראש ערכה קבועה: חיתולים, מגבונים, בגד להחלפה וחיתול טטרה – ולהחזיר אותה למקום אחרי כל יציאה.",
    ],
    relatedProducts: ["changing-bag", "stroller-organizer", "toddler-backpack"],
  },
];

export const coupons: Record<string, { type: "percent" | "fixed"; value: number; label: string }> = {
  WELCOME10: { type: "percent", value: 10, label: "10% הנחה לרכישה ראשונה" },
  MOM20: { type: "fixed", value: 20, label: "₪20 הנחה" },
};

export const shippingMethods = [
  { id: "courier", label: "שליח עד הבית", eta: "3-5 ימי עסקים", minDays: 3, maxDays: 5, price: 29.9, freeEligible: true },
  { id: "pickup", label: "איסוף מנקודת חלוקה", eta: "3-6 ימי עסקים", minDays: 3, maxDays: 6, price: 19.9, freeEligible: true },
  { id: "express", label: "שליח אקספרס (מרכז הארץ)", eta: "1-2 ימי עסקים", minDays: 1, maxDays: 2, price: 49.9, freeEligible: false },
];

export const GIFT_WRAP_PRICE = 15;

/** טבלת מידות לשקי שינה ולהלבשה (דמו – לעדכן לפי הספק) */
export const sizeGuides: Record<string, { cols: string[]; rows: string[][] }> = {
  "sleep-bag-tog": { cols: ["מידה", "גיל", "גובה התינוק", "אורך השק"], rows: [["0-6 ח׳", "0-6 חודשים", "50-68 ס״מ", "70 ס״מ"], ["6-18 ח׳", "6-18 חודשים", "68-86 ס״מ", "90 ס״מ"], ["18-36 ח׳", "18-36 חודשים", "86-98 ס״מ", "110 ס״מ"]] },
  "postpartum-robe": { cols: ["מידה", "מידת בגד רגילה", "היקף חזה", "אורך"], rows: [["S/M", "34-38", "עד 100 ס״מ", "110 ס״מ"], ["L/XL", "40-44", "עד 116 ס״מ", "114 ס״מ"]] },
};

// ===== helpers =====
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const productsByCategory = (slug: string) => products.filter((p) => p.category === slug);
export const bestSellers = () => products.filter((p) => p.bestSeller);
export const creatorPicks = () => products.filter((p) => p.creatorPick);
export const dealProducts = () => products.filter((p) => p.compareAt && p.compareAt > p.price);
export const relatedProducts = (p: Product, n = 4) =>
  products.filter((x) => x.category === p.category && x.id !== p.id).concat(
    products.filter((x) => x.category !== p.category && x.id !== p.id)
  ).slice(0, n);

export function searchProducts(q: string) {
  const term = q.trim().toLowerCase();
  if (!term) return [];
  return products.filter((p) =>
    [p.name, p.short, p.brand, p.productType, getCategory(p.category)?.name ?? ""]
      .join(" ").toLowerCase().includes(term)
  );
}
