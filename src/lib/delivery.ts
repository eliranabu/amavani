/** חישוב טווח תאריכי הגעה בימי עסקים בישראל (א׳–ה׳; שישי ושבת לא נספרים). חגים – להוסיף ברשימה */
const HOLIDAYS: string[] = []; // "2026-12-25" וכו'

function addBusinessDays(from: Date, days: number) {
  const d = new Date(from);
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay(); // 5 = שישי, 6 = שבת
    if (day === 5 || day === 6 || HOLIDAYS.includes(d.toISOString().slice(0, 10))) continue;
    added++;
  }
  return d;
}

const fmt = new Intl.DateTimeFormat("he-IL", { weekday: "long", day: "numeric", month: "numeric" });

export function deliveryWindow(minDays: number, maxDays: number, now = new Date()) {
  // הזמנה אחרי 13:00 נשלחת ביום העסקים הבא
  const start = now.getHours() >= 13 ? addBusinessDays(now, 1) : now;
  return { from: fmt.format(addBusinessDays(start, minDays)), to: fmt.format(addBusinessDays(start, maxDays)) };
}
