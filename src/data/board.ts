// 白板共用的型別與卡片尺寸。
export type Role = "a" | "b";

export interface BoardNode {
  id: string;
  kind: "lesson" | "event" | "tool";
  no?: number;
  title: string;
  sub: string;
  x: number;
  y: number;
}

export interface BoardEdge {
  from: string;
  to: string;
  /** 有 label 的是跨堂呼應，沒有的是單純的上課順序。 */
  label?: string;
  /** 標籤放在連線的哪個位置，0 是起點、1 是終點。 */
  labelAt?: number;
}

export const CARD_W = 236;
export const CARD_H = 124;
