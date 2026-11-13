// 產生 HyperFrames 合成檔 index.html。時間軸完全照實際配音長度排。
import fs from "node:fs";
const lines = JSON.parse(fs.readFileSync("lines.json", "utf8"));
const dur = JSON.parse(fs.readFileSync("voice/dur.json", "utf8"));
const LEAD = 0.7, GAP = 0.5, TAIL = 2.2;
let t = LEAD; const T = {};
for (const l of lines) { T[l.id] = { s: +t.toFixed(3), d: dur[l.id], e: +(t + dur[l.id]).toFixed(3) }; t += dur[l.id] + GAP; }
const TOTAL = +(t - GAP + TAIL).toFixed(2);
const r = (n) => +n.toFixed(3);

// 字幕：長句依標點切成最多兩行寬的段落，時間按字數比例分配
function subs() {
  const out = [];
  for (const l of lines) {
    const parts = l.text.split(/(?<=[。：，])/).filter(Boolean);
    const groups = []; let cur = "";
    for (const p of parts) { if ((cur + p).length > 22 && cur) { groups.push(cur); cur = p; } else cur += p; }
    if (cur) groups.push(cur);
    const total = groups.reduce((n, g) => n + g.length, 0); let s = T[l.id].s;
    groups.forEach((g, i) => { const d = (T[l.id].d * g.length) / total; out.push({ s: r(s), e: r(i === groups.length - 1 ? T[l.id].e + 0.35 : s + d), text: g.replace(/[，。：]$/, "") }); s += d; });
  }
  return out;
}
const SUBS = subs();

// 攝影機：把世界座標 (cx,cy) 放到畫面中央偏上，字幕區留在下方
const cam = (cx, cy, z) => ({ x: r(960 - cx * z), y: r(480 - cy * z), scale: z });
const R = { title: [1100, 640], goal: [3300, 640], prep: [3320, 1960], flow: [1185, 2030], all: [2200, 1345] };

const anims = [];
const A = (sel, from, to, at) => anims.push(`tl.fromTo(${JSON.stringify(sel)}, ${JSON.stringify(from)}, ${JSON.stringify(to)}, ${r(at)});`);
const pop = (sel, at, rot = 0) => A(sel, { opacity: 0, scale: 0.7, rotation: rot - 6 }, { opacity: 1, scale: 1, rotation: rot, duration: 0.45, ease: "back.out(1.6)" }, at);
const rise = (sel, at) => A(sel, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, at);
const draw = (sel, at, d = 0.5) => A(sel, { scaleX: 0, opacity: 1 }, { scaleX: 1, opacity: 1, duration: d, ease: "power2.inOut" }, at);
const move = (to, at, d = 1.1) => anims.push(`tl.to("#world", ${JSON.stringify({ ...to, duration: d, ease: "power3.inOut" })}, ${r(at)});`);

