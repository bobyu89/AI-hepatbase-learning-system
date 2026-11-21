// 「AI 不只是聊天」現場課的內容：一場 60 分鐘，同一件事做三輪：前兩輪把內容做對，第三輪做成 HTML 簡報帶走。
// 主軸是觀念，不綁定工具，不使用論文，沒有課前作業，不收成品。
// 三個觀念的整理參考 AI Fluency Framework（Rick Dakan 與 Joseph Feller 提出；
// © 2025 Rick Dakan、Joseph Feller 與 Anthropic，CC BY-NC-SA 4.0）。

export const aiSession = {
  motto: "AI 會換，這幾個動作不會換。",
  task: "從五個護理題目挑一個，讓 AI 幫你做出來，最後做成一份 HTML 簡報帶走。",
  minutes: 60,
};

/**
 * 五個題目，現場自由選一個。都不用論文、不碰病人資料，而且做的人看得出它哪裡錯。
 * one：第 1 輪第一次只打的那一句。clear：第 1 輪第二次，把話說清楚的範例。catch：第 2 輪最常抓到的問題。
 */
export const aiTopics: { title: string; use: string; one: string; clear: string; catch: string; deck: string }[] = [
  {
    title: "寫一份居家防跌衛教",
    use: "給病人或家屬",
    one: "寫一份居家防跌衛教。",
    clear: "我是病房護理師。請幫我寫一份居家防跌衛教，給 75 歲、獨居、看得懂國字但眼睛不好的阿嬤。只寫她自己做得到的五件事，每件一句話，不要用專有名詞。最後一句寫：什麼情況要打電話找人。",
    catch: "把「建議」講成「一定」、寫了她做不到的事、漏掉最要緊的一件",
    deck: "請把我們剛剛定稿的居家防跌衛教做成一份 HTML 簡報，給阿嬤和家人看。",
  },
  {
    title: "跟家屬解釋一個檢驗名詞",
    use: "例如發炎指數、血氧、白血球",
    one: "解釋一下發炎指數。",
    clear: "我是病房護理師，家屬問我「發炎指數是什麼」。請用三句話、不要用專有名詞，說明它在量什麼、為什麼要抽血看它。不要解釋數值高低代表什麼，也不要給治療建議；最後一句請他把疑問留給醫師。",
    catch: "為了好懂而講錯、偷偷判讀了數值、講得比醫師還確定",
    deck: "請把我們剛剛定稿的解釋做成一份 HTML 簡報，給家屬看。",
  },
  {
    title: "練習回應焦慮的家屬",
    use: "請 AI 扮演家屬，你來回應",
    one: "扮演一個焦慮的家屬。",
    clear: "請你扮演一位 50 多歲的女兒：母親因肺炎住院第二天，她剛下班趕到，覺得沒有人告訴她狀況，很生氣。一次只說一兩句，等我回應再說；我回得好你就慢慢緩和，回得不好就更激動。不要替我回答。我打「結束」之後，指出我哪一句可以說得更好。",
    catch: "太快被安撫、說出家屬不會說的話、最後的回饋只有稱讚",
    deck: "請把剛剛的對話整理成一份 HTML 教學簡報：家屬說了什麼、我怎麼回、哪一句可以說得更好，給學弟妹看。",
  },
  {
    title: "設計一個帶新人的案例討論",
    use: "給學弟妹、新進人員或學生，完全虛構",
    one: "出一個案例討論題。",
    clear: "我是外科病房的資深護理師，要帶兩位到職一個月的新人。請設計一個完全虛構的案例：術後第一天的病人，夜班出現一個需要判斷的變化。寫出病人背景、當下的生命徵象和三個討論問題，不要附答案。",
    catch: "數值前後矛盾、情境不合理、和你們單位實際的流程不一樣",
    deck: "請把剛剛的案例做成一份 HTML 簡報：一頁背景、一頁生命徵象、每個討論問題一頁，給新人討論用。",
  },
  {
    title: "請 AI 出題考你",
    use: "複習自己正在讀的主題",
    one: "出幾題考我。",
    clear: "我是專科護理師組研究生，正在複習＿＿（例如心衰竭病人的照護）。請出五題單選題考我，一次只出一題，等我回答再告訴我對錯和原因，然後出下一題。題目要是臨床情境題，不要考背數字。",
    catch: "答案是錯的、兩個選項都對、解釋和答案對不上",
    deck: "請把剛剛的五題做成一份 HTML 複習簡報：一頁一題，按一下才顯示答案和原因，給我自己複習。",
  },
];

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
  /** 收這一輪時用的比喻 */
  metaphor: string;
}

