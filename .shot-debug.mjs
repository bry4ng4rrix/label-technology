import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on('console', msg => console.log('CONSOLE:', msg.type(), msg.text()));
page.on('pageerror', err => console.log('PAGEERROR:', err.message));
const resp = await page.goto('http://localhost:3000/hero-preview', { waitUntil: 'networkidle' });
console.log('status', resp.status());
await page.screenshot({ path: '/tmp/claude-1000/-home-garrix-Dev-Site-label/570ba22b-87f3-418f-9631-77aefc34418b/scratchpad/hero-debug.png', fullPage: true });
await browser.close();
