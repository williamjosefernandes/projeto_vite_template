import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  args: ['--no-sandbox'],
});

const outDir = 'C:\\Users\\willi\\AppData\\Local\\Temp\\claude\\f--Mooby-projeto-vite-template\\00e7f7ba-4e20-467e-bd56-78638f53aa8d\\scratchpad';
const errors = [];

const page = await browser.newPage({ viewport: { width: 1700, height: 900 } });
page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });
page.on('pageerror', (err) => errors.push(String(err)));

await page.goto('http://localhost:5173/design-system/checkbox', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: `${outDir}/checkbox-top.png` });

await page.evaluate(() => {
  const el = document.querySelector('div.overflow-y-auto');
  el.scrollTo(0, el.scrollHeight);
});
await page.waitForTimeout(200);
await page.screenshot({ path: `${outDir}/checkbox-bottom.png` });

// Testar interação: desmarcar um filho deve deixar "selecionar tudo" indeterminado
await page.click('#child-c');
await page.waitForTimeout(150);
const state = await page.getAttribute('#select-all', 'data-state');
console.log('Estado select-all após marcar item c:', state);

await page.click('text=Tema atual');
await page.waitForTimeout(300);
await page.evaluate(() => {
  const el = document.querySelector('div.overflow-y-auto');
  el.scrollTo(0, el.scrollHeight);
});
await page.waitForTimeout(200);
await page.screenshot({ path: `${outDir}/checkbox-dark-bottom.png` });

console.log('console errors:', JSON.stringify(errors));
await browser.close();
console.log('DONE');
