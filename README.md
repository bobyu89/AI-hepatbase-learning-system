# AI 不只是聊天

「AI 不只是聊天：初學者的生成式 AI 實用入門」的學習網站，給護理系的研究生與老師。整門課攤開成一張白板：每一堂是一張卡片，前後呼應的地方畫成連線。

網址：https://bobyu89.github.io/AI-hepatbase-learning-system/courses/ai/

Obsidian 研究筆記課原本也在這個網站，後來搬到 [bobyu89/obsidian-research-notes](https://github.com/bobyu89/obsidian-research-notes)。舊網址 `/courses/obsidian/…` 留有轉址頁。

## 頁面

| 路徑 | 內容 |
|---|---|
| `/` | 轉到 `/courses/ai/` |
| `/courses/ai/` | 課程介紹：嵌入的白板、課程大綱、三個做法、實體課 |
| `/courses/ai/board/` | 學習白板 |
| `/courses/ai/lessons/0/` … `/13/` | 單堂頁：影片、簡報、換你做、學完打勾 |
| `/courses/ai/workshop/` | 實體課步驟單，可列印，也可下載 Word 與 PDF |
| `/courses/ai/workshop/prep/` | 課前準備清單 |
| `/courses/ai/workshop/paper/` | 示範論文與取得方式 |
| `/courses/obsidian/…` | 轉址到 Obsidian 課的新網站 |

## 開發

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

需要 Node 22 以上。

## 常見修改

**修改課程內容**：大綱、實體課流程、白板位置與連線在 `src/data/ai-course.ts`；每一堂的投影片在 `src/data/ai-lessons.json`。這個檔案由含講稿的原始檔產生，原始檔不在這個公開 repo，所以要改投影片請連同講稿一起從原始檔改。

**增減貼紙與塗鴉**：先取得 looseleaf 的原始碼，修改 `scripts/generate-art.mjs` 裡的清單，再重新產生 `public/art/`：

```bash
git clone --depth 1 https://github.com/kevintngo/looseleaf.git ../looseleaf
```

```bash
node scripts/generate-art.mjs ../looseleaf
```

## 資料與隱私

- 學習進度、身分選擇、白板卡片位置都存在學員自己瀏覽器的 localStorage，沒有後端，沒有登入。換裝置或清除網站資料就會重來。
- 逐字稿不在這個 repo。pptx 的備忘稿含逐字稿，所以也不提供下載。
- 示範用的文獻 A–D、學生甲、meeting 紀錄都是虛構的示範資料。

## 部署

`.github/workflows/deploy.yml` 會在推送到 `main` 時建置並發布到 GitHub Pages。第一次使用前，要到 repo 的 Settings → Pages，把 Source 設為 **GitHub Actions**。

## 設計

手繪紙張風，視覺參考 [kevintngo/looseleaf](https://github.com/kevintngo/looseleaf)，字型 Kevin Sans 與貼紙、塗鴉取自該專案（MIT）。介面依 [impeccable](https://impeccable.style/) 的流程製作，skill 裝在 `.claude/skills/impeccable/`。產品背景在 `PRODUCT.md`，視覺規範在 `DESIGN.md`。
