// 「AI 不只是聊天：初學者的生成式 AI 實用入門」的課程資料。
// 目前是大綱版：堂次與每堂要做的事已經排好，簡報與講稿還沒寫。
import { CARD_W, CARD_H, type BoardNode, type BoardEdge } from "./course";

export const aiCourse = {
  id: "ai",
  title: "AI 不只是聊天",
  subtitle: "初學者的生成式 AI 實用入門",
  audience: "護理系大學部學生",
  // 實體課的日期與地點。留空時顯示「即將公布」。
  workshopDate: "",
  workshopPlace: "",
};

export interface OutlineLesson {
  no: number;
  title: string;
  module: string;
  /** 這一堂在做什麼 */
  summary: string;
  /** 換你做 */
  task: string;
}

export const aiModules = [
  { id: "start", name: "模組一", label: "起步" },
  { id: "doubt", name: "模組二", label: "先學會懷疑" },
  { id: "read", name: "模組三", label: "給它東西讀" },
  { id: "make", name: "模組四", label: "請它做出東西" },
  { id: "rules", name: "模組五", label: "規矩" },
];

export const aiLessons: OutlineLesson[] = [
  { no: 0, module: "start", title: "你現在怎麼用 AI？", summary: "不用打開任何軟體。先看看自己平常都問它什麼、怎麼問。", task: "寫下最近一次問 AI 的問題，還有你對答案滿不滿意。" },
  { no: 1, module: "start", title: "它不是你想的那樣", summary: "它不是搜尋引擎，也不是什麼都懂的人。先知道答案是怎麼來的，才知道什麼時候能用。", task: "同一個問題拿去問三個不同的 AI，比較答案哪裡不一樣。" },
  { no: 2, module: "start", title: "把話說清楚", summary: "交代任務、給它材料、指定格式。同一個問題，問法不同，答案差很多。", task: "把第 0 堂那個問題重問一次，兩個答案並排比較。" },
  { no: 3, module: "start", title: "追問，以及卡住時怎麼辦", summary: "第一個答案只是草稿。問不出來的時候不要放棄，有幾個救法。", task: "連續追問三次，比較第一版和最後一版。" },
  { no: 4, module: "doubt", title: "它會講錯的四種樣子", summary: "很有把握地編造、忘記前面講過的、順著你說好話、有些事很強有些事卻很弱。", task: "問一題你已經知道答案的，看它有沒有出現其中一種。" },
  { no: 5, module: "doubt", title: "抓到它講錯的三個動作", summary: "不是每一句都要查。學會挑哪些該查，以及怎麼查最快。", task: "故意問一題冷門的，抓出一個錯誤。" },
  { no: 6, module: "doubt", title: "附來源的搜尋：每個來源都點開", summary: "有附來源，不等於來源真的這樣說。", task: "找出一個「來源其實沒這樣說」的例子。" },
  { no: 7, module: "read", title: "貼一份講義，請它講到你懂", summary: "把老師的講義交給它，比問它本來就知道的事有用。講義太長就分段。", task: "用你這週的一份講義試一次。" },
  { no: 8, module: "read", title: "讀一篇文獻，回原文核對", summary: "先問這篇的結構，再問細節。它說的每一句，都要在原文找得到。", task: "找出它講的一句話在原文的哪一段。" },
  { no: 9, module: "read", title: "請它考你", summary: "請它從講義出題，用自我測驗來複習。", task: "從講義出五題，答錯的請它解釋。" },
  { no: 10, module: "make", title: "整理成一張比較表", summary: "把容易搞混的內容排成表，再自己檢查每一格。", task: "把兩個你常搞混的概念排成一張表。" },
  { no: 11, module: "make", title: "報告大綱：讓它當讀者", summary: "請它指出大綱缺什麼，不請它替你寫。也要提防它只說好話。", task: "貼上自己的報告大綱，請它指出缺了什麼。" },
  { no: 12, module: "rules", title: "什麼不能貼", summary: "病人與同學的資料不能貼。學會把內容改成可以貼的版本。實際規定以學校與實習單位為準。", task: "把一段實習紀錄改成可以貼的版本。" },
  { no: 13, module: "rules", title: "作業怎麼用、怎麼標註", summary: "先查清楚每門課的規定。最後談學完之後，和 AI 聊出來的東西要收在哪裡。", task: "查出你這學期一門課對 AI 的規定。" },
];

