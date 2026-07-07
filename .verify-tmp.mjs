import { chromium } from "playwright";

const BASE = "http://localhost:3001";

const browser = await chromium.launch();
const page = await browser.newPage();
const log = (...args) => console.log(...args);

try {
  // 1. Guard redirects when logged out
  await page.goto(`${BASE}/setting`);
  await page.waitForLoadState("networkidle");
  log("1. /setting while logged out -> url:", page.url());

  // 2. Log in
  await page.goto(`${BASE}/setting/login`);
  await page.fill("#password", "labeladmin");
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/setting`, { timeout: 10000 });
  log("2. Logged in, now at:", page.url());

  // 3. Dashboard counts
  const dashboardText = await page.locator("body").innerText();
  const servicesCardCount = dashboardText.match(/Services\s*\n?\s*(\d+)/)?.[1];
  log("3. Dashboard Services count visible:", servicesCardCount);

  // 4. Services list shows 7 seeded rows
  await page.goto(`${BASE}/setting/services`);
  const rowCount = await page.locator("table tbody tr").count();
  log("4. Services table rows:", rowCount);

  // 5. Edit the "dev" service headline, save, confirm it changed on homepage
  await page.goto(`${BASE}/setting/services`);
  await page.getByRole("link", { name: /pencil|edit/i }).first().click().catch(() => {});
  // fallback: click first edit icon link directly
  if (!page.url().includes("/edit")) {
    const editLink = page.locator('a[href*="/setting/services/"][href$="/edit"]').first();
    await editLink.click();
  }
  await page.waitForURL(/\/setting\/services\/.+\/edit/);
  const headlineInput = page.locator("#headline");
  await headlineInput.fill("VERIFICATION TEST HEADLINE");

  const cookiesBefore = await page.context().cookies();
  log("   cookies before submit:", cookiesBefore.map((c) => c.name));

  page.on("response", (res) => {
    if (res.url().includes("/setting/services")) {
      log("   response:", res.status(), res.url());
    }
  });

  await page.click('button[type="submit"]');
  await page.waitForTimeout(3000);
  const cookiesAfter = await page.context().cookies();
  log("   cookies after submit:", cookiesAfter.map((c) => c.name));
  log("   url after submit:", page.url());
  await page.waitForURL(`${BASE}/setting/services`, { timeout: 10000 });
  log("5. Saved edit, back at:", page.url());

  await page.goto(`${BASE}/`);
  const homeText = await page.locator("body").innerText();
  log("6. Homepage contains updated headline:", homeText.includes("VERIFICATION TEST HEADLINE"));

  // 7. Revert the headline back
  await page.goto(`${BASE}/setting/services`);
  const editLink2 = page.locator('a[href*="/setting/services/"][href$="/edit"]').first();
  await editLink2.click();
  await page.waitForURL(/\/setting\/services\/.+\/edit/);
  await page.locator("#headline").fill("On ne livre pas du code.");
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/setting/services`, { timeout: 10000 });
  log("7. Reverted headline back to original");

  // 8. Logout
  await page.click('button:has-text("Déconnexion")');
  await page.waitForURL(`${BASE}/setting/login`, { timeout: 10000 });
  log("8. Logged out, now at:", page.url());

  await page.goto(`${BASE}/setting`);
  await page.waitForLoadState("networkidle");
  log("9. /setting after logout -> url:", page.url());

  log("ALL CHECKS DONE");
} catch (err) {
  console.error("FAILED:", err);
  process.exitCode = 1;
} finally {
  await browser.close();
}
