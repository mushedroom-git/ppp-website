import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;
const base = { fill: "none", stroke: "currentColor", "aria-hidden": true } as const;

export const SearchIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...p}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5 21 21" /></svg>
);
export const CartIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...p}><path d="M2 3h3l2.6 12.2a1.5 1.5 0 0 0 1.5 1.2h8.7a1.5 1.5 0 0 0 1.5-1.1L21 7H6" /><circle cx="9.5" cy="20" r="1.3" /><circle cx="17.5" cy="20" r="1.3" /></svg>
);
export const MenuIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.6} {...base} {...p}><path d="M3 7h18M3 12h18M3 17h18" /></svg>
);
export const CloseIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}><path d="M5 5l14 14M19 5 5 19" /></svg>
);
export const ArrowIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const PlusIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={2} {...base} {...p}><path d="M12 5v14M5 12h14" /></svg>
);
export const EyeIcon = (p: P) => (
  <svg viewBox="0 0 24 24" strokeWidth={1.7} {...base} {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const ChipIcon = (p: P) => (
  <svg viewBox="0 0 36 36" strokeWidth={1.6} {...base} {...p}><rect x="9" y="9" width="18" height="18" rx="2" /><rect x="14" y="14" width="8" height="8" /><path d="M13 4v5M18 4v5M23 4v5M13 27v5M18 27v5M23 27v5M4 13h5M4 18h5M4 23h5M27 13h5M27 18h5M27 23h5" /></svg>
);
export const ShieldIcon = (p: P) => (
  <svg viewBox="0 0 36 36" strokeWidth={1.6} {...base} {...p}><path d="M18 4 6 8.5v8.2c0 7.5 5 12.6 12 15.3 7-2.7 12-7.8 12-15.3V8.5Z" /><path d="m12.5 18 4 4 7-8" /></svg>
);
export const HeadsetIcon = (p: P) => (
  <svg viewBox="0 0 36 36" strokeWidth={1.6} {...base} {...p}><path d="M7 21v-4a11 11 0 0 1 22 0v4" /><rect x="5" y="20" width="5" height="8" rx="2" /><rect x="26" y="20" width="5" height="8" rx="2" /><path d="M28.5 28c0 3-3 4-7 4" /><circle cx="20" cy="32" r="1.6" /></svg>
);
export const BoxIcon = (p: P) => (
  <svg viewBox="0 0 36 36" strokeWidth={1.6} {...base} {...p}><path d="M18 4 31 11v14l-13 7-13-7V11Z" /><path d="M5 11l13 7 13-7M18 18v14" /></svg>
);
