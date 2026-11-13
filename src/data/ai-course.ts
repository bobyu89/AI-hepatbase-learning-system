// 「AI 不只是聊天：初學者的生成式 AI 實用入門」的課程資料。
// 14 堂的大綱在這個檔案，每堂的投影片在 ai-lessons.ts。投影片是初稿。
import { CARD_W, CARD_H, type BoardNode, type BoardEdge } from "./board";
import { aiSlides } from "./ai-lessons";

export const aiCourse = {
  id: "ai",
  title: "AI 不只是聊天",
  subtitle: "初學者的生成式 AI 實用入門",
  audience: "護理系的研究生與老師",
  // 實體課的日期與地點。留空時顯示「即將公布」。
  workshopDate: "11 月 23 日（星期一）14:00–15:00",
  workshopPlace: "護理學系辦公室 討論室（一）",
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
  { id: "read", name: "模組三", label: "把論文交給它" },
  { id: "make", name: "模組四", label: "請它做出東西" },
  { id: "rules", name: "模組五", label: "規矩" },
];

export const aiLessons: OutlineLesson[] = [
  { no: 0, module: "start", title: "你現在怎麼用 AI？", summary: "不用打開任何軟體。先看看自己平常都問它什麼、怎麼問。", task: "寫下最近一次問 AI 的問題，還有你對答案滿不滿意。" },
  { no: 1, module: "start", title: "它不是你想的那樣", summary: "它不是搜尋引擎，也不是什麼都懂的人。先知道答案是怎麼來的，才知道什麼時候能用。", task: "同一個問題拿去問三個不同的 AI，比較答案哪裡不一樣。" },
  { no: 2, module: "start", title: "把話說清楚", summary: "交代任務、給它材料、指定格式。同一個問題，問法不同，答案差很多。", task: "把第 0 堂那個問題重問一次，兩個答案並排比較。" },
  { no: 3, module: "start", title: "追問，以及卡住時怎麼辦", summary: "第一個答案只是草稿。問不出來的時候不要放棄，有幾個救法。", task: "連續追問三次，比較第一版和最後一版。" },
  { no: 4, module: "doubt", title: "它會講錯的四種樣子", summary: "很有把握地編造、忘記前面講過的、順著你說好話、有些事很強有些事卻很弱。", task: "問一題你已經知道答案的，看它有沒有出現其中一種。" },
  { no: 5, module: "doubt", title: "抓到它講錯的三個動作", summary: "不用每一句都查。挑數字、名字和講得很絕對的話，用三個動作查。", task: "問一個有數字的問題，用三個動作查它的回答。" },
  { no: 6, module: "doubt", title: "附來源的搜尋：每個來源都點開", summary: "有附來源，不等於來源真的這樣說。請它找論文時更要小心。", task: "找出一個「來源其實沒這樣說」的例子。" },
  { no: 7, module: "read", title: "把論文交給它", summary: "上傳論文，請它只根據這一篇回答，講到你懂為止。", task: "把示範論文交給 AI，再故意問一個論文沒寫的問題。" },
  { no: 8, module: "read", title: "一格一格讀", summary: "用六個問題讀完一篇論文：問題、對象、研究設計、做法、結果、限制。每一格都回原文核對。", task: "照六格問一輪，每一格挑一句在原文找到出處。" },
  { no: 9, module: "read", title: "請它考你", summary: "填完閱讀單不等於讀懂。請它根據論文出題，一次一題。", task: "請它出五題，答錯的回論文找到那一段。" },
  { no: 10, module: "make", title: "把結果整理成一張表", summary: "把論文裡的數字排進同一張表，再一格一格回原文核對。", task: "請它把示範論文的結果排成表，在下面寫一句你看到的。" },
  { no: 11, module: "make", title: "文獻回顧的大綱：讓它當讀者", summary: "請它指出大綱缺什麼、哪一句沒有文獻支持，不請它替你寫。也要提防它只說好話。", task: "寫五行文獻回顧的大綱，請它只提問題。" },
  { no: 12, module: "rules", title: "什麼不能貼", summary: "論文能不能上傳、病人資料為什麼去掉名字也不能貼。問臨床問題時寫一群人，不寫一個人。實際規定以醫院、學校與系所為準。", task: "把一個臨床問題寫成只有族群和情境的一句話。" },
  { no: 13, module: "rules", title: "論文裡怎麼用、怎麼揭露", summary: "學校、指導教授、期刊對 AI 的規定不一樣。先查清楚，再決定怎麼用、怎麼在論文裡揭露。", task: "查出學校或系所對學位論文使用 AI 的規定。" },
];

