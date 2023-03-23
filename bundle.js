const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  // Build the project first
  const buildProcess = require('child_process').exec('npm run build', { cwd: __dirname });

  buildProcess.on('error', (err) => {
    console.error('Failed to build the project:', err);
  });

  buildProcess.on('exit', async (code) => {
    if (code !== 0) {
      console.error('Failed to build the project');
      return;
    }

    console.log('Project built successfully');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setBypassCSP(true);

    await page.goto(`file://${path.join(__dirname, 'build/index.html')}`, { waitUntil: 'networkidle0' });

    const inlinedHTML = await page.evaluate(async () => {
      function inlineStyles(buildDir) {
        const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'));
        styles.forEach((style) => {
          if (style.tagName === 'LINK') {
            const filePath = new URL(style.getAttribute('href'), buildDir).pathname;
            const cssText = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
            const newStyle = document.createElement('style');
            newStyle.textContent = cssText;
            style.replaceWith(newStyle);
          }
        });
      }

      function inlineScripts(buildDir) {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        scripts.forEach((script) => {
          const filePath = new URL(script.getAttribute('src'), buildDir).pathname;
          const scriptText = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
          const newScript = document.createElement('script');
          newScript.textContent = scriptText;
          script.replaceWith(newScript);
        });
      }

      function inlineImages(buildDir) {
        const images = Array.from(document.querySelectorAll('img[src]'));
        images.forEach((img) => {
          const filePath = new URL(img.getAttribute('src'), buildDir).pathname;
            const data = fs.readFileSync(filePath);
            const base64 = Buffer.from(data).toString('base64');
            const mimeType = require('mime').getType(filePath);
            img.src = `data:${mimeType};base64,${base64}`;
        });
      }

      inlineStyles('file:///home/neil/xpathenator/build');
      inlineScripts('file:///home/neil/xpathenator/build');
      inlineImages('file:///home/neil/xpathenator/build');

      return '<!DOCTYPE html>\n' + document.documentElement.outerHTML;
    });

    fs.writeFileSync(path.resolve(__dirname, 'standalone.html'), inlinedHTML);

    await browser.close();
    console.log('standalone.html created successfully');
  });
})();

