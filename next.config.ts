import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 מייצר תיקיית out/ סטטית (לתצוגה ללקוחה, למשל Netlify Drop).
 * ה-build הרגיל (Vercel / פרודקשן) לא מושפע.
 */
const isStatic = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"], ...(isStatic ? { unoptimized: true } : {}) },
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
};

export default nextConfig;
