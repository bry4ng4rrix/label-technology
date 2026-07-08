import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3002/hero-preview', { waitUntil: 'networkidle' });
await page.screenshot({ path: '/tmp/claude-1000/-home-garrix-Dev-Site-label/570ba22b-87f3-418f-9631-77aefc34418b/scratchpad/hero-desktop.png' });
await page.setViewportSize({ width: 390, height: 844 });
await page.screenshot({ path: '/tmp/claude-1000/-home-garrix-Dev-Site-label/570ba22b-87f3-418f-9631-77aefc34418b/scratchpad/hero-mobile.png' });
await browser.close();
