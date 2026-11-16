# 收起來的內容

2026 年 11 月，「AI 不只是聊天」改成一場 60 分鐘的現場課，主軸是四個不太會過時的觀念，不再使用論文，也不要求先看預錄課。原本的內容從網站收起來，放在這裡，沒有刪除。

這個資料夾不會被建置，也不會出現在網站上。

| 這裡的路徑 | 原本的位置 | 內容 |
|---|---|---|
| `pages/index.astro` | `src/pages/courses/ai/index.astro` | 舊的課程首頁：白板、14 堂大綱、4D 對照表、延伸練習 |
| `pages/board.astro` | `src/pages/courses/ai/board.astro` | 14 堂的學習白板 |
| `pages/lessons/` | `src/pages/courses/ai/lessons/` | 14 堂的單堂頁（影片加簡報） |
| `pages/workshop/` | `src/pages/courses/ai/workshop/` | 步驟單、課前準備、示範論文 |
| `public/video/` | `public/video/` | 14 堂上課影片與課前短片 |
| `public/files/ai/` | `public/files/ai/` | 步驟單的 Word 與 PDF |

仍留在原處、目前沒有頁面使用的檔案：`src/data/ai-course.ts`、`src/data/ai-lessons.json`、`src/components/boards/AiBoard.astro`、`src/styles/board.css`、`src/styles/deck.css`、`src/styles/lesson.css`、`src/styles/handout.css`、`src/scripts/`、`video/ai-workshop-intro/`。

## 要放回網站時

把上表的檔案搬回原本的位置，並拿掉 `src/pages/courses/ai/` 底下對應的轉址頁，再執行 `npm run build`。
