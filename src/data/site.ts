// 全站設定。之後要改站名、補上直播連結，改這一個檔案就好。

export const site = {
  // 站名是暫定的，確定後改這一行。
  name: "Bob 的學習白板",
  tagline: "把一門課攤開成一張白板",
};

export const obsidianCourse = {
  // 直播場的 Google Meet 連結。留空時網站顯示「連結即將公布」。
  meetUrl: "",
  // 直播與工作坊的日期，例如 "2026 年 12 月 6 日（六）14:00"。留空時顯示「日期即將公布」。
  liveDate: "",
  workshopDate: "",
  workshopPlace: "",
};

// 還在準備的課。只列已經確定的資訊；有了課程內容再做成完整的課程頁與白板。
export const upcomingCourses = [
  {
    title: "AI 不只是聊天：初學者的生成式 AI 實用入門",
    audience: "學生",
  },
];
