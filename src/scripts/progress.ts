// 學習進度只存在這台裝置的瀏覽器裡，沒有帳號、沒有伺服器。
// localStorage 可能被停用（無痕視窗、封鎖網站資料），所以每次讀寫都包起來，失敗時頁面照常運作。

import type { Role } from "../data/course";

const DONE_KEY = "lb:obsidian:done";
const ROLE_KEY = "lb:role";
const POS_KEY = "lb:obsidian:positions";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 存不進去就算了，這次的狀態只留在畫面上 */
  }
}

export function getDone(): Set<number> {
  return new Set(read<number[]>(DONE_KEY, []).filter((n) => Number.isInteger(n)));
}

export function setDone(no: number, done: boolean) {
  const set = getDone();
  if (done) set.add(no);
  else set.delete(no);
  write(DONE_KEY, [...set].sort((a, b) => a - b));
  document.dispatchEvent(new CustomEvent("lb:progress"));
  return set;
}

export function nextLesson(total: number, done = getDone()): number | null {
  for (let i = 0; i < total; i++) if (!done.has(i)) return i;
  return null;
}

export function getRole(): Role {
  return read<Role>(ROLE_KEY, "a") === "b" ? "b" : "a";
}

export function setRole(role: Role) {
  write(ROLE_KEY, role);
  document.documentElement.dataset.role = role;
  document.dispatchEvent(new CustomEvent("lb:role"));
}

export type Positions = Record<string, { x: number; y: number }>;
export const getPositions = () => read<Positions>(POS_KEY, {});
export const setPositions = (p: Positions) => write(POS_KEY, p);
export const clearPositions = () => {
  try {
    localStorage.removeItem(POS_KEY);
  } catch {
    /* 同上 */
  }
};
