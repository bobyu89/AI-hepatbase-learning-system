// 「AI 不只是聊天」14 堂的投影片內容。
// 投影片與講稿寫在同一份原始檔裡，那份原始檔含講稿，不放在這個公開的 repo。
// 這裡載入的 ai-lessons.json 是去掉講稿後的版本，由原始檔的產生腳本輸出，請不要手動修改。
// 每堂照同樣的順序：學生會問的為什麼 → 比喻 → 這一堂的動作 → 換你做 → 留給你的問題。
// 對話與講錯的例子是示範用的虛構內容；數字取自示範論文（Dykes 等人，2020）的摘要。
import slides from "./ai-lessons.json";

export const aiSlides = slides as unknown as Record<number, Record<string, unknown>[]>;
