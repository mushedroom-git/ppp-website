import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { Build, Resolution, Tint } from "../data/builds";
import { roundBudget, shortPart } from "../lib/format";

export type CartItem = { key: string; name: string; sub: string; price: number; tint: Tint };
export type RequestDraft = { budget: number; res: Resolution | "unsure"; notes: string };

type Store = {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addBuild: (b: Build) => void;
  addCustom: (item: Omit<CartItem, "key">) => void;
  removeItem: (key: string) => void;
  reserve: () => void;

  detailId: string | null;
  openDetail: (id: string) => void;
  closeDetail: () => void;

  query: string;
  setQuery: (q: string) => void;

  draft: RequestDraft;
  setDraft: (d: RequestDraft) => void;
  startRequest: (d: RequestDraft) => void;
  requestSimilar: (b: Build) => void;

  toastMsg: string | null;
  toast: (msg: string) => void;
};

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState<RequestDraft>({ budget: 90000, res: "1440p", notes: "" });
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<number>(undefined);

  const toast = useCallback((msg: string) => {
    setToastMsg(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastMsg(null), 3000);
  }, []);

  const addBuild = useCallback(
    (b: Build) => {
      if (cart.some((c) => c.key === b.id)) return toast(`${b.name} is already in your cart`);
      setCart((c) => [...c, { key: b.id, name: b.name, sub: `${shortPart(b.parts.Graphics)}, ${b.res}`, price: b.price, tint: b.tint }]);
      toast(`${b.name} added to cart`);
    },
    [cart, toast],
  );

  const addCustom = useCallback(
    (item: Omit<CartItem, "key">) => {
      setCart((c) => [...c, { ...item, key: `custom-${Date.now()}` }]);
      toast("Custom build added to cart");
    },
    [toast],
  );

  const removeItem = useCallback((key: string) => setCart((c) => c.filter((i) => i.key !== key)), []);

  const reserve = useCallback(() => {
    toast(`Reserved ${cart.length} build${cart.length > 1 ? "s" : ""}. I'll message you about payment.`);
    setCart([]);
    setCartOpen(false);
  }, [cart.length, toast]);

  const startRequest = useCallback((d: RequestDraft) => {
    setDraft(d);
    setDetailId(null);
    document.getElementById("request")?.scrollIntoView();
    document.getElementById("fname")?.focus({ preventScroll: true });
  }, []);

  const requestSimilar = useCallback(
    (b: Build) => startRequest({ budget: roundBudget(b.price), res: b.res, notes: `Something like ${b.name} (${b.parts.Graphics}).\n` }),
    [startRequest],
  );

  const value = useMemo<Store>(
    () => ({
      cart, cartOpen, setCartOpen, addBuild, addCustom, removeItem, reserve,
      detailId, openDetail: setDetailId, closeDetail: () => setDetailId(null),
      query, setQuery,
      draft, setDraft, startRequest, requestSimilar,
      toastMsg, toast,
    }),
    [cart, cartOpen, addBuild, addCustom, removeItem, reserve, detailId, query, draft, startRequest, requestSimilar, toastMsg, toast],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
