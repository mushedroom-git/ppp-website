import white from "../assets/showcase-white.jpg";
import green from "../assets/showcase-green.jpg";
import purple from "../assets/showcase-purple.jpg";
import type { Tint } from "./builds";

export type Shot = { name: string; place: string } & ({ src: string } | { tint: Tint });

export const shots: Shot[] = [
  { name: "Pinatubo", place: "Delivered to Quezon City", src: white },
  { name: "Arayat", place: "Picked up in Cavite", src: green },
  { name: "Hibok-Hibok", place: "Shipped to Cebu", src: purple },
  { name: "Mayon", place: "Delivered to Makati", tint: "white" },
  { name: "Apo", place: "Shipped to Davao", tint: "blue" },
];
