import { chromium } from "playwright";
const B = "http://localhost:3111";
const R = ["/services", "/services/dev", "/services/marketing", "/services/digital", "/services/data", "/services/materiel", "/services/comptabilite"];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });
console.log("page                      photos   au chargement   après scroll complet");
for (const r of R) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(B + r, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1800);
  const initial = await page.evaluate(() => Math.round(performance.getEntriesByType("resource").reduce((a, x) => a + (x.transferSize || 0), 0) / 1024));
  for (let i = 1; i <= 9; i++) { await page.evaluate((k) => window.scrollTo(0, k * window.innerHeight), i); await page.waitForTimeout(350); }
  await page.waitForTimeout(1500);
  const m = await page.evaluate(() => {
    const imgs = [...document.images].filter((i) => decodeURIComponent(i.src).includes("/images/services/"));
    const rs = performance.getEntriesByType("resource");
    return {
      n: imgs.length, ko: imgs.filter((i) => i.complete && i.naturalWidth === 0).length,
      imgKb: Math.round(rs.filter((x) => decodeURIComponent(x.name).includes("/images/services/")).reduce((a, x) => a + (x.transferSize || 0), 0) / 1024),
      totKb: Math.round(rs.reduce((a, x) => a + (x.transferSize || 0), 0) / 1024),
    };
  });
  console.log(`${r.padEnd(24)} ${String(m.n).padStart(4)} (${m.ko} KO)  ${String(initial).padStart(5)} Ko      ${String(m.totKb).padStart(5)} Ko (images ${m.imgKb} Ko)`);
  await ctx.close();
}
await browser.close();
