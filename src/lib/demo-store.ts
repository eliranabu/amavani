/**
 * שכבת נתונים מקומית (localStorage) לשלב הדמו: משתמשות והזמנות.
 * כשמחברים Backend אמיתי (Supabase), מחליפים את המימוש כאן ואת ה-AuthContext – הממשק נשאר.
 * אין כאן אבטחה אמיתית: אסור להשתמש בזה בפרודקשן.
 */
export interface DemoUser { id: string; email: string; firstName: string; lastName: string; phone: string }
export interface DemoOrderItem { slug: string; name: string; variant?: string; qty: number; price: number }
export interface DemoOrder {
  orderNo: string; createdAt: string; email: string; phone: string;
  items: DemoOrderItem[]; subtotal: number; discount: number; shipping: number; total: number;
  method: string; status: "received" | "preparing" | "shipped"; gift: boolean;
}

const USERS_KEY = "demo-users-v1";
const SESSION_KEY = "demo-session-v1";
const ORDERS_KEY = "demo-orders-v1";

const read = <T,>(key: string, fallback: T): T => {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback; } catch { return fallback; }
};
const write = (key: string, value: unknown) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} };

async function hash(text: string) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

type StoredUser = DemoUser & { pw: string };

export async function demoRegister(input: Omit<DemoUser, "id"> & { password: string }): Promise<{ ok: true; user: DemoUser } | { ok: false; error: string }> {
  const users = read<StoredUser[]>(USERS_KEY, []);
  const email = input.email.trim().toLowerCase();
  if (users.some((u) => u.email === email)) return { ok: false, error: "כתובת המייל כבר רשומה. אפשר להתחבר." };
  const { password, ...rest } = input;
  const user: StoredUser = { ...rest, email, id: crypto.randomUUID(), pw: await hash(password) };
  write(USERS_KEY, [...users, user]);
  write(SESSION_KEY, user.id);
  return { ok: true, user: strip(user) };
}

export async function demoLogin(email: string, password: string): Promise<{ ok: true; user: DemoUser } | { ok: false; error: string }> {
  const users = read<StoredUser[]>(USERS_KEY, []);
  const u = users.find((x) => x.email === email.trim().toLowerCase());
  if (!u || u.pw !== (await hash(password))) return { ok: false, error: "המייל או הסיסמה לא נכונים" };
  write(SESSION_KEY, u.id);
  return { ok: true, user: strip(u) };
}

export function demoSession(): DemoUser | null {
  const id = read<string | null>(SESSION_KEY, null);
  const u = read<StoredUser[]>(USERS_KEY, []).find((x) => x.id === id);
  return u ? strip(u) : null;
}

export function demoLogout() { try { localStorage.removeItem(SESSION_KEY); } catch {} }

export function demoUpdateUser(id: string, patch: Partial<Pick<DemoUser, "firstName" | "lastName" | "phone">>): DemoUser | null {
  const users = read<StoredUser[]>(USERS_KEY, []);
  const i = users.findIndex((u) => u.id === id);
  if (i < 0) return null;
  users[i] = { ...users[i], ...patch };
  write(USERS_KEY, users);
  return strip(users[i]);
}

const strip = ({ pw: _pw, ...u }: StoredUser): DemoUser => u;

export const demoOrders = (): DemoOrder[] => read<DemoOrder[]>(ORDERS_KEY, []);
export function demoAddOrder(o: DemoOrder) { write(ORDERS_KEY, [o, ...demoOrders()]); }
export const demoOrdersFor = (email: string) => demoOrders().filter((o) => o.email.toLowerCase() === email.toLowerCase());
export function demoFindOrder(orderNo: string, phone: string) {
  const digits = (s: string) => s.replace(/\D/g, "");
  return demoOrders().find((o) => o.orderNo === orderNo && digits(o.phone) === digits(phone)) ?? null;
}
