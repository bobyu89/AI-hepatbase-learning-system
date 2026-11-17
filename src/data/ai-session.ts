// 「AI 不只是聊天」現場課的內容：一場 60 分鐘，同一件事做四輪，每輪只改一樣。
// 主軸是觀念，不綁定工具，不使用論文，沒有課前作業，不收成品。
// 四個觀念的整理參考 AI Fluency Framework（Rick Dakan 與 Joseph Feller 提出；
// © 2025 Rick Dakan、Joseph Feller 與 Anthropic，CC BY-NC-SA 4.0）。

export const aiSession = {
  motto: "AI 會換，這幾個動作不會換。",
  task: "把一個你最懂的專業概念，講給外行人聽。",
  minutes: 60,
};

export interface Round {
  no: number;
  title: string;
  /** 這一輪只改什麼 */
  change: string;
  /** 分鐘 */
  min: number;
  /** 要打的話：[標籤, 內容] */
  type: [string, string][];
  /** 要做的事 */
  todo: string[];
  /** 這一輪看到的觀念 */
  idea: string;
  /** 對應 AI Fluency Framework 的哪一項 */
  fluency: string;
}

export const aiRounds: Round[] = [
  {
    no: 1,
    title: "先一句話問，再把話說清楚",
    change: "你交代了多少。同一個題目問兩次。",
    min: 12,
    type: [
      ["第一次，只打這一句", "解釋一下＿＿。"],
      [
        "第二次，開一個新的對話",
        "我是＿＿。我要把「＿＿」講給＿＿聽，他們已經知道＿＿，還不知道＿＿。請用三段話解釋，不要用專有名詞；一定要用的話，第一次出現時解釋它。最後給一個生活裡的例子。",
      ],
    ],
    todo: ["兩次的回答並排看，差最多的是哪裡"],
    idea: "它只看得到你打給它的字，所以把話說清楚。",
    fluency: "描述",
  },
  {
    no: 2,
    title: "你當考官，找出它的錯",
    change: "你的角色。上一輪你是提問的人，這一輪你是考官。",
    min: 12,
    type: [["找到之後打", "你說「＿＿」，這不對（或：這講得太滿）。正確的是＿＿。請修改。"]],
    todo: ["把剛剛的回答從頭讀一次", "找三種句子：錯的、講太滿的、漏掉會讓人誤會的", "找到一句就夠"],
    idea: "它是接出最像樣的下一句，不是去查資料。講得再肯定，也要自己查。",
    fluency: "辨別",
  },
  {
    no: 3,
    title: "換一個工具，問法一個字都不改",
    change: "換掉 AI。問法不動。",
    min: 8,
    type: [],
    todo: [
      "把第 1 輪第二次的問法，貼到旁邊同學的工具裡；或開新對話請它再答一次",
      "比一比：字句一樣嗎",
      "把話說清楚還有用嗎",
      "上一輪抓到的那種問題，還在嗎",
    ],
    idea: "答案會變，工具會換。做法不跟著變。",
    fluency: "描述與辨別",
  },
  {
    no: 4,
    title: "手離開鍵盤，做判斷",
    change: "不動手，只判斷。",
    min: 8,
    type: [],
    todo: [
      "三個情境，能不能貼給 AI：一篇已發表、可免費下載的文章；去掉姓名的護理紀錄；同學還沒交出去的報告",
      "寫一句給自己看：有一件事，我不會交給 AI",
    ],
    idea: "交出去的東西，負責的是你。",
    fluency: "盡責與委派",
  },
];

/** 要帶來的東西。沒有課前作業。 */
export const aiBring = [
  ["一台筆電，充好電", "平板也可以。手機不建議，螢幕太小。"],
  ["一個已經登入的 AI 工具", "ChatGPT、Gemini、Claude 都可以，選一個就好，免費版就夠。學校如果有提供，以學校的為準。請在要帶來的那台電腦上先登入一次。"],
  ["一個你最懂的專業概念", "一個詞就好，路上想也可以。等一下你要當它的考官。"],
] as const;

export const aiNotBring = "不用帶論文，沒有課前作業。請不要帶、也不要貼病人的任何資料，包括去掉名字的紀錄。";

