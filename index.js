
const puppeteer = require('puppeteer');
const Tesseract = require('tesseract.js');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.goto('https://agent.luckyparadise777.com', { waitUntil: 'networkidle2' });

  await page.type('input[name="username"]', 'Test2021');
  await page.type('input[name="password"]', '1234567');

  const captcha = await page.$('img'); // Adjust selector if needed
  await captcha.screenshot({ path: 'captcha.png' });

  const result = await Tesseract.recognize('captcha.png', 'eng');
  const captchaText = result.data.text.replace(/\s/g, '');
  console.log('Captcha:', captchaText);

  await page.type('input[name="captcha"]', captchaText);

  await Promise.all([
    page.click('button[type="submit"]'),
    page.waitForNavigation({ waitUntil: 'networkidle2' })
  ]);

  console.log('✅ Logged in!');
  await browser.close();
})();
