export type Tint = "green" | "white" | "red" | "blue" | "purple" | "amber" | "cyan" | "pink";
export type Resolution = "1080p" | "1440p" | "4K";
export type BuildStatus = "available" | "reserved" | "sold";

export type Build = {
  id: string;
  name: string;
  res: Resolution;
  status: BuildStatus;
  price: number;
  date: string;
  tint: Tint;
  parts: {
    CPU: string;
    Cooler: string;
    Motherboard: string;
    Memory: string;
    Graphics: string;
    Storage: string;
    Power: string;
    Case: string;
  };
  fps: [game: string, fps: number][];
};

export const statusLabel: Record<BuildStatus, string> = {
  available: "Available",
  reserved: "Reserved",
  sold: "Sold",
};

/* Sample builds. Replace with your own (or an API call later). */
export const builds: Build[] = [
  {
    id: "mayon", name: "Mayon", res: "4K", status: "available", price: 168500, date: "2026-10-28", tint: "white",
    parts: { CPU: "AMD Ryzen 7 9800X3D", Cooler: "360mm AIO", Motherboard: "B850 WiFi", Memory: "32GB DDR5-6000", Graphics: "GeForce RTX 5080 16GB", Storage: "2TB Gen4 NVMe", Power: "1000W 80+ Gold", Case: "Dual-chamber glass, white" },
    fps: [["Cyberpunk 2077 · 4K", 92], ["Black Myth: Wukong · 4K", 84], ["Valorant · 1440p", 520]],
  },
  {
    id: "taal", name: "Taal", res: "1440p", status: "available", price: 98900, date: "2026-10-20", tint: "red",
    parts: { CPU: "AMD Ryzen 7 7800X3D", Cooler: "Dual-tower air", Motherboard: "B650 WiFi", Memory: "32GB DDR5-6000", Graphics: "Radeon RX 9070 XT 16GB", Storage: "1TB Gen4 NVMe", Power: "850W 80+ Gold", Case: "Mesh front, black" },
    fps: [["Cyberpunk 2077 · 1440p", 118], ["Monster Hunter Wilds · 1440p", 96], ["Valorant · 1440p", 480]],
  },
  {
    id: "apo", name: "Apo", res: "1440p", status: "reserved", price: 124000, date: "2026-10-14", tint: "blue",
    parts: { CPU: "Intel Core Ultra 7 265K", Cooler: "280mm AIO", Motherboard: "Z890 WiFi", Memory: "32GB DDR5-6400", Graphics: "GeForce RTX 5070 Ti 16GB", Storage: "2TB Gen4 NVMe", Power: "850W 80+ Gold", Case: "Silent panel, grey" },
    fps: [["Cyberpunk 2077 · 1440p", 128], ["Black Myth: Wukong · 1440p", 104], ["Fortnite · 1440p", 210]],
  },
  {
    id: "banahaw", name: "Banahaw", res: "1080p", status: "available", price: 64500, date: "2026-10-09", tint: "green",
    parts: { CPU: "AMD Ryzen 5 9600X", Cooler: "Tower air", Motherboard: "B650M WiFi", Memory: "32GB DDR5-6000", Graphics: "GeForce RTX 5060 Ti 16GB", Storage: "1TB Gen4 NVMe", Power: "750W 80+ Gold", Case: "Compact glass" },
    fps: [["Cyberpunk 2077 · 1080p", 112], ["Valorant · 1080p", 560], ["Apex Legends · 1080p", 240]],
  },
  {
    id: "makiling", name: "Makiling", res: "1080p", status: "available", price: 47900, date: "2026-09-30", tint: "purple",
    parts: { CPU: "AMD Ryzen 5 7500F", Cooler: "Tower air", Motherboard: "A620M", Memory: "16GB DDR5-5600", Graphics: "Radeon RX 9060 XT 16GB", Storage: "1TB NVMe", Power: "650W 80+ Bronze", Case: "mATX mesh" },
    fps: [["Cyberpunk 2077 · 1080p", 84], ["Valorant · 1080p", 410], ["Roblox · 1080p", 300]],
  },
  {
    id: "pinatubo", name: "Pinatubo", res: "4K", status: "sold", price: 289000, date: "2026-09-12", tint: "amber",
    parts: { CPU: "AMD Ryzen 9 9950X3D", Cooler: "420mm AIO", Motherboard: "X870E", Memory: "64GB DDR5-6000", Graphics: "GeForce RTX 5090 32GB", Storage: "4TB Gen5 NVMe", Power: "1200W 80+ Platinum", Case: "Full tower glass" },
    fps: [["Cyberpunk 2077 · 4K", 138], ["Black Myth: Wukong · 4K", 121], ["Alan Wake 2 · 4K", 104]],
  },
  {
    id: "arayat", name: "Arayat", res: "1440p", status: "sold", price: 82500, date: "2026-08-26", tint: "cyan",
    parts: { CPU: "AMD Ryzen 7 9700X", Cooler: "Low-profile air", Motherboard: "B650I WiFi", Memory: "32GB DDR5-6000", Graphics: "GeForce RTX 5070 12GB", Storage: "1TB Gen4 NVMe", Power: "750W SFX Gold", Case: "ITX sandwich" },
    fps: [["Cyberpunk 2077 · 1440p", 98], ["Fortnite · 1440p", 180], ["Valorant · 1440p", 430]],
  },
  {
    id: "hibok", name: "Hibok-Hibok", res: "1080p", status: "sold", price: 52000, date: "2026-08-10", tint: "pink",
    parts: { CPU: "Intel Core i5-14600K", Cooler: "240mm AIO", Motherboard: "B760 WiFi", Memory: "16GB DDR5-6000", Graphics: "GeForce RTX 4060 8GB", Storage: "1TB NVMe", Power: "650W 80+ Gold", Case: "Mid tower, white" },
    fps: [["Valorant · 1080p", 450], ["Apex Legends · 1080p", 170], ["Genshin Impact · 1080p", 60]],
  },
];

export const findBuild = (id: string) => builds.find((b) => b.id === id);
