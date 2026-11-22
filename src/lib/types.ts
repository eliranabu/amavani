export type PurchaseType = "direct" | "affiliate";

export type AgeGroup = "pregnancy" | "0-6m" | "6-12m" | "1-3y";

export type Tone = "sage" | "rose" | "sand" | "stone" | "terracotta" | "ivory";
export type Shape = "arch" | "circle" | "pill" | "wave" | "drop" | "stack";

export interface Variant {
  id: string;
  label: string;
  /** צבע לתצוגת swatch, אם רלוונטי */
  swatch?: string;
  inStock: boolean;
}

export interface Review {
  author: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  short: string;
  description: string;
  price: number;
  /** מחיר קודם – רק כשיש הנחה אמיתית */
  compareAt?: number;
  category: string;
  productType: string;
  ages: AgeGroup[];
  ageRange: string;
  purchaseType: PurchaseType;
  partner?: { name: string; url: string };
  variantLabel?: string;
  variants?: Variant[];
  badge?: string;
  inStock: boolean;
  tone: Tone;
  shape: Shape;
  /** נתיב לתמונות אמיתיות כשיהיו (יחס 4:5). כל עוד ריק – מוצג placeholder מעוצב */
  images?: string[];
  benefits: string[];
  specs: Record<string, string>;
  materials: string;
  care: string;
  safety: string;
  /** ביקורות אמיתיות בלבד. במוצרי דמו – ריק */
  reviews: Review[];
  bestSeller?: boolean;
  creatorPick?: string;
}

export interface Category {
  slug: string;
  image?: string;
  name: string;
  description: string;
  tone: Tone;
  shape: Shape;
}

export interface Guide {
  slug: string;
  image?: string;
  title: string;
  excerpt: string;
  readTime: string;
  tone: Tone;
  shape: Shape;
  body: string[];
  relatedProducts: string[];
}
