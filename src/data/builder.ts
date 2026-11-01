import type { Resolution, Tint } from "./builds";

export type Option = {
  name: string;
  note: string;
  price: number;
  /** GPU options: the resolution they suit. */
  tier?: Resolution;
  /** Lighting options: the photo tint. */
  tint?: Tint;
};

export type GroupKey = "cpu" | "gpu" | "ram" | "ssd" | "base" | "light";
export type Group = { key: GroupKey; title: string; opts: Option[] };

export const ASSEMBLY_FEE = 3500;

export const groups: Group[] = [
  {
    key: "cpu", title: "Processor",
    opts: [
      { name: "Ryzen 5 7500F", note: "6 cores", price: 9800 },
      { name: "Ryzen 5 9600X", note: "6 cores", price: 14500 },
      { name: "Core Ultra 7 265K", note: "20 cores", price: 22000 },
      { name: "Ryzen 7 9800X3D", note: "Best for gaming", price: 29500 },
      { name: "Ryzen 9 9950X3D", note: "Gaming + creating", price: 42000 },
    ],
  },
  {
    key: "gpu", title: "Graphics card",
    opts: [
      { name: "RX 9060 XT 16GB", note: "1080p", price: 24500, tier: "1080p" },
      { name: "RTX 5060 Ti 16GB", note: "1080p high refresh", price: 29000, tier: "1080p" },
      { name: "RTX 5070 12GB", note: "1440p", price: 36500, tier: "1440p" },
      { name: "RX 9070 XT 16GB", note: "1440p high refresh", price: 42000, tier: "1440p" },
      { name: "RTX 5070 Ti 16GB", note: "1440p to 4K", price: 52000, tier: "1440p" },
      { name: "RTX 5080 16GB", note: "4K", price: 72000, tier: "4K" },
      { name: "RTX 5090 32GB", note: "4K, no limits", price: 140000, tier: "4K" },
    ],
  },
  {
    key: "ram", title: "Memory",
    opts: [
      { name: "16GB DDR5", note: "Light gaming", price: 4800 },
      { name: "32GB DDR5", note: "Recommended", price: 9200 },
      { name: "64GB DDR5", note: "Editing, streaming", price: 18500 },
    ],
  },
  {
    key: "ssd", title: "Storage",
    opts: [
      { name: "1TB NVMe", note: "About 10 big games", price: 4200 },
      { name: "2TB NVMe", note: "About 20 big games", price: 7800 },
      { name: "4TB NVMe", note: "Whole library", price: 16500 },
    ],
  },
  {
    key: "base", title: "Case, board and power",
    opts: [
      { name: "Standard", note: "Air cooler, 750W Gold", price: 16000 },
      { name: "Premium", note: "360mm AIO, 1000W Gold, glass case", price: 27000 },
    ],
  },
  {
    key: "light", title: "Lighting",
    opts: [
      { name: "Green", note: "", price: 0, tint: "green" },
      { name: "Arctic white", note: "", price: 0, tint: "white" },
      { name: "Ice blue", note: "", price: 0, tint: "blue" },
      { name: "Crimson", note: "", price: 0, tint: "red" },
      { name: "Violet", note: "", price: 0, tint: "purple" },
    ],
  },
];

export const defaultPicks: Record<GroupKey, number> = { cpu: 3, gpu: 4, ram: 1, ssd: 1, base: 0, light: 0 };

export const swatch: Partial<Record<Tint, string>> = {
  green: "#7CFF3A", white: "#F2F4F1", blue: "#3FA9FF", red: "#FF4B4B", purple: "#A970FF",
};
