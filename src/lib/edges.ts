import { CARD_W, CARD_H } from "../data/course";

export interface Pt {
  x: number;
  y: number;
}

/**
 * 兩張卡片之間的連線。回傳 SVG path 與標籤位置。
 * 同一列相鄰：右邊出、左邊進。不同列：下方出、上方進。同一列但隔著卡片：從上方繞過去。
 */
export function edgeGeometry(a: Pt, b: Pt, w = CARD_W, h = CARD_H) {
  const ac = { x: a.x + w / 2, y: a.y + h / 2 };
  const bc = { x: b.x + w / 2, y: b.y + h / 2 };
  const dx = bc.x - ac.x;
  const dy = bc.y - ac.y;
  let p0: Pt, p1: Pt, p2: Pt, p3: Pt;

  if (Math.abs(dy) > h * 0.9) {
    const s = Math.sign(dy);
    p0 = { x: ac.x, y: ac.y + (s * h) / 2 };
    p3 = { x: bc.x, y: bc.y - (s * h) / 2 };
    const k = Math.max(56, Math.abs(p3.y - p0.y) * 0.5);
    p1 = { x: p0.x, y: p0.y + s * k };
    p2 = { x: p3.x, y: p3.y - s * k };
  } else if (Math.abs(dx) > w * 1.9) {
    p0 = { x: ac.x + Math.sign(dx) * w * 0.2, y: a.y };
    p3 = { x: bc.x - Math.sign(dx) * w * 0.2, y: b.y };
    const lift = 78;
    p1 = { x: p0.x + dx * 0.12, y: Math.min(p0.y, p3.y) - lift };
    p2 = { x: p3.x - dx * 0.12, y: Math.min(p0.y, p3.y) - lift };
  } else {
    const s = Math.sign(dx) || 1;
    p0 = { x: ac.x + (s * w) / 2, y: ac.y };
    p3 = { x: bc.x - (s * w) / 2, y: bc.y };
    const k = Math.max(24, Math.abs(p3.x - p0.x) * 0.5);
    p1 = { x: p0.x + s * k, y: p0.y };
    p2 = { x: p3.x - s * k, y: p3.y };
  }

  const r = (n: number) => Math.round(n * 10) / 10;
  const d = `M${r(p0.x)} ${r(p0.y)} C${r(p1.x)} ${r(p1.y)} ${r(p2.x)} ${r(p2.y)} ${r(p3.x)} ${r(p3.y)}`;
  const at = (t: number) => {
    const u = 1 - t;
    return {
      x: r(u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x),
      y: r(u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y),
    };
  };
  return { d, mid: at(0.5), at };
}