export const aiRounds: Round[] = [
  {
    no: 1,
    title: "先一句話問，再把話說清楚",
    change: "你交代了多少。同一個題目問兩次。",
    min: 11,
    type: [
      ["第一次，只打一句", "你選的那一題的一句話，例如：寫一份居家防跌衛教。"],
      ["第二次，開一個新的對話，多交代四件事", "我是＿＿。請幫我＿＿，給＿＿用（他們的情況是＿＿）。要＿＿（長度、格式）。不要＿＿。"],
    ],
    todo: ["兩次的回答並排看，差最多的是哪裡"],
    idea: "它只看得到你打給它的字，所以把話說清楚。",
    fluency: "描述",
    metaphor: "就像交班只說一句「三床要注意」，接班的人沒辦法做事。",
  },
  {
    no: 2,
    title: "你當考官，找出它的錯",
    change: "你的角色。上一輪你是提問的人，這一輪你是考官。",
    min: 11,
    type: [["找到之後打", "你說「＿＿」，這不對（或：講太滿、不像真的）。正確的是＿＿。請修改。"]],
    todo: ["把剛剛的回答從頭讀一次", "找三種句子：錯的、講太滿的、漏掉或不像真的", "找到一句就夠"],
    idea: "它是接出最像樣的下一句，不是去查資料。講得再肯定，也要自己查。",
    fluency: "辨別",
    metaphor: "就像一位很會講話的新同事：講得頭頭是道，你還是會自己再看一次。",
  },
  {
    no: 3,
    title: "做成一份 HTML 簡報，帶走",
    change: "你要的東西。從一段文字，變成一個可以帶走的檔案。",
    min: 20,
    type: [
      [
        "照這個樣子打",
        "請把＿＿做成一份 HTML 簡報，給＿＿看。只用一個 HTML 檔，所有程式寫在同一個檔案裡。一頁一個重點，字要大，按鍵盤左右鍵可以換頁。內容只能用剛剛定稿的版本，不要加新的資訊。風格：＿＿。請給我完整的程式碼。",
      ],
    ],
    todo: ["先挑一個風格", "存成 .html 檔，雙擊用瀏覽器打開", "對照剛剛定稿的內容：有沒有被改掉、有沒有多出來的", "挑一個地方請它改，再存一次"],
    idea: "它做得出成品，但要不要交出去，是你決定的。",
    fluency: "委派與盡責",
    metaphor: "就像交出去的紀錄：誰簽名，誰負責。",
  },
];

/** 要帶來的東西。沒有課前作業。 */
export const aiBring = [
  ["一台筆電，充好電", "平板也可以。手機不建議，螢幕太小。"],
  ["一個已經登入的 AI 工具", "ChatGPT、Gemini、Claude 都可以，選一個就好，免費版就夠。學校如果有提供，以學校的為準。請在要帶來的那台電腦上先登入一次。"],
  ["想一下要選哪一題", "現場有五個護理題目讓你挑一個，到了再選也可以。選你最熟的，等一下你要當它的考官。"],
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

/** 第 3 輪後面的數字。Gallup／Walton Family Foundation 2025，美國中小學教師約 2,000 多位。 */
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
  ["Loop（2026）", "怎麼讓它做完自己檢查、自己修正", "第 2、3 輪：找錯，做、看、改再一次"],
  ["不管叫什麼", "目標是什麼、什麼時候算完成、出錯誰負責", "第 3 輪：要不要交出去，你決定"],
];

/** 今天怎麼走。[段落, 做什麼, 大約幾分鐘] */
export const aiAgenda: [string, string, string][] = [
  ["先看地圖", "AI 這幾年走到哪裡、現在有哪些、排行榜怎麼看", "約 10 分鐘"],
  ["動手做三輪", "前兩輪把內容做對，第三輪做成 HTML 簡報帶走", "約 40 分鐘"],
  ["回頭看", "名詞每年換，動作沒有換", "約 5 分鐘"],
];

