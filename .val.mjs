import { chromium } from "playwright";
const B = "http://localhost:3111";
const R = ["/services", "/services/dev", "/services/marketing", "/services/digital", "/services/data", "/services/materiel", "/services/comptabilite"];
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });

for (const [n, w, h] of [["360", 360, 740], ["480", 480, 900], ["768", 768, 1024], ["1024", 1024, 768], ["1200", 1200, 800], ["1440", 1440, 900], ["1920", 1920, 1080]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const errs = [], bad = [];
  page.on("pageerror", (e) => errs.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errs.push(m.text().slice(0, 70)); });
  for (const r of R) {
    const res = await page.goto(B + r, { waitUntil: "networkidle", timeout: 60000 });
    const sx = await page.evaluate(() => { window.scrollTo(600, 0); return window.scrollX; });
    const ko = await page.evaluate(() => [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length);
    if (res.status() !== 200 || sx > 0 || ko) bad.push(`${r} ${res.status()} sx=${sx} imgKO=${ko}`);
  }
  console.log(`${n.padStart(4)}px : ${bad.length ? bad.join(" | ") : "OK"} | erreurs JS ${errs.length}`);
  await ctx.close();
}

// Accessibilité
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
console.log("\nAccessibilité :");
for (const r of R) {
  await page.goto(B + r, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(500);
  const a = await page.evaluate(() => {
    const o = { h1: document.querySelectorAll("h1").length, noAlt: 0, jumps: [], emptyLink: 0 };
    document.querySelectorAll("img").forEach((i) => { if (!i.hasAttribute("alt")) o.noAlt++; });
    let prev = 0;
    document.querySelectorAll("h1,h2,h3,h4").forEach((h) => {
      const l = +h.tagName[1]; if (prev && l > prev + 1) o.jumps.push(`h${prev}→h${l}`); prev = l;
    });
    document.querySelectorAll("a,button").forEach((el) => {
      const t = (el.innerText || "").trim();
      if (!t && !el.getAttribute("aria-label") && !el.querySelector("svg")) o.emptyLink++;
    });
    return o;
  });
  const i = [];
  if (a.h1 !== 1) i.push(`${a.h1} h1`);
  if (a.noAlt) i.push(`${a.noAlt} img sans alt`);
  if (a.jumps.length) i.push(`sauts ${[...new Set(a.jumps)]}`);
  if (a.emptyLink) i.push(`${a.emptyLink} lien sans nom`);
  console.log(`  ${r.padEnd(26)} ${i.length ? i.join(" | ") : "OK"}`);
}

// Poids
console.log("\nPoids par page :");
for (const r of R) {
  await page.goto(B + r, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => {
    const rs = performance.getEntriesByType("resource");
    return { kb: Math.round(rs.reduce((a, x) => a + (x.transferSize || 0), 0) / 1024), n: rs.length,
             img: rs.filter((x) => x.initiatorType === "img").length };
  });
  console.log(`  ${r.padEnd(26)} ${String(m.kb).padStart(4)} Ko / ${m.n} req / ${m.img} images`);
}
await ctx.close();

// Mouvement réduit
const c3 = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
const p3 = await c3.newPage();
await p3.goto(B + "/services/dev", { waitUntil: "networkidle" });
await p3.waitForTimeout(600);
console.log("\nprefers-reduced-motion :", JSON.stringify(await p3.evaluate(() => ({
  blob: getComputedStyle(document.querySelector(".svc-blob")).animationName,
  reveal: getComputedStyle(document.querySelector(".reveal")).opacity,
}))));
await browser.close();