const question: Record<number, string> = Object.fromEntries(
  Object.entries(aiSlides).map(([no, slides]) => [no, String(slides.find((x) => x.type === "end")?.q ?? "")]),
);
/** 每堂最後留給學生的問題，取自該堂的最後一張投影片。 */
export const aiQuestionOf = (no: number) => question[no] ?? "";

export const aiLessonsOf = (moduleId: string) => aiLessons.filter((l) => l.module === moduleId);

/**
 * 實體課 60 分鐘，約 20 人，老師和學生同場：把整門課的動作，照實際使用的順序串起來做一次。
 * 不用先看完預錄課，所以每一段都是先示範一兩分鐘，再動手。
 * 學生是專科護理師組的研究生：每個人帶一個自己的臨床問題和一篇相關的論文，做出一頁證據摘要
 * （PICO、閱讀單六格、查證紀錄、適用性一句話），最後接到自己的碩士論文。
 * 時間很緊，註冊工具和下載論文要在課前做完（見 aiWorkshopPrep），課堂上不留時間處理。
 * [做什麼, 分鐘, 對應的預錄課]
 */
export const aiWorkshopGoal = "一頁證據摘要";
export const aiWorkshopFlow: [string, number, string][] = [
  ["開場：看一份完成的證據摘要，打開 AI 工具和論文", 5, ""],
  ["動手前先檢查：論文能不能上傳，臨床問題裡有沒有病人資料", 3, "第 12 堂"],
  ["把自己的臨床問題寫成 PICO，請它只根據論文回答，再追問", 10, "第 2、3 堂"],
  ["把論文交給它，填出閱讀單的六格：問題、對象、研究設計、做法、結果、限制", 12, "第 7、8 堂"],
  ["查證：每一格挑一句回原文核對，特別看研究設計，和「有關聯」被講成「有效」的地方", 15, "第 4、5、8 堂"],
  ["互看：兩人交換，互問這篇的研究對象和你關心的病人族群像不像", 8, "第 11 堂"],
  ["收尾：這一頁要放進論文的哪裡、怎麼標註 AI 的使用。寫下明天就會用的一個動作", 7, "第 13 堂"],
];

/** 來實體課之前要準備的東西（短版，課程首頁和白板用）。 */
export const aiWorkshopPrep = [
  "一台能上網的筆電或平板，充好電",
  "先註冊好任何一個能上傳 PDF 的 AI 工具，確定登入得進去",
  "一個你想回答的臨床問題，和你的論文題目有關最好。不含任何病人資料",
  "一篇和這個問題有關的論文 PDF，先下載到電腦裡。沒有合適的，就用預設的那一篇",
];

/**
 * 課前準備清單（完整版，課前準備頁用）。[要做的事, 說明]
 * 工具的名稱只是舉例，這門課不綁定工具。各工具免費版的額度會變動，這裡不寫數字。
 */
export const aiWorkshopChecklist: [string, string][] = [
  ["帶一台筆電，充好電", "平板也可以。手機不建議：要一邊看論文、一邊打字、一邊對照，螢幕太小。"],
  [
    "註冊一個能上傳 PDF 的 AI 工具",
    "ChatGPT、Gemini、Claude 都可以，選一個就好，用免費版就夠。學校如果有提供，以學校的為準。",
  ],
  ["在你要帶來的那台電腦上登入一次", "有些工具註冊要收驗證信或簡訊，現場才做會來不及。"],
  ["想好一個臨床問題", "和你的論文題目或工作上常遇到的情況有關。只寫病人族群和情境，不寫任何一位病人的資料。"],
  ["下載一篇和這個問題有關的論文 PDF，存在電腦裡", "沒有合適的，就用預設的那一篇。課堂上不留時間找檔案。"],
  ["試傳一次", "開一個新的對話，上傳那份 PDF，打「這篇論文的標題是什麼？」。它答得出來，就準備好了。"],
  ["看課前短片（約 80 秒）", "知道這堂課要做什麼。預錄課不用先看完。"],
];

