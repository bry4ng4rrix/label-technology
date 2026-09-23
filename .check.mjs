import { chromium } from "playwright";
const B = "http://localhost:3111";
const ROUTES = ["/", "/services", "/services/dev", "/services/digital", "/about", "/projets", "/recru", "/blog", "/contact", "/construction", "/construction/route", "/construction/entreprise", "/construction/projets", "/mentions-legales", "/setting/login"];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });
for (const [n, w, h] of [["360", 360, 740], ["768", 768, 1024], ["1440", 1440, 900]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const errs = [], broken = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 80)); });
  page.on("response", (r) => { if (r.status() >= 400 && !r.url().includes("google")) broken.push(`${r.status()} ${r.url().split("/").pop().slice(0, 40)}`); });
  const bad = [];
  for (const p of ROUTES) {
    const r = await page.goto(B + p, { waitUntil: "networkidle", timeout: 60000 });
    const sx = await page.evaluate(() => { window.scrollTo(400, 0); return window.scrollX; });
    const imgs = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src.split("/").pop().slice(0, 40)));
    if (r.status() !== 200 || sx > 0 || imgs.length) bad.push(`${p} ${r.status()} scrollX=${sx} imgKO=${imgs.join(",")}`);
  }
  console.log(`${n}px : ${bad.length ? bad.join(" | ") : "OK"} | erreurs JS ${errs.length} | ressources KO ${[...new Set(broken)].length ? [...new Set(broken)].slice(0,3) : 0}`);
  await ctx.close();
}
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(B + "/", { waitUntil: "networkidle" });
await page.evaluate(() => window.scrollTo(0, 99999));
await page.waitForTimeout(800);
await page.locator("footer").screenshot({ path: "/tmp/claude-1000/-home-garrix-Dev-Site-label/281b2512-b01f-4190-ac9e-94132c11f606/scratchpad/shots/footer_contrast.png" });
await browser.close();
