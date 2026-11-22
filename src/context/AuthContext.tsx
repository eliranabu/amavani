"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { demoLogin, demoLogout, demoRegister, demoSession, demoUpdateUser, type DemoUser } from "@/lib/demo-store";

export type User = DemoUser;
type Result = { ok: true } | { ok: false; error: string };

interface AuthState {
  user: User | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<Result>;
  register: (input: Omit<User, "id"> & { password: string }) => Promise<Result>;
  logout: () => void;
  updateProfile: (patch: Partial<Pick<User, "firstName" | "lastName" | "phone">>) => void;
}

const Ctx = createContext<AuthState | null>(null);

/** כרגע מימוש דמו (localStorage). בשלב החיבור מחליפים למימוש Supabase Auth – הממשק זהה */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => { setUser(demoSession()); setReady(true); }, []);

  const login = useCallback<AuthState["login"]>(async (email, password) => {
    const r = await demoLogin(email, password);
    if (r.ok) setUser(r.user);
    return r.ok ? { ok: true } : r;
  }, []);
  const register = useCallback<AuthState["register"]>(async (input) => {
    const r = await demoRegister(input);
    if (r.ok) setUser(r.user);
    return r.ok ? { ok: true } : r;
  }, []);
  const logout = useCallback(() => { demoLogout(); setUser(null); }, []);
  const updateProfile = useCallback<AuthState["updateProfile"]>((patch) => {
    setUser((u) => (u ? demoUpdateUser(u.id, patch) ?? u : u));
  }, []);

  const value = useMemo(() => ({ user, ready, login, register, logout, updateProfile }), [user, ready, login, register, logout, updateProfile]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth must be used inside AuthProvider");
  return c;
}
