import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/Header";
import { Footer, NewsletterSection } from "@/components/Footer";
import "@fontsource/bellefair/hebrew-400.css";
import "@fontsource/bellefair/latin-400.css";
import "@fontsource-variable/unbounded";
import "@fontsource/rubik/hebrew-700.css";
import "@fontsource/rubik/hebrew-800.css";
import "@fontsource/rubik/hebrew-900.css";
import "@fontsource/rubik/latin-800.css";
import "@fontsource/ibm-plex-sans-hebrew/hebrew-400.css";
import "@fontsource/ibm-plex-sans-hebrew/hebrew-500.css";
import "@fontsource/ibm-plex-sans-hebrew/hebrew-600.css";
import "@fontsource/ibm-plex-sans-hebrew/latin-400.css";
import "@fontsource/ibm-plex-sans-hebrew/latin-600.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "@fontsource/ibm-plex-mono/latin-500.css";
import "./v4.css";
import { CartDrawer, Toast } from "@/components/CartDrawer";
import { AuthProvider } from "@/context/AuthContext";
import { ListsProvider } from "@/context/ListsContext";
import { AccessibilityMenu, CookieBanner, WhatsAppFloat } from "@/components/extras";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: { default: `${brand.name} | ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: "חנות בוטיק לאמא ולתינוק: מוצרים שנבחרו בקפידה, מידע שקוף, משלוחים לכל הארץ.",
  icons: { icon: "/favicon.svg" },
  // גרסת תצוגה ללקוחה: לא לאנדקס
  ...(process.env.STATIC_EXPORT === "1" || process.env.PREVIEW === "1" ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: "#74261F",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        <a href="#main" className="skip-link">דילוג לתוכן הראשי</a>
        <AuthProvider>
        <CartProvider>
        <ListsProvider>
          <Header />
          <main id="main">{children}</main>
          <NewsletterSection />
          <Footer />
          <CartDrawer />
          <Toast />
          <WhatsAppFloat />
          <AccessibilityMenu />
          <CookieBanner />
        </ListsProvider>
        </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