/** 第 4 輪舉手表決的三個情境。[情境, 講完之後可以說的] */
export const aiScenarios: [string, string][] = [
  ["一篇已經發表、可以免費下載的文章", "多數情況可以。"],
  ["一段去掉了姓名的護理紀錄", "拿掉名字，不等於認不出來。年齡、診斷、日期、單位放在一起，還是認得出是誰。"],
  ["同學還沒交出去的報告，他請你幫忙看", "那是別人的東西，要先問過他。"],
];

/**
 * 第 3 輪可選的風格。取自 beautiful-html-templates（Zara Zhang，MIT 授權），挑六個適合護理題目的。
 * sentence 是貼在問法最後的風格句，任何網頁版 AI 都能用；想更像，把 template.html 附給 AI。
 */
export const aiStylesSource = {
  name: "beautiful-html-templates",
  url: "https://github.com/zarazhangrui/beautiful-html-templates",
  credit: "Zara Zhang",
  license: "MIT",
  count: 34,
};
export const aiStyles: { slug: string; name: string; zh: string; fit: string; sentence: string }[] = [
  {
    slug: "daisy-days",
    name: "Daisy Days",
    zh: "雛菊",
    fit: "給長輩、小朋友的衛教",
    sentence: "明亮可愛的手繪風。奶油色背景，薄荷綠、粉紅、奶油黃的圓角卡片，深咖啡色粗外框，角落有小雛菊和星星，字體圓潤好讀",
  },
  {
    slug: "blue-professional",
    name: "Blue Professional",
    zh: "專業藍",
    fit: "給家屬的說明、在職教育",
    sentence: "專業、乾淨、讓人信任。米白背景，只用一種鈷藍色當重點色，標題用現代的無襯線字，卡片是淡藍底、圓角、細邊框",
  },
  {
    slug: "pin-and-paper",
    name: "Pin & Paper",
    zh: "別針筆記",
    fit: "帶新人的案例討論、教學",
    sentence: "像手寫的田野筆記本。黃色紙張背景、深藍墨水色文字，卡片像用安全別針別在紙上，旁邊有手寫字的註記",
  },
  {
    slug: "editorial-forest",
    name: "Editorial Forest",
    zh: "森林雜誌",
    fit: "報告、讀書會",
    sentence: "沉穩的文學雜誌。燕麥奶油色背景，深森林綠配灰粉紅，標題用優雅的襯線字，留白多",
  },
  {
    slug: "playful",
    name: "Playful",
    zh: "暖桃手作",
    fit: "社區衛教、輕鬆的分享",
    sentence: "溫暖親切的手作感。蜜桃色背景、炭黑色文字，有手繪線條和圓滾滾的不規則形狀，卡片微微傾斜",
  },
  {
    slug: "monochrome",
    name: "Monochrome",
    zh: "黑白書卷",
    fit: "複習題、要印出來的",
    sentence: "安靜的黑白書卷感。米白紙色背景，只用黑色和灰色，標題用細的無襯線字，用細線分隔，不用任何彩色",
  },
];

/** HTML 簡報和 PPT 的比較。[項目, HTML 簡報, PPT] */
export const aiCompare: [string, string, string][] = [
  ["是什麼", "一個網頁檔（.html）", "一個簡報檔（.pptx）"],
  ["怎麼打開", "瀏覽器就行，電腦、手機都可以", "PowerPoint、Keynote 或 Google 簡報"],
  ["怎麼做", "用說的，AI 寫程式碼", "自己拖拉排版"],
  ["怎麼改", "跟 AI 說哪裡要改", "自己點進去改"],
  ["擅長", "版面一致、動畫、可以互動", "大家都會改、學校有範本"],
  ["要注意", "改一個字也要靠 AI；字型多半要連網才會一樣", "換一台電腦，字型和版面可能跑掉"],
];

/**
 * 圖文頁上，每一輪拆成幾個畫面：先猜、動手的每一步各一頁、最後收這一輪。
 * 動手的時候畫面停在那一步，換下一步才換頁。
 */
