import { defineConfig, devices } from "@playwright/test";

const isStatic = process.env.E2E_STATIC === "1"; // בודק את תיקיית out/ הסטטית
const PORT = isStatic ? 3101 : 3100;
// בסביבות שבהן Chromium מותקן מראש (למשל הסביבה של Claude Code) אפשר להגדיר CHROMIUM_PATH
const executablePath = process.env.CHROMIUM_PATH;

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: { baseURL: `http://localhost:${PORT}`, trace: "off", launchOptions: { executablePath } },
  webServer: {
    command: isStatic ? `node tests/serve-out.mjs ${PORT}` : `npx next start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], launchOptions: { executablePath } } },
    { name: "mobile", use: { ...devices["Pixel 7"], launchOptions: { executablePath } } },
  ],
});
