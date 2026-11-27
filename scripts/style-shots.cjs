/**
 * 把 public/files/ai/styles/<slug>/template.html 每一頁截成圖，給手機直式的「範本檢視頁」用。
 * 用法：npm run build 之後，另開 npx astro preview --port 4332，再執行
 *   node scripts/style-shots.cjs
 * 輸出：public/files/ai/styles/<slug>/slides/01.jpg …，以及 slides.json（頁數）。
 */
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { chromium } = require("playwright");

const BASE = "http://localhost:4332/AI-hepatbase-learning-system/files/ai/styles/";
const DIR = "public/files/ai/styles";

(async () => {
  const browser = await chromium.launch();
  const slugs = fs.readdirSync(DIR).filter((d) => fs.existsSync(path.join(DIR, d, "template.html")));
  for (const slug of slugs) {
    const out = path.join(DIR, slug, "slides");
    fs.rmSync(out, { recursive: true, force: true });
    fs.mkdirSync(out, { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, reducedMotion: "reduce" });
    await page.goto(BASE + slug + "/template.html", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    // 一頁一頁按右鍵；畫面和上一張一樣就再按一次，連續三次都沒變就當作到最後一頁
    let n = 0;
    let last = "";
    let stuck = 0;
    for (let i = 0; i < 60 && stuck < 3; i++) {
      const shot = await page.screenshot({ type: "jpeg", quality: 80 });
      const h = crypto.createHash("md5").update(shot).digest("hex");
      if (h === last) stuck++;
      else {
        stuck = 0;
        last = h;
        n++;
        fs.writeFileSync(path.join(out, String(n).padStart(2, "0") + ".jpg"), shot);
      }
      await page.mouse.move(5, 5);
      await page.keyboard.press("ArrowRight");
      await page.waitForTimeout(1600);
    }
    fs.writeFileSync(path.join(out, "slides.json"), JSON.stringify({ count: n }));
    console.log(slug, n);
    await page.close();
  }
  await browser.close();
})();
