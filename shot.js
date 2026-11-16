const { chromium } = require('playwright');

(async () => {
  console.log('start');
  const b = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const p = await b.newPage({ viewport: { width: 614, height: 600 } });
  try {
    await p.goto('https://map.war-monitor.org/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('page loaded');
  } catch (e) {
    console.log('goto error: ' + e.message);
  }
  await p.waitForTimeout(15000);
  await p.screenshot({ path: 'map.png' });
  console.log('screenshot saved');
  await b.close();
})().catch(e => { console.error('FATAL: ' + e.message); process.exit(1); });
