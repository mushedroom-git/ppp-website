import type { Tint } from "../data/builds";

const pesoFormat = new Intl.NumberFormat("en-PH", { style: "currency", currency: "PHP", maximumFractionDigits: 0 });
export const peso = (n: number) => pesoFormat.format(n);

/** "AMD Ryzen 7 9800X3D" → "Ryzen 7 9800X3D" */
export const shortPart = (s: string) => s.replace(/^(AMD|Intel|GeForce|Radeon) /, "").replace(/^Core /, "");

/** One photo is recoloured per build until real photos are added. */
export const tintFilter: Record<Tint, string> = {
  green: "none",
  white: "saturate(0) brightness(1.3) contrast(1.05)",
  red: "hue-rotate(250deg) saturate(1.2)",
  blue: "hue-rotate(110deg)",
  purple: "hue-rotate(170deg)",
  amber: "hue-rotate(300deg) saturate(1.2)",
  cyan: "hue-rotate(80deg)",
  pink: "hue-rotate(220deg)",
};

export const BUDGET_MIN = 40000;
export const BUDGET_MAX = 300000;
export const roundBudget = (n: number) => Math.min(BUDGET_MAX, Math.max(BUDGET_MIN, Math.round(n / 5000) * 5000));
