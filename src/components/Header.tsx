"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { brand } from "@/lib/brand";
import { categories, searchProducts } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";
import { ProductImage } from "./ProductImage";
import { IconBag, IconChevron, IconClose, IconHeart, IconMenu, IconSearch, IconUser } from "./Icons";
import { useLists } from "@/context/ListsContext";
import { useDialog } from "./ui";

export function Logo() {
  return (
    <Link href="/" className="logo">
      <span className="logo__name">{brand.name}<span className="visually-hidden"> – לעמוד הבית</span></span>
      <span className="logo__sub" lang="en" aria-hidden="true">IMA✦ME</span>
    </Link>
  );
}

const SUGGESTIONS = ["מוסלין", "שק שינה", "תיק החתלה", "מתנה", "האכלה"];

export function Header() {
  const { count, open: openCart } = useCart();
  const { wishlist } = useLists();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    try { const v = localStorage.getItem("marquee-paused") === "1"; setPaused(v); document.documentElement.classList.toggle("marquee-paused", v); } catch {}
  }, []);
  const toggleMarquee = () => {
    const v = !paused; setPaused(v);
    document.documentElement.classList.toggle("marquee-paused", v);
    try { localStorage.setItem("marquee-paused", v ? "1" : "0"); } catch {}
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <>
      <div className="announcement" role="region" aria-label="הודעות האתר">
        <p className="visually-hidden">{brand.announcement}</p>
        <button
          type="button" className="marquee-toggle" onClick={toggleMarquee} aria-pressed={paused}
          aria-label={paused ? "הפעלת הטקסט הנע" : "עצירת הטקסט הנע"}
        >
          {paused ? "▶" : "❚❚"}
        </button>
        <div className="marquee" aria-hidden="true">
          {[0, 1].map((g) => (
            <div className="marquee__group" key={g}>
              {Array.from({ length: 4 }).flatMap((_, i) => brand.marquee.map((m, j) => (
                <span className="marquee__item" key={`${i}-${j}`}>{m}<span className="marquee__star">✦</span></span>
              )))}
            </div>
          ))}
        </div>
      </div>
      <header className={`header${scrolled ? " is-scrolled" : ""}`}>
        <div className="container header__row">
          <div className="header__start">
            <button className="icon-btn header__menu-btn" aria-label="פתיחת תפריט" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
              <IconMenu />
            </button>
            <button className="icon-btn header__search-mobile" aria-label="חיפוש" onClick={() => setSearchOpen(true)}>
              <IconSearch />
            </button>
          </div>
          <nav className="header__nav" aria-label="ניווט ראשי">
            <ul>
              <li><Link href="/products" aria-current={pathname === "/products" ? "page" : undefined}>החנות</Link></li>
              <li><Link href="/creator-picks" aria-current={pathname === "/creator-picks" ? "page" : undefined}>בחירות האמא</Link></li>
              <li><Link href="/guides" aria-current={pathname.startsWith("/guides") ? "page" : undefined}>מדריכים</Link></li>
              <li><Link href="/deals" className="nav-deals" aria-current={pathname === "/deals" ? "page" : undefined}>מבצעים</Link></li>
            </ul>
          </nav>
          <Logo />
          <div className="header__end">
            <button className="header__search-desktop" onClick={() => setSearchOpen(true)}>
              <IconSearch /> חיפוש
            </button>
            <Link href="/wishlist" className="icon-btn header__wish" aria-label={`מועדפים, ${wishlist.length} פריטים`}>
              <IconHeart />
              {wishlist.length > 0 && <span className="count-bubble" aria-hidden="true">{wishlist.length}</span>}
            </Link>
            <Link href="/account" className="icon-btn header__account" aria-label="החשבון שלי"><IconUser /></Link>
            <button className="icon-btn" aria-label={`סל קניות, ${count} פריטים`} onClick={openCart}>
              <IconBag />
              {count > 0 && <span className="count-bubble" aria-hidden="true">{count}</span>}
            </button>
          </div>
        </div>
        <nav className="header__cats" aria-label="קטגוריות">
          <ul className="container">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${c.slug}`} aria-current={pathname === `/category/${c.slug}` ? "page" : undefined}>{c.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <MobileMenu open={menuOpen} onClose={closeMenu} />
      <SearchModal open={searchOpen} onClose={closeSearch} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useDialog(open, onClose);
  return (
    <>
      <div className={`overlay${open ? " is-open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div ref={ref} className={`drawer drawer--start${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="תפריט" aria-hidden={!open} inert={!open}>
        <div className="drawer__head">
          <Logo />
          <button className="icon-btn" onClick={onClose} aria-label="סגירת תפריט"><IconClose /></button>
        </div>
        <div className="drawer__body">
          <nav className="mobile-nav" aria-label="ניווט ראשי">
            {categories.map((c) => (
              <Link key={c.slug} href={`/category/${c.slug}`}>{c.name} <IconChevron width={16} height={16} /></Link>
            ))}
            <Link href="/creator-picks">בחירות האמא <IconChevron width={16} height={16} /></Link>
            <Link href="/deals" style={{ color: "var(--color-sale-text)" }}>מבצעים וקופונים <IconChevron width={16} height={16} /></Link>
            <Link href="/guides">מדריכים ותוכן <IconChevron width={16} height={16} /></Link>
            <Link href="/registry">רשימת לידה <IconChevron width={16} height={16} /></Link>
          </nav>
          <div className="mobile-nav mobile-nav__secondary" style={{ marginTop: 24 }}>
            <Link href="/wishlist">המועדפים שלי</Link>
            <Link href="/track">מעקב הזמנה</Link>
            <Link href="/gift-card">כרטיס מתנה</Link>
            <Link href="/about">אודות</Link>
            <Link href="/faq">שאלות נפוצות</Link>
            <Link href="/policies/shipping">משלוחים</Link>
            <Link href="/policies/returns">החזרות וביטולים</Link>
            <Link href="/contact">יצירת קשר</Link>
          </div>
        </div>
      </div>
    </>
  );
}

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useDialog(open, onClose);
  const [q, setQ] = useState("");
  const router = useRouter();
  const results = searchProducts(q).slice(0, 6);

  const [recentQ, setRecentQ] = useState<string[]>([]);
  useEffect(() => { if (!open) setQ(""); else { try { setRecentQ(JSON.parse(localStorage.getItem("recent-searches") ?? "[]")); } catch {} } }, [open]);
  const go = (term: string) => {
    const t = term.trim(); if (!t) return;
    try { localStorage.setItem("recent-searches", JSON.stringify([t, ...recentQ.filter((x) => x !== t)].slice(0, 5))); } catch {}
    router.push(`/search?q=${encodeURIComponent(t)}`);
  };

  return (
    <>
      <div className={`overlay${open ? " is-open" : ""}`} onClick={onClose} aria-hidden="true" />
      <div ref={ref} className={`modal${open ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label="חיפוש" aria-hidden={!open} inert={!open}>
        <div className="container search">
          <form
            role="search"
            onSubmit={(e) => { e.preventDefault(); go(q); }}
          >
            <div className="search__field">
              <IconSearch />
              <label htmlFor="site-search" className="visually-hidden">חיפוש באתר</label>
              <input
                id="site-search" data-autofocus type="search" value={q} onChange={(e) => setQ(e.target.value)}
                placeholder="מה מחפשות היום?" autoComplete="off"
                aria-controls="search-suggestions"
              />
              <button type="button" className="icon-btn" onClick={onClose} aria-label="סגירת חיפוש"><IconClose /></button>
            </div>
          </form>

          <div id="search-suggestions" aria-live="polite">
            {!q.trim() && (
              <>
                {recentQ.length > 0 && (
                  <>
                    <p className="muted" style={{ marginTop: 20, fontSize: 14 }}>חיפשת לאחרונה</p>
                    <div className="search__suggest">{recentQ.map((s) => <button key={s} className="chip" onClick={() => go(s)}>{s}</button>)}</div>
                  </>
                )}
                <p className="muted" style={{ marginTop: 20, fontSize: 14 }}>חיפושים פופולריים</p>
                <div className="search__suggest">
                  {SUGGESTIONS.map((s) => <button key={s} className="chip" onClick={() => setQ(s)}>{s}</button>)}
                </div>
              </>
            )}
            {q.trim() && results.length > 0 && (
              <div className="search__results">
                {results.map((p) => (
                  <Link key={p.id} href={`/product/${p.slug}`} className="search__item">
                    <div style={{ aspectRatio: "4/5", borderRadius: 8, overflow: "hidden" }}>
                      <ProductImage tone={p.tone} shape={p.shape} src={p.images?.[0]} alt="" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 500 }}>{p.name}</div>
                      <div className="muted" style={{ fontSize: 13 }}>{p.purchaseType === "affiliate" ? "רכישה באתר שותף" : p.brand}</div>
                    </div>
                    <div style={{ fontWeight: 600 }}>{formatPrice(p.price)}</div>
                  </Link>
                ))}
                <Link href={`/search?q=${encodeURIComponent(q.trim())}`} className="text-link" style={{ marginTop: 12, justifySelf: "start" }}>
                  לכל התוצאות עבור ״{q.trim()}״
                </Link>
              </div>
            )}
            {q.trim() && results.length === 0 && (
              <div style={{ marginTop: 24 }}>
                <p style={{ fontWeight: 500 }}>לא מצאנו תוצאות עבור ״{q.trim()}״</p>
                <p className="muted" style={{ fontSize: 14, marginTop: 4 }}>אפשר לנסות מילה אחרת, או להתחיל מאחת הקטגוריות:</p>
                <div className="search__suggest">
                  {categories.map((c) => <Link key={c.slug} className="chip" href={`/category/${c.slug}`}>{c.name}</Link>)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