export const aiLessonsOf = (moduleId: string) => aiLessons.filter((l) => l.module === moduleId);

/** 實體課 90 分鐘的流程。 */
export const aiWorkshopFlow: [string, number][] = [
  ["開場：每人一句話，說最近一次 AI 幫倒忙的經驗", 10],
  ["排障：預錄課卡關的問題", 15],
  ["做自己的成品：用自己的講義或作業，做出讀書筆記、複習題或報告大綱", 35],
  ["互看：兩人一組，檢查對方成品裡 AI 講錯的地方", 20],
  ["收尾：課堂的 AI 使用規定與下一步", 10],
];

/** 這門課的三個做法。 */
export const aiPrinciples = [
  ["不綁定工具", "每堂只教各家都有的動作：對話、貼上或上傳檔案、附來源的搜尋。畫面以你用的那一個為準。"],
  ["先學會懷疑，再學做東西", "第 4 到 6 堂先練查證，後面做筆記、做表、寫大綱時才不會照單全收。"],
  ["不評分、可以弄壞", "每堂的練習都用你自己這學期的講義和作業。我們希望你親手看到它出錯一次。"],
] as const;

// ───────────────────────── 白板 ─────────────────────────

const place: Record<number, [number, number]> = {
  0: [110, 80], 1: [390, 100], 2: [670, 74], 3: [950, 94],
  4: [110, 356], 5: [390, 370], 6: [670, 344],
  7: [110, 630], 8: [390, 620], 9: [670, 640],
  10: [110, 900], 11: [390, 914],
  12: [730, 896], 13: [1010, 910],
};

const lessonNodes: BoardNode[] = aiLessons.map((l) => ({
  id: `l${l.no}`,
  kind: "lesson" as const,
  no: l.no,
  title: l.title,
  sub: l.summary,
  x: place[l.no][0],
  y: place[l.no][1],
}));

export const aiBoardNodes: BoardNode[] = [
  ...lessonNodes,
  { id: "workshop", kind: "event", title: "實體課", sub: "90 分鐘，做自己的成品", x: 1010, y: 636 },
  { id: "obsidian", kind: "tool", title: "接著學 Obsidian 研究筆記課", sub: "把學到的東西收起來", x: 1010, y: 366 },
];

export const aiBoardRegions = aiModules.map((m) => {
  const ns = lessonNodes.filter((n) => aiLessons[n.no!].module === m.id);
  const x0 = Math.min(...ns.map((n) => n.x)) - 34;
  const y0 = Math.min(...ns.map((n) => n.y)) - 62;
  const x1 = Math.max(...ns.map((n) => n.x)) + CARD_W + 34;
  const y1 = Math.max(...ns.map((n) => n.y)) + CARD_H + 34;
  return { id: m.id, label: `${m.name}　${m.label}`, x: x0, y: y0, w: x1 - x0, h: y1 - y0 };
});

export const AI_BOARD_W = 1310;
export const AI_BOARD_H = 1100;

const order = [...aiLessons.map((l) => `l${l.no}`), "workshop"];
const sequence: BoardEdge[] = order.slice(0, -1).map((id, i) => ({ from: id, to: order[i + 1] }));

export const aiBoardEdges: BoardEdge[] = [
  ...sequence,
  { from: "l0", to: "l2", label: "同一個問題重問一次" },
  { from: "l5", to: "l8", label: "回原文核對", labelAt: 0.5 },
  { from: "l4", to: "l11", label: "提防它說好話", labelAt: 0.13 },
  { from: "workshop", to: "obsidian", label: "學完之後" },
];
