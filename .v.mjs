import { chromium } from "playwright";
const B = "http://localhost:3111";
const ALL = ["/", "/services", "/services/dev", "/services/marketing", "/services/digital", "/services/data", "/services/materiel", "/services/comptabilite", "/about", "/projets", "/recru", "/blog", "/contact", "/construction"];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });

// 1. Aucune image cassée nulle part (la config images touche tout le site)
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
const http400 = [];
page.on("response", (r) => { if (r.status() >= 400 && r.url().includes("_next/image")) http400.push(r.url().slice(-70)); });
let brokenTotal = 0;
for (const r of ALL) {
  await page.goto(B + r, { waitUntil: "load", timeout: 60000 });
  for (let i = 1; i <= 8; i++) { await page.evaluate((k) => window.scrollTo(0, k * window.innerHeight), i); await page.waitForTimeout(280); }
  await page.waitForTimeout(900);
  const ko = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
  brokenTotal += ko;
  if (ko) console.log("IMAGES CASSÉES", r, ko);
}
console.log(`14 pages parcourues — images cassées : ${brokenTotal} | réponses _next/image >=400 : ${http400.length}`);
await ctx.close();

// 2. Poids des pages services
console.log("\npage                      photos  au chargement  scroll complet  (images)");
for (const r of ALL.slice(1, 8)) {
  const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await c.newPage();
  await p.goto(B + r, { waitUntil: "load", timeout: 60000 });
  await p.waitForTimeout(1600);
  const initial = await p.evaluate(() => Math.round(performance.getEntriesByType("resource").reduce((a, x) => a + (x.transferSize || 0), 0) / 1024));
  for (let i = 1; i <= 9; i++) { await p.evaluate((k) => window.scrollTo(0, k * window.innerHeight), i); await p.waitForTimeout(320); }
  await p.waitForTimeout(1300);
  const m = await p.evaluate(() => {
    const imgs = [...document.images].filter((i) => decodeURIComponent(i.src).includes("/images/services/"));
    const rs = performance.getEntriesByType("resource");
    return { n: imgs.length,
      imgKb: Math.round(rs.filter((x) => decodeURIComponent(x.name).includes("/images/services/")).reduce((a, x) => a + (x.transferSize || 0), 0) / 1024),
      totKb: Math.round(rs.reduce((a, x) => a + (x.transferSize || 0), 0) / 1024) };
  });
  console.log(`${r.padEnd(24)} ${String(m.n).padStart(4)}   ${String(initial).padStart(5)} Ko     ${String(m.totKb).padStart(5)} Ko    ${String(m.imgKb).padStart(4)} Ko`);
  await c.close();
}
await browser.close();