export interface RoundPage {
  title: string;
  /** 動手前先請大家猜 */
  guess?: string;
  lead?: string;
  /** 要打的話：[標籤, 內容] */
  type?: [string, string];
  /** 三張並排的卡片：[標題, 說明] */
  cards?: [string, string][];
  items?: string[];
  /** 舉手表決的三個情境 */
  vote?: boolean;
  /** 要寫下來的一句話 */
  fill?: string;
  /** 和旁邊的人講一分鐘 */
  talk?: string;
  /** 放範例簡報的連結 */
  sample?: boolean;
  /** 放 HTML 簡報和 PPT 的比較表 */
  compare?: boolean;
  /** 放六個風格的縮圖 */
  styles?: boolean;
  /** 放 HyperFrames 做的範例影片 */
  video?: boolean;
  /** 這一頁最後揭曉這一輪的觀念 */
  idea?: boolean;
  /** 這一步為什麼這樣做 */
  note?: string;
}

/** 每一輪的頭和尾：目標、做完手上會有什麼、多數人會看到什麼、怎麼接到下一輪。 */
export const aiRoundFrame: Record<number, { goal: string; have: string; see: string; next: string }> = {
  1: {
    goal: "親眼看到：同一個 AI，只因為你交代得不一樣，答案就差很多。",
    have: "同一個題目的兩段回答，可以並排比較。",
    see: "第一次不算錯，但很通用，換誰來問都差不多。第二次才像是為你、為那個人做的。",
    next: "下一輪：這段看起來很順的回答，裡面有沒有錯？",
  },
  2: {
    goal: "用你的專業，親手抓到它一個講錯或講太滿的地方。",
    have: "一句它講錯的話，和你改正之後的版本。",
    see: "有人抓到明顯的錯，有人抓到的是講太滿。這一次沒抓到，不代表下一次沒有。",
    next: "下一輪：內容對了，把它做成一份可以帶走的簡報。",
  },
  3: {
    goal: "把前兩輪做對的內容，做成一份可以帶走的 HTML 簡報，並檢查它轉換時有沒有偷改。",
    have: "一個 .html 檔，雙擊就能打開的簡報。",
    see: "多數人第一次就做得出來，但常有一兩頁字太多、版面跑掉，或多了你沒寫過的內容。改一兩次就能用。這份簡報是 AI 做的，但要拿去用的是你。",
    next: "接下來：回頭看這三輪，和這幾年的新名詞對一對。",
  },
};

/** 整堂課的目標與結果，放在開始動手之前。 */
export const aiSessionFrame = {
  goal: "同一件事做三輪：先把內容做對，再做成一份可以帶走的 HTML 簡報。",
  have: ["一份 HTML 簡報，雙擊就能打開", "一句你抓到的錯", "一句你自己的界線"],
};

