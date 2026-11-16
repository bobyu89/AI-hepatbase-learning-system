# AI 不只是聊天

「AI 不只是聊天」的課程網站，給護理系的研究生與老師。一場 60 分鐘的現場課：把一個自己最懂的專業概念講給外行人聽，同一件事做四輪，每輪只改一樣，看見四個不太會過時的觀念。

網址：https://bobyu89.github.io/AI-hepatbase-learning-system/courses/ai/

## 頁面

| 路徑 | 內容 |
|---|---|
| `/` | 轉到 `/courses/ai/` |
| `/courses/ai/` | 課程首頁：四輪怎麼做、四個觀念、要帶什麼、講義下載 |
| `/files/ai/handout.pdf`、`handout.docx` | 講義，A4 正反兩面 |
| `/courses/ai/board/`、`/lessons/…`、`/workshop/…` | 已收起來，轉到課程首頁 |
| `/courses/obsidian/…` | 轉址到 Obsidian 課的新網站 |

原本的 14 堂預錄課、白板、步驟單、課前準備頁與影片都收在 `archive/`，沒有刪。怎麼放回來寫在 `archive/README.md`。

Obsidian 研究筆記課原本也在這個網站，後來搬到 [bobyu89/obsidian-research-notes](https://github.com/bobyu89/obsidian-research-notes)。

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

**修改課程內容**：現場課的四輪、要帶的東西在 `src/data/ai-session.ts`；時間地點在 `src/data/ai-course.ts` 的 `workshopDate`、`workshopPlace`。下面這一句說的是已經收起來的預錄課：大綱、白板位置與連線在 `src/data/ai-course.ts`；每一堂的投影片在 `src/data/ai-lessons.json`。這個檔案由含講稿的原始檔產生，原始檔不在這個公開 repo，所以要改投影片請連同講稿一起從原始檔改。

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

## 引用的框架

課程首頁的四個觀念與講義，參考 [AI Fluency Framework](https://aifluencyframework.org/)（Rick Dakan 與 Joseph Feller 提出，© 2025 Rick Dakan、Joseph Feller 與 Anthropic），以 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant) 釋出。這兩處改寫的內容依同樣的授權分享。

## 設計

手繪紙張風，視覺參考 [kevintngo/looseleaf](https://github.com/kevintngo/looseleaf)，字型 Kevin Sans 與貼紙、塗鴉取自該專案（MIT）。介面依 [impeccable](https://impeccable.style/) 的流程製作，skill 裝在 `.claude/skills/impeccable/`。產品背景在 `PRODUCT.md`，視覺規範在 `DESIGN.md`。
