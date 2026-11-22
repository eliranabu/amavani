"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

/** מועדפים, נצפו לאחרונה ורשימת לידה – נשמרים בדפדפן (localStorage). בשלב הבא: סנכרון לחשבון משתמש */
interface Lists {
  wishlist: string[];
  recent: string[];
  registry: string[];
  ready: boolean;
  toggleWish: (slug: string) => void;
  isWished: (slug: string) => boolean;
  pushRecent: (slug: string) => void;
  toggleRegistry: (slug: string) => void;
  inRegistry: (slug: string) => boolean;
}

const Ctx = createContext<Lists | null>(null);
const KEY = "store-lists-v1";

export function ListsProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [registry, setRegistry] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const d = JSON.parse(localStorage.getItem(KEY) ?? "{}");
      setWishlist(d.wishlist ?? []); setRecent(d.recent ?? []); setRegistry(d.registry ?? []);
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ wishlist, recent, registry })); } catch {}
  }, [wishlist, recent, registry, ready]);

  const toggle = (arr: string[], s: string) => (arr.includes(s) ? arr.filter((x) => x !== s) : [s, ...arr]);
  const toggleWish = useCallback((s: string) => setWishlist((a) => toggle(a, s)), []);
  const toggleRegistry = useCallback((s: string) => setRegistry((a) => toggle(a, s)), []);
  const pushRecent = useCallback((s: string) => setRecent((a) => [s, ...a.filter((x) => x !== s)].slice(0, 8)), []);

  return (
    <Ctx.Provider value={{
      wishlist, recent, registry, ready, toggleWish, pushRecent, toggleRegistry,
      isWished: (s) => wishlist.includes(s), inRegistry: (s) => registry.includes(s),
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useLists() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useLists must be used inside ListsProvider");
  return c;
}