/** 想帶自己的論文時，要符合的條件。 */
export const aiOwnPaperRules = [
  "開放取用，或學校圖書館有授權",
  "已經正式發表，不是別人還沒發表的稿子",
  "是一篇原著研究（有方法和結果），不是綜論或評論",
  "檔案是可以選取文字的 PDF，不是掃描的圖片",
  "有任何一項不確定，就用預設的那一篇",
];

/** 不要帶來、也不要上傳的東西。 */
export const aiDoNotBring = [
  "病人的任何資料，包括去掉名字的病歷、護理紀錄、照片",
  "醫院或實習單位的內部文件",
  "同學或老師還沒發表的報告與稿子",
];

/** 閱讀單的六格。 */
export const aiReadingSheet = [
  ["這篇在回答什麼問題", "研究目的"],
  ["研究對象是誰、有多少人", "在哪裡、什麼時候做的"],
  ["研究設計是什麼", "照論文自己的寫法，例如隨機分派試驗、非隨機對照試驗"],
  ["做了什麼、和什麼比較", "介入與對照"],
  ["主要結果是什麼", "把數字寫下來"],
  ["作者自己說的限制", "論文最後幾段"],
] as const;

/**
 * 實體課的預設論文。資料經 PubMed 查證（PMID 33201236）。
 * 這是暫定的選擇，老師可以換；換的時候只要改這一段。
 */
export const aiWorkshopPaper = {
  citation: "Dykes, P. C., Burns, Z., Adelman, J., Benneyan, J., Bogaisky, M., Carter, E., Ergai, A., Lindros, M. E., Lipsitz, S. R., Scanlan, M., Shaykevich, S., & Bates, D. W. (2020). Evaluation of a patient-centered fall-prevention tool kit to reduce falls and injuries: A nonrandomized controlled trial.",
  journal: "JAMA Network Open, 3",
  issue: "(11), e2025889.",
  doi: "https://doi.org/10.1001/jamanetworkopen.2020.25889",
  fullText: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7672520/",
  topic: "由護理人員主導、讓病人與家屬一起參與的住院病人跌倒預防工具",
  why: [
    "開放取用，全文可以合法下載與上傳",
    "主題是住院病人跌倒預防，護理人員不陌生",
    "研究設計不是隨機分派，很適合練習分辨「有關聯」和「有效」",
    "結果有幾個清楚的數字，適合練習回原文核對",
  ],
};

/** 這門課的三個做法。 */
export const aiPrinciples = [
  ["不綁定工具", "每堂只教各家都有的動作：對話、貼上或上傳檔案、附來源的搜尋。畫面以你用的那一個為準。"],
  ["先學會懷疑，再學做東西", "第 4 到 6 堂先練查證，後面讀論文、做表、寫大綱時才不會照單全收。"],
  ["不評分、可以弄壞", "全課用同一篇示範論文練習，想換成自己的也可以。我們希望你親手看到它出錯一次。"],
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
  { id: "workshop", kind: "event", title: "實體課", sub: "60 分鐘，不用先看完預錄課", x: 1010, y: 636 },
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

// 實體課不用先看完預錄課，所以不接在第 13 堂後面，白板上是獨立的一張
const order = aiLessons.map((l) => `l${l.no}`);
const sequence: BoardEdge[] = order.slice(0, -1).map((id, i) => ({ from: id, to: order[i + 1] }));

export const aiBoardEdges: BoardEdge[] = [
  ...sequence,
  { from: "l0", to: "l2", label: "同一個問題重問一次" },
  { from: "l5", to: "l8", label: "回原文核對", labelAt: 0.5 },
  { from: "l8", to: "workshop", label: "實體課做的就是這張閱讀單" },
  { from: "l4", to: "l11", label: "提防它說好話", labelAt: 0.13 },
];