export const aiRoundPages: Record<number, RoundPage[]> = {
  1: [
    {
      title: "先一句話問，再把話說清楚",
      lead: "這一輪只改：你交代了多少。同一個題目問兩次。",
      guess: "第二次只多打三句話。你猜答案會差多少？",
    },
    {
      title: "第一次：只打這一句",
      lead: "故意用最省事的方式問，看它在什麼都不知道的時候會給你什麼。其他都不要加，打你那一題的這一句：",
      items: aiTopics.map((t, i) => `${i + 1}　${t.one}`),
    },
    {
      title: "第二次：開一個新的對話",
      type: ["照這個樣子打", "我是＿＿。請幫我＿＿，給＿＿用（他們的情況是＿＿）。要＿＿（長度、格式）。不要＿＿。"],
      note: "多交代四件事：你是誰、給誰用、要什麼樣子、不要什麼。每一題的完整範例在講義上。開新對話，是為了不讓它記得剛剛那一次。",
    },
    {
      title: "兩次的回答並排看",
      items: ["第一次那個，直接拿去用，合適嗎", "換一個人來問，它是不是也會給第一次那一段"],
      talk: "差最多的是哪裡？和你猜的一樣嗎？",
    },
    { title: "這一輪的結果", idea: true },
  ],
  2: [
    {
      title: "你當考官，找出它的錯",
      lead: "這一輪只改：你的角色。上一輪你是提問的人，這一輪你是考官。",
      guess: "剛剛那段看起來很順的回答，裡面有沒有錯？",
    },
    {
      title: "從頭讀一次，找三種句子",
      cards: [
        ["錯的", "和你知道的不一樣"],
        ["講太滿的", "原本是「通常」「可能」，它講成「一定」「都會」"],
        ["漏掉或不像的", "照著做會出問題，或真實情況不會這樣"],
      ],
      lead: "找到一句就夠。",
      note: "不要問它「你確定嗎」。它說確定不算數。這個題目你是專家，你說了算。",
    },
    {
      title: "找到之後，直接跟它說",
      type: ["照這個樣子打", "你說「＿＿」，這不對（或：講太滿、不像真的）。正確的是＿＿。請修改。"],
      note: "直接指出是哪一句、錯在哪、正確的是什麼。然後看它改得對不對。",
    },
    {
      title: "你抓到了什麼",
      talk: "你抓到的是哪一種？它改對了嗎？",
    },
    { title: "這一輪的結果", idea: true },
  ],
  3: [
    {
      title: "做成一份 HTML 簡報，帶走",
      lead: "這一輪只改：你要的東西。從一段文字，變成一個可以帶走的檔案。",
      guess: "同一份內容做成簡報，它會不會偷偷改掉你剛剛修好的地方？",
    },
    {
      title: "HTML 簡報和 PPT 差在哪",
      compare: true,
      note: "不是誰取代誰。要大家一起改、要套學校範本，PPT 還是比較方便。",
    },
    {
      title: "HTML 簡報特別在哪",
      cards: [
        ["用說的就能做", "不用會排版，說清楚要什麼，AI 寫出整份"],
        ["一個檔案，到處打開", "傳給別人，對方用手機點開就能看"],
        ["可以互動", "翻頁動畫、按一下才出現答案，PPT 很難做到"],
      ],
      note: "先看一份做好的範例：居家防跌衛教，7 頁，用左右鍵換頁。",
      sample: true,
    },
    {
      title: "先挑一個風格",
      styles: true,
      note: "風格句在講義第 2 頁。想更像：下載範本檔附給 AI，寫「照附件範本的版型、配色和字體」。",
    },
    {
      title: "照這個樣子打",
      type: [
        "在同一個對話裡接著打",
        "請把＿＿做成一份 HTML 簡報，給＿＿看。只用一個 HTML 檔，所有程式寫在同一個檔案裡。一頁一個重點，字要大，按鍵盤左右鍵可以換頁。內容只能用剛剛定稿的版本，不要加新的資訊。風格：＿＿。請給我完整的程式碼。",
      ],
      note: "第一句換成你那一題的，講義第 2 頁都寫好了；風格貼你挑的那一句。在同一個對話裡打，它才看得到你剛剛改好的版本。",
    },
    {
      title: "存成檔案，打開",
      items: [
        "工具旁邊直接出現預覽、有下載按鈕：直接下載",
        "沒有：按程式碼右上角的「複製」，貼進記事本（Mac 用文字編輯，先選「格式 → 製作純文字」）",
        "另存新檔，檔名打「我的簡報.html」，編碼選 UTF-8",
        "雙擊這個檔案，用瀏覽器打開，按左右鍵換頁",
        "打開是一堆字，或中文變亂碼：多半是沒選 UTF-8，或副檔名還是 .txt",
      ],
    },
    {
      title: "看一次、改一次",
      items: ["對照剛剛定稿的內容：有沒有被改掉，有沒有多出你沒寫過的", "挑一個地方請它改，例如「第 3 頁字太多，拆成兩頁」", "改好再存一次，蓋掉舊的檔案"],
      talk: "你的簡報，現在可以直接拿去用嗎？還差什麼？",
    },
    {
      title: "之後還可以：做成影片",
      lead: "HyperFrames（HeyGen 開源）用 HTML 寫畫面、輸出成 MP4。這支就是：畫面是 HTML，旁白是 AI 合成的聲音。",
      video: true,
      items: ["要裝在自己的電腦上，搭配 Claude Code 這類 AI 工具，今天不操作", "做法還是一樣：說清楚要什麼、看一次、叫它改"],
    },
    { title: "這一輪的結果", idea: true },
  ],
};