// ── 時間安排 ──
const c0 = cam(...R.title, 1);
// 01 標題
rise("#t-title", 0.25); draw("#t-under", 0.9, 0.7); pop("#t-laptop", 1.2, 7); rise("#t-sub", T["01"].s + 2.3); pop("#t-spark", T["01"].s + 2.6);
// 02 這堂課要做什麼
move(cam(...R.goal, 1), T["02"].s - 0.75);
pop("#g-90", T["02"].s + 0.1, -3); pop("#g-handout", T["02"].s + 2.0, -2); draw("#g-arrow", T["02"].s + 3.2, 0.6); pop("#g-sheet", T["02"].s + 3.9, 2); pop("#g-done", T["02"].s + 5.0, -10);
// 03 不用先看
pop("#g-sticky", T["03"].s + 0.2, 3); rise("#g-demo", T["03"].s + 2.4); draw("#g-arrow2", T["03"].s + 3.3, 0.4); rise("#g-do", T["03"].s + 3.8);
// 04–09 準備五樣
move(cam(...R.prep, 1), T["04"].s - 0.75);
rise("#p-head", T["04"].s + 0.1); draw("#p-under", T["04"].s + 0.9, 0.6);
pop("#p-1", T["05"].s + 0.15, -2); pop("#p-2", T["06"].s + 0.15, 1.5); pop("#p-3", T["07"].s + 0.15, -1); pop("#p-3n", T["07"].s + 3.4, 2);
pop("#p-4", T["08"].s + 0.15, 1); pop("#p-warn", T["08"].s + 3.3, -2); pop("#p-5", T["09"].s + 0.15, -1.5);
// 10 流程：每張卡在旁白講到那個詞的時候出現
move(cam(...R.flow, 0.94), T["10"].s - 0.75);
const FL = lines.find((l) => l.id === "10").text;
const at9 = (w) => T["10"].s + (T["10"].d * FL.indexOf(w)) / FL.length;
rise("#f-head", T["10"].s + 0.1);
pop("#f-1", at9("先寫下"), -2); draw("#f-a1", at9("再把") - 0.3, 0.35); pop("#f-2", at9("再把"), 1.5); draw("#f-a2", at9("拿論文") - 0.3, 0.35); pop("#f-3", at9("拿論文"), -1); draw("#f-a3", at9("最後") - 0.3, 0.35); pop("#f-4", at9("最後"), 2);
// 11 最重要的是最後一步：推近第四張
move(cam(1800, 2080, 1.5), T["11"].s - 0.3, 1.2);
A("#f-ring", { opacity: 0, scale: 1.25 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power3.out" }, T["11"].s + 0.9); pop("#f-mag", T["11"].s + 1.5, -8); rise("#f-rule", T["11"].s + 2.3);
// 12 拉遠看整張板子，結尾卡
move(cam(...R.all, 0.4), T["12"].s - 0.6, 1.5);
A("#end", { opacity: 0, scale: 0.6, rotation: -5 }, { opacity: 1, scale: 1, rotation: -1.5, duration: 0.6, ease: "back.out(1.4)" }, T["12"].s + 0.9);
pop("#e-thumb", T["12"].s + 4.2, 8);

const audio = lines.map((l, i) => `<audio id="vo-${l.id}" class="clip" src="voice/${l.id}.wav" data-start="${T[l.id].s}" data-duration="${r(T[l.id].d)}" data-track-index="${2 + (i % 2)}"></audio>`).join("\n      ");
const subHtml = SUBS.map((s, i) => `<p class="sub clip" id="sub-${i}" data-start="${s.s}" data-duration="${r(s.e - s.s)}" data-track-index="5"><i></i>${s.text}</p>`).join("\n      ");

const card = (id, x, y, w, h, inner, cls = "") => `<div class="card ${cls}" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px">${inner}</div>`;
const img = (id, name, x, y, w) => `<img id="${id}" class="art" src="assets/${name}.svg" style="left:${x}px;top:${y}px;width:${w}px" alt="">`;
const arrow = (id, x, y, w, rot = 0) => `<svg id="${id}" class="arrow" style="left:${x}px;top:${y}px;width:${w}px;rotate:${rot}deg" viewBox="0 0 200 40"><path d="M6 22C50 14 110 26 176 18" /><path d="M158 6 182 18 160 34" /></svg>`;

const html = `<!doctype html>
<html lang="zh-Hant">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="https://cdn.jsdelivr.net/npm/gsap@3.15.0/dist/gsap.min.js"></script>
    <style>
      @font-face { font-family: "Kevin Sans"; src: url("assets/KevinSans-Regular.woff2") format("woff2"); font-weight: 400; }
      @font-face { font-family: "Kevin Sans"; src: url("assets/KevinSans-Bold.woff2") format("woff2"); font-weight: 700; }
      @font-face { font-family: "Iansui"; src: url("assets/Iansui-Regular.ttf") format("truetype"); }
      :root { --desk:#a8c8bb; --paper:#f8f5ee; --card:#fbf6e9; --kraft:#dcc8a3; --sticky:#f7e38a; --ink:#2a2420; --muted:#4a423b; --blue:#2c4f9e; --marker:#df6b3c; --red:#c2412d; --rule:#b2c3dc; --rule-red:#d9776a; --hi:#f8dc4c; }
      * { margin:0; padding:0; box-sizing:border-box; }
      html, body { width:1920px; height:1080px; overflow:hidden; background:var(--desk); }
      #root { position:relative; width:1920px; height:1080px; overflow:hidden; font-family:"Kevin Sans","Iansui",sans-serif; color:var(--ink); letter-spacing:.02em;
        background: repeating-linear-gradient(0deg, rgba(255,255,255,.05) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(58,44,30,.035) 0 1px, transparent 1px 3px), var(--desk); }
      #world { position:absolute; left:0; top:0; width:4400px; height:2700px; transform-origin:0 0; }
      #world > * { position:absolute; }
      .card { padding:74px 44px 36px; border-radius:3px; background: linear-gradient(var(--rule-red),var(--rule-red)) 0 46px/100% 3px no-repeat, var(--card); box-shadow:0 2px 3px rgba(58,44,30,.22), 0 16px 34px rgba(58,44,30,.16); }
      .card.plain { padding:44px; background:var(--paper); }
      .card.kraft { padding:44px; background:var(--kraft); }
      .card.sticky { padding:40px; background:linear-gradient(to bottom, rgba(255,252,235,.35), transparent 30%), var(--sticky); }
      .card.lined { background: linear-gradient(var(--rule-red),var(--rule-red)) 0 46px/100% 3px no-repeat, repeating-linear-gradient(transparent 0 54px, var(--rule) 54px 56.5px) 0 60px, var(--card); }
      .big { font-size:150px; line-height:1.15; }
      .h { font-size:76px; line-height:1.25; }
      .m { font-size:54px; line-height:1.35; }
      .pm { font-size:46px; line-height:1.35; }
      .card.pc { padding:70px 30px 30px; }
      .card.sticky.pc, .card.sticky { }
      .s { font-size:40px; line-height:1.45; color:var(--muted); }
      .num { font-size:120px; line-height:1; color:var(--blue); }
      .blue { color:var(--blue); } .red { color:var(--red); }
      .under { height:20px; background:var(--marker); border-radius:12px 30px 14px 26px / 10px 8px 12px 9px; transform-origin:0 50%; }
      .art { height:auto; filter: drop-shadow(0 2px 1.5px rgba(58,44,30,.3)) drop-shadow(0 8px 10px rgba(58,44,30,.16)); }
      .arrow { height:auto; overflow:visible; transform-origin:0 50%; }
      .arrow path { fill:none; stroke:var(--ink); stroke-width:6; stroke-linecap:round; stroke-linejoin:round; }
      .tape { width:190px; height:44px; background:rgba(246,244,236,.62); border-left:2px dashed rgba(140,135,120,.45); border-right:2px dashed rgba(140,135,120,.45); }
      .ring { border:10px solid var(--marker); border-radius:52% 46% 54% 44% / 46% 54% 44% 52%; }
      .hi { background: linear-gradient(transparent 58%, var(--hi) 58% 92%, transparent 92%); padding:0 .12em; }
      .sub { position:absolute; left:50%; bottom:58px; translate:-50% 0; max-width:1500px; padding:14px 40px 16px 34px; border-radius:22px 10px 20px 10px / 10px 20px 10px 22px; background:rgba(251,246,233,.95); border:3px solid var(--ink); font-size:46px; line-height:1.35; white-space:nowrap; box-shadow:0 6px 14px rgba(58,44,30,.2); z-index:10; }
      .sub i { display:inline-block; width:34px; height:9px; margin:0 18px 12px 0; border-radius:6px; background:var(--marker); }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080">
      <div id="world" class="clip" data-start="0" data-duration="${TOTAL}" data-track-index="0">
        <!-- 一、標題 -->
        <div id="t-title" class="big" style="left:420px;top:380px;white-space:nowrap">AI 不只是聊天</div>
        <div id="t-under" class="under" style="left:690px;top:562px;width:650px"></div>
        ${img("t-laptop", "sticker-laptop-open", 1500, 250, 250)}
        <div id="t-sub" class="h" style="left:426px;top:640px;white-space:nowrap">實體課　<span class="hi">課前一分鐘</span></div>
        ${img("t-spark", "doodle-sparkle-trio", 1375, 250, 120)}

        <!-- 二、這堂課要做什麼 -->
        ${card("g-90", 2500, 260, 520, 300, `<div class="num">60</div><div class="m">分鐘的實體課</div>`)}
        ${card("g-handout", 2560, 650, 440, 330, `<div class="m">你的想法<br>和一篇論文</div>`, "plain")}
        ${arrow("g-arrow", 3040, 790, 230)}
        ${card("g-sheet", 3310, 600, 560, 420, `<div class="m">AI 使用約定<br>＋ <span class="hi">給 AI 的指示</span></div>`, "lined")}
        ${img("g-done", "sticker-done", 3720, 880, 190)}
        ${card("g-sticky", 3200, 180, 620, 330, `<div class="m">沒看過預錄課<br>也沒關係</div>`, "sticky")}
        <div id="g-demo" class="m blue" style="left:3880px;top:300px;white-space:nowrap">先示範</div>
        ${arrow("g-arrow2", 3890, 390, 150, 80)}
        <div id="g-do" class="m blue" style="left:3880px;top:540px;white-space:nowrap">再換你動手</div>

        <!-- 三、來之前準備五樣 -->
        <div id="p-head" class="h" style="left:2520px;top:1560px;white-space:nowrap">來之前，準備五樣</div>
        <div id="p-under" class="under" style="left:2924px;top:1660px;width:330px"></div>
        ${card("p-1", 2400, 1770, 345, 400, `<div class="num">1</div><div class="pm">筆電<br>充好電</div>`, "pc")}
        ${card("p-2", 2770, 1810, 345, 400, `<div class="num">2</div><div class="pm">註冊好<br>AI 工具</div>`, "pc")}
        ${card("p-3", 3140, 1770, 345, 400, `<div class="num">3</div><div class="pm">一個<br>臨床問題</div>`, "pc")}
        ${card("p-3n", 3060, 2230, 500, 140, `<div class="s red" style="font-size:40px">不寫任何病人的資料</div>`, "sticky")}
        ${card("p-4", 3510, 1810, 345, 400, `<div class="num">4</div><div class="pm">相關論文<br>的 PDF</div>`, "pc")}
        ${card("p-warn", 3590, 2260, 330, 130, `<div class="s" style="font-size:38px">或用預設那篇</div>`, "sticky")}
        ${card("p-5", 3880, 1770, 345, 400, `<div class="num">5</div><div class="pm">先寫下<br>四句話</div>`, "pc")}

        <!-- 四、上課的順序 -->
        <div id="f-head" class="h" style="left:240px;top:1620px;white-space:nowrap">上課那天，照這個順序</div>
        ${card("f-1", 200, 1830, 400, 330, `<div class="num" style="font-size:90px">1</div><div class="m">寫下<br>約定</div>`)}
        ${arrow("f-a1", 612, 1980, 96)}
        ${card("f-2", 720, 1870, 400, 330, `<div class="num" style="font-size:90px">2</div><div class="m">寫成<br>指示</div>`)}
        ${arrow("f-a2", 1132, 2000, 96)}
        ${card("f-3", 1240, 1830, 400, 330, `<div class="num" style="font-size:90px">3</div><div class="m">拿論文<br>試用</div>`)}
        ${arrow("f-a3", 1652, 1980, 96)}
        ${card("f-4", 1760, 1870, 400, 330, `<div class="num" style="font-size:90px">4</div><div class="m">回原文<br>查證</div>`)}
        <div id="f-ring" class="ring" style="left:1716px;top:1826px;width:488px;height:418px"></div>
        ${img("f-mag", "sticker-magnifier", 2110, 1760, 170)}
        <div id="f-rule" class="m" style="left:1500px;top:2290px;white-space:nowrap">AI 講得再肯定，也要<span class="hi">回原文對過</span></div>

        <!-- 五、結尾卡 -->
        <div id="end" class="card plain" style="left:1250px;top:860px;width:1900px;height:980px;padding:120px 130px">
          <div class="tape" style="position:absolute;left:50%;top:-22px;translate:-50% 0;rotate:-2deg;width:300px;height:64px"></div>
          <div style="font-size:190px;line-height:1.2">我們實體課見</div>
          <div style="font-size:92px;line-height:1.4;margin-top:60px">這兩樣之後<span class="hi">每天都用得上</span><br>步驟單在課程網站上</div>
        </div>
        ${img("e-thumb", "sticker-thumbs-up", 2700, 1380, 380)}
      </div>

      ${subHtml}
      ${audio}
    </div>
    <script>
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      tl.set("#world", ${JSON.stringify(c0)}, 0);
      ${anims.join("\n      ")}
      tl.to({}, { duration: 0.01 }, ${TOTAL - 0.01});
      window.__timelines["main"] = tl;
      tl.seek(0);
    </script>
  </body>
</html>
`;
fs.writeFileSync("index.html", html);
fs.writeFileSync("timing.json", JSON.stringify({ TOTAL, T, SUBS }, null, 1));
console.log("total", TOTAL, "subs", SUBS.length, SUBS.map((s) => s.text.length).join(","));
