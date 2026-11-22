import { describe, expect, it } from "vitest";
import { deliveryWindow } from "@/lib/delivery";

describe("deliveryWindow", () => {
  it("ראשון + 3 ימי עסקים = רביעי", () => {
    const w = deliveryWindow(3, 3, new Date(2026, 10, 22, 10, 0));
    expect(w.from).toContain("25.11");
  });
  it("לא סופר שישי ושבת: חמישי + יום עסקים אחד = ראשון", () => {
    const w = deliveryWindow(1, 1, new Date(2026, 10, 26, 10, 0));
    expect(w.from).toContain("29.11");
  });
  it("הזמנה אחרי 13:00 נדחית ליום עסקים הבא", () => {
    const before = deliveryWindow(1, 1, new Date(2026, 10, 22, 12, 0));
    const after = deliveryWindow(1, 1, new Date(2026, 10, 22, 14, 0));
    expect(before.from).not.toBe(after.from);
  });
});
