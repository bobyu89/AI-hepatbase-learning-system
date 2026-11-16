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
    min: 15,
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
    min: 13,
    type: [["找到之後打", "你說「＿＿」，這不對（或：這講得太滿）。正確的是＿＿。請修改。"]],
    todo: ["把剛剛的回答從頭讀一次", "找三種句子：錯的、講太滿的、漏掉會讓人誤會的", "找到一句就夠"],
    idea: "它是接出最像樣的下一句，不是去查資料。講得再肯定，也要自己查。",
    fluency: "辨別",
  },
  {
    no: 3,
    title: "換一個工具，問法一個字都不改",
    change: "換掉 AI。問法不動。",
    min: 11,
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
    min: 10,
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
