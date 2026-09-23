import { chromium } from "playwright";
const MOBILE = process.argv[3] === "mobile";
const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome-stable" });
const ctx = await browser.newContext({
  viewport: MOBILE ? { width: 390, height: 844 } : { width: 1440, height: 900 },
  deviceScaleFactor: MOBILE ? 3 : 1,
});
const page = await ctx.newPage();
if (MOBILE) {
  const cdp = await ctx.newCDPSession(page);
  await cdp.send("Network.emulateNetworkConditions", { offline: false, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8, latency: 150 });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
}
await page.addInitScript(() => {
  window.__v = { lcp: 0, cls: 0, tbt: 0 };
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__v.lcp = e.startTime; }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__v.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
  new PerformanceObserver((l) => { for (const e of l.getEntries()) window.__v.tbt += e.duration; }).observe({ type: "longtask", buffered: true });
});
await page.goto(process.argv[2], { waitUntil: "load", timeout: 90000 });
await page.waitForTimeout(MOBILE ? 5000 : 3000);
const m = await page.evaluate(() => {
  const nav = performance.getEntriesByType("navigation")[0];
  const fcp = performance.getEntriesByName("first-contentful-paint")[0];
  const rs = performance.getEntriesByType("resource");
  return {
    ttfb: Math.round(nav.responseStart), fcp: Math.round(fcp?.startTime || 0),
    lcp: Math.round(window.__v.lcp), cls: +window.__v.cls.toFixed(3), tbt: Math.round(window.__v.tbt),
    kb: Math.round(rs.reduce((a, r) => a + (r.transferSize || 0), 0) / 1024), n: rs.length,
    top: rs.map((r) => ({ u: r.name.split("/").pop().slice(0, 42), kb: Math.round((r.transferSize || 0) / 1024) })).sort((a, b) => b.kb - a.kb).slice(0, 5),
  };
});
console.log(`${MOBILE ? "MOBILE" : "DESKTOP"} | TTFB ${m.ttfb} | FCP ${m.fcp} | LCP ${m.lcp} | CLS ${m.cls} | TBT ${m.tbt} | ${m.kb} Ko / ${m.n} req`);
console.log("  plus lourdes :", m.top.map((t) => `${t.u} ${t.kb}Ko`).join(" | "));
await browser.close();
