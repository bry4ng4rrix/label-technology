import { chromium } from "playwright";
const B = "http://localhost:3111";
const ALL = ["/", "/about", "/services", "/services/dev", "/services/marketing", "/services/digital", "/services/data", "/services/materiel", "/services/comptabilite", "/projets", "/recru", "/blog", "/blog/erp-sur-mesure-vs-odoo", "/contact", "/construction", "/construction/route", "/construction/entreprise", "/construction/projets", "/mentions-legales"];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });

// A. Sections encore sans visuel
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
console.log("Sections sans visuel :");
for (const r of ALL) {
  await page.goto(B + r, { waitUntil: "load", timeout: 60000 });
  for (let i = 1; i <= 9; i++) { await page.evaluate((k) => window.scrollTo(0, k * window.innerHeight), i); await page.waitForTimeout(220); }
  await page.waitForTimeout(600);
  const naked = await page.evaluate(() => {
    const out = [];
    document.querySelectorAll("main > section, main > div > section, main > *").forEach((s) => {
      if (!(s instanceof HTMLElement) || s.tagName === "SCRIPT") return;
      if (s.getBoundingClientRect().height < 120) return;
      if (s.querySelectorAll("img").length || s.querySelectorAll("svg:not([class*='lucide'])").length) return;
      const h = s.querySelector("h1,h2,h3");
      if (h) out.push(h.innerText.replace(/\s+/g, " ").slice(0, 42));
    });
    return [...new Set(out)];
  });
  if (naked.length) console.log(`  ${r.padEnd(32)} ${naked.join(" · ")}`);
}
await ctx.close();

// B. Régression multi-largeurs
for (const [n, w, h] of [["360", 360, 740], ["768", 768, 1024], ["1440", 1440, 900], ["1920", 1920, 1080]]) {
  const c = await browser.newContext({ viewport: { width: w, height: h } });
  const p = await c.newPage();
  const errs = [], bad = [];
  p.on("pageerror", (e) => errs.push(e.message));
  p.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 60)); });
  p.on("response", (r) => { if (r.status() >= 400 && r.url().includes("_next/image")) bad.push("img400"); });
  for (const r of ALL) {
    const res = await p.goto(B + r, { waitUntil: "load", timeout: 60000 });
    for (let i = 1; i <= 7; i++) { await p.evaluate((k) => window.scrollTo(0, k * window.innerHeight), i); await p.waitForTimeout(200); }
    await p.waitForTimeout(500);
    const m = await p.evaluate(() => ({ ko: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length, sx: (window.scrollTo(600, 0), window.scrollX) }));
    if (res.status() !== 200 || m.sx > 0 || m.ko) bad.push(`${r} ${res.status()} sx=${m.sx} imgKO=${m.ko}`);
  }
  console.log(`\n${n.padStart(4)}px : ${bad.length ? bad.slice(0, 3).join(" | ") : "OK"} | erreurs JS ${errs.length}`);
  await c.close();
}
await browser.close();
