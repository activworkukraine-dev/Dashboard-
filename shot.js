const { chromium } = require('playwright');

(async () => {
  console.log('start');
  const b = await chromium.launch({ 
    args: [
      '--use-gl=swiftshader', 
      '--enable-unsafe-swiftshader', 
      '--ignore-gpu-blocklist',
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ] 
  });
  
  const context = await b.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    viewport: { width: 1024, height: 768 }
  });

  const p = await context.newPage();
  
  try {
    console.log('Navigating to map...');
    // Змінено джерело на radarua.com
    await p.goto('https://radarua.com/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    console.log('page loaded');
  } catch (e) {
    console.log('goto error: ' + e.message);
  }

  console.log('Waiting for tiles to render...');
  await p.waitForTimeout(10000);
  
  await p.screenshot({ path: 'map.png' });
  console.log('screenshot saved');
  
  await b.close();
})().catch(e => { 
  console.error('FATAL: ' + e.message); 
  process.exit(1); 
});
