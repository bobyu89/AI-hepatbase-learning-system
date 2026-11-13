# 實體課前短片（AI 不只是聊天）

約 90 秒，1920×1080。成品在 `public/video/ai-workshop-intro.mp4`，顯示在課程頁的實體課那一段。

## 怎麼做出來的

- **旁白**：`lines.json` 的十二句話，用 [VoAI](https://www.voai.ai/) 合成，聲音是「渝函」，模型是 Neo。腳本是 `tts_voai.py`。
- **畫面**：`build.mjs` 依實際配音長度排時間軸，產生 [HyperFrames](https://hyperframes.heygen.com) 的合成檔 `index.html`。畫面沿用網站的手繪紙張風，貼紙來自 `public/art/`。
- **導演規則**：借用 [lemo-opuscar](https://github.com/lemomo-ai/lemo-opuscar)「白板講解」風格的幾條規則：整支片是同一張桌面、鏡頭移動而不切換、字在旁白講到時才出現、字幕留在畫面下方。沒有使用它逐筆寫字的引擎，也沒有配樂與音效。

## 重新產生

改 `lines.json` 的文字或 `build.mjs` 的畫面之後，依序執行。

合成旁白。金鑰只放在環境變數，不要寫進檔案。在 Claude Code 的雲端環境裡，金鑰存在環境的網路密鑰中，由代理自動帶上，這時 `VOAI_KEY` 填任意佔位字串即可：

```bash
VOAI_KEY=你的金鑰 python tts_voai.py
```

把字型與貼紙放進 `assets/`：`public/fonts/` 的兩個 Kevin Sans、`public/art/` 裡用到的 SVG，以及 Google Fonts 的 `Iansui-Regular.ttf`。然後產生合成檔：

```bash
node build.mjs
```

算圖：

```bash
npx hyperframes render -o ../../public/video/ai-workshop-intro.mp4 --crf 24
```