export const aiFrameworkSource = {
  name: "AI Fluency Framework",
  url: "https://aifluencyframework.org/",
  credit: "© 2025 Rick Dakan、Joseph Feller 與 Anthropic",
  license: "CC BY-NC-SA 4.0",
  licenseUrl: "https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hant",
};

// ───────── 現場投影用的圖文頁（/courses/ai/live/）─────────

/** 開場的數字。HEPI／Kortext《Student Generative AI Survey 2025》，1,041 位英國大學部學生。 */
export const aiOpeningStats = {
  bars: [
    ["用過 AI", 92],
    ["用在作業上", 88],
    ["把 AI 寫的字直接放進作業", 18],
  ] as [string, number][],
  source: "HEPI／Kortext，Student Generative AI Survey 2025，1,041 位英國大學部學生",
  url: "https://www.hepi.ac.uk/reports/student-generative-ai-survey-2025/",
};

/** 時間軸。[年份, AI 發生的事, 人在學的事] */
export const aiTimeline: [string, string, string][] = [
  ["2017", "Transformer 架構提出", ""],
  ["2022 年底", "ChatGPT 上線，一般人第一次直接跟它對話", ""],
  ["2023", "GPT-4，能力第一次讓人有感", "怎麼問（prompt）"],
  ["2024", "會看圖、聽聲音；出現先想再答的推理模型", ""],
  ["2025", "開始能自己動手做事（agent）", "給它對的資料（context）"],
  ["2026", "能連續自己工作很久，旗艦幾個月換一代", "設計讓它自己做、自己檢查（loop）"],
];

/**
 * 現在有哪些。這一段過時得最快：上課前一天到 arena.ai 與 artificialanalysis.ai 核對，並更新查詢日期。
 * 目前的內容來自第三方彙整網站，各站數字互相矛盾，沒有對過官方榜單。
 * [誰, 目前的旗艦, 何時, 常被提到的長處]
 */
export const aiLandscapeAsOf = "2026 年 11 月 17 日";
export const aiLandscape: [string, string, string, string][] = [
  ["OpenAI", "GPT-6 Astra", "2026 年 9 月", "長時間自主作業、操作電腦、進階數學"],
  ["Google", "Gemini 4 Carbon", "2026 年 10–11 月", "真人盲測投票的榜上排第一"],
  ["Anthropic", "Claude Fable 5.2", "2026 年", "綜合指數與寫程式的評測領先"],
  ["Meta", "Muse Spark 1.3", "2026 年 9 月", "真人投票的榜上排前段"],
  ["開放權重", "Kimi K3.1 Pro、DeepSeek V4.1 Flash", "2026 年", "可以下載到自己的機器上跑"],
];

/** 同一個月，兩個榜，兩個第一名。[榜, 量的是什麼, 第一名] */
export const aiBoards: [string, string, string][] = [
  ["真人盲測投票", "人覺得哪個回答比較好", "Google"],
  ["綜合考試分數", "一組固定題目考幾分", "Anthropic"],
];
export const aiBoardQuestions = ["量的是什麼？", "誰量的？", "什麼時候量的？"];

/** 第 4 輪後面的數字。Gallup／Walton Family Foundation 2025，美國中小學教師約 2,000 多位。 */
export const aiPolicyStats = {
  bars: [
    ["這學年用過 AI 的老師", 60],
    ["學校有 AI 規定的老師", 19],
  ] as [string, number][],
  source: "Gallup／Walton Family Foundation，2025 年美國中小學教師調查",
  url: "https://news.gallup.com/poll/715364/teachers-using-say-frees-time-matters-most.aspx",
  quote: "把它當思考的夥伴，不要當思考的替代品。",
  quoteSource: "一位大學教師，引自 Anthropic 2025 年 8 月的教育報告",
};

/** 回頭看：名詞每年換，動作沒有換。[流行的說法, 它在問的問題, 今天的哪一輪] */
export const aiNames: [string, string, string][] = [
  ["Prompt（2023 起）", "這一次我要怎麼問", "第 1 輪：把話說清楚"],
  ["Context（2025）", "要讓它看到哪些資料", "第 1 輪：它只看得到你給的字"],
  ["Loop（2026）", "怎麼讓它做完自己檢查、自己修正", "第 2 輪：你當考官找錯"],
  ["不管叫什麼", "目標是什麼、什麼時候算完成、出錯誰負責", "第 4 輪：負責的是你"],
];
