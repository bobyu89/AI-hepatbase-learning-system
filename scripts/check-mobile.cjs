/**
 * 手機直式檢查：把網站每一頁用 iPhone 13 直式（390×664）打開，找出看不到或跑版的地方。
 *
 * 用法（先 npm run build）：
 *   npm run check:mobile
 *
 * 檢查項目：
 *   1. 橫向捲動：頁面比手機螢幕寬（直著看會被切掉、要左右滑）
 *   2. 圖片沒載入
 *   3. JavaScript 錯誤
 *   4. 投影頁（有 .slide 的頁面）：每一頁內容都要在螢幕寬度內
 * 每一頁的第一個畫面截圖存到 .mobile-check/，方便用眼睛再看一次。
 * 有問題時結束碼為 1。
 */
const fs = require("node:fs");
const path = require("node:path");
const { spawn, spawnSync } = require("node:child_process");
const { chromium, devices } = require("playwright");

const PORT = 4398;
const arg = (k, d) => {
  const i = process.argv.indexOf(k);
  return i > -1 ? process.argv[i + 1] : d;
};
const BASE = arg("--base", "/").replace(/\/?$/, "/");
const OUT = ".mobile-check";
const SKIP = [/^files\//, /^img\//, /^_astro\//];

const pages = [];
(function walk(dir, rel) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const r = rel ? `${rel}/${name}` : name;
    if (SKIP.some((re) => re.test(r + "/"))) continue;
    if (fs.statSync(p).isDirectory()) walk(p, r);
    else if (name === "index.html") pages.push(rel ? `${rel}/` : "");
  }
})("dist", "");

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  spawn("npx", ["astro", "preview", "--port", String(PORT)], { stdio: "ignore", shell: true });
  let up = false;
  for (let t = 0; t < 120 && !up; t++) {
    try {
      up = (await fetch(`http://localhost:${PORT}${BASE}`)).ok;
    } catch {
      await wait(500);
    }
  }
  if (!up) throw new Error("astro preview 沒有起來");

  fs.rmSync(OUT, { recursive: true, force: true });
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const problems = [];

  for (const rel of pages) {
    const page = await ctx.newPage();
    const errs = [];
    page.on("pageerror", (e) => errs.push(e.message));
    const url = `http://localhost:${PORT}${BASE}${rel}`;
    await page.goto(url, { waitUntil: "networkidle" });
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += 500) {
      await page.evaluate((v) => scrollTo(0, v), y);
      await wait(60);
    }
    await wait(400);
    const r = await page.evaluate(() => {
      const iw = innerWidth;
      const wide = [...document.querySelectorAll("body *")]
        .filter((e) => {
          const b = e.getBoundingClientRect();
          return b.width > 0 && b.right > iw + 2 && getComputedStyle(e).position !== "fixed";
        })
        .slice(0, 5)
        .map((e) => e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/)[0] : ""));
      const broken = [...document.querySelectorAll("img")].filter((i) => i.offsetParent && i.complete && !i.naturalWidth).map((i) => i.getAttribute("src"));
      return { over: document.documentElement.scrollWidth - iw, wide, broken, slides: document.querySelectorAll(".slide").length };
    });
    const issues = [];
    if (r.over > 1) issues.push(`橫向超出 ${r.over}px（${r.wide.join("、")}）`);
    if (r.broken.length) issues.push(`圖片沒載入：${r.broken.join("、")}`);
    if (r.slides) {
      await page.evaluate(() => scrollTo(0, 0));
      for (let k = 0; k < r.slides; k++) {
        const w = await page.evaluate(() => {
          const s = document.querySelector(".slide.on, .slide.is-active") || document.querySelector(".slide");
          return [...s.querySelectorAll("*")].reduce((m, e) => Math.max(m, e.getBoundingClientRect().right), 0) - innerWidth;
        });
        if (w > 2) issues.push(`投影第 ${k + 1} 頁超出螢幕寬 ${Math.round(w)}px`);
        await page.keyboard.press("ArrowRight");
        await wait(250);
      }
    }
    if (errs.length) issues.push(`JS 錯誤：${errs.join("；")}`);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: path.join(OUT, (rel.replace(/\//g, "_") || "home") + ".png") });
    console.log(`${issues.length ? "✗" : "✓"} /${rel}${issues.length ? "\n    " + issues.join("\n    ") : ""}`);
    if (issues.length) problems.push(rel);
    await page.close();
  }

  await browser.close();
  spawnSync("npx", ["astro", "preview", "stop"], { stdio: "ignore", shell: true });
  console.log(`\n手機直式檢查：${pages.length} 頁，${problems.length} 頁有問題。截圖在 ${OUT}/`);
  process.exit(problems.length ? 1 : 0);
})().catch((e) => {
  console.error(e);
  spawnSync("npx", ["astro", "preview", "stop"], { stdio: "ignore", shell: true });
  process.exit(1);
});
