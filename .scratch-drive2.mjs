import { chromium } from "playwright";

const dir = "/tmp/claude-1000/-home-garrix-Dev-Site-label/02bff9a4-7cd2-4abc-9855-d3b2abe4c875/scratchpad";
const shot = (page, name) => page.screenshot({ path: `${dir}/${name}.png`, fullPage: true });

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

const errors = [];
page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto("http://localhost:3000/setting/login");
await page.waitForSelector("input[name=password]");
await page.fill("input[name=password]", "labeladmin");
await page.click("button[type=submit]");
await page.waitForURL("**/setting");

await page.goto("http://localhost:3000/setting/jobs/candidatures");
await page.waitForTimeout(1500);
await shot(page, "candidatures-check");

const bodyText = await page.textContent("body");
console.log("HAS_ERROR_OVERLAY:", bodyText.includes("is not a function"));
console.log("HAS_CANDIDATURES_TITLE:", bodyText.includes("Candidatures"));
console.log("CONSOLE_ERRORS:", JSON.stringify(errors, null, 2));

await browser.close();
