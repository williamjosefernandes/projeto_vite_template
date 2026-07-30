import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox'],
});

const outDir = 'C:\\Users\\willi\\AppData\\Local\\Temp\\claude\\f--Mooby-projeto-vite-template\\00e7f7ba-4e20-467e-bd56-78638f53aa8d\\scratchpad';
const errors = [];

const page = await browser.newPage({ viewport: { width: 1700, height: 1100 } });
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto('http://localhost:5173/design-system/navegacao', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: `${outDir}/nav-top.png`, fullPage: true });

await page.click('text=Abrir Command Menu');
await page.waitForTimeout(300);
await page.screenshot({ path: `${outDir}/nav-command-menu.png` });
await page.keyboard.press('Escape');
await page.waitForTimeout(200);

console.log('console errors:', JSON.stringify(errors));
await browser.close();
console.log('DONE');
