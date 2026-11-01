import { useEffect, useRef } from "react";
import { useStore } from "../context/StoreContext";
import { peso } from "../lib/format";
import { Button } from "./ui/Button";
import { CloseIcon } from "./ui/icons";
import { PcImage } from "./ui/PcImage";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeItem, reserve } = useStore();
  const closeRef = useRef<HTMLButtonElement>(null);
  const total = cart.reduce((s, c) => s + c.price, 0);

  useEffect(() => {
    if (!cartOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  return (
    <>
      <div
        onClick={() => setCartOpen(false)}
        className={`fixed inset-0 z-80 bg-[rgba(5,6,5,.7)] transition-opacity duration-250 ${cartOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        aria-label="Cart"
        aria-hidden={!cartOpen}
        inert={!cartOpen}
        className={`fixed inset-y-0 right-0 z-90 flex w-[min(440px,100%)] flex-col border-l border-line bg-surface transition-transform duration-300 ease-snap ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-line px-[26px] py-6">
          <h3 className="text-[1.25rem] font-semibold">Cart</h3>
          <button ref={closeRef} onClick={() => setCartOpen(false)} aria-label="Close cart" className="grid size-[42px] place-items-center [&>svg]:size-5">
            <CloseIcon />
          </button>
        </header>

        <div className="flex-1 overflow-auto px-[26px] py-1.5">
          {cart.length ? (
            cart.map((c) => (
              <div key={c.key} className="grid grid-cols-[72px_1fr_auto] items-center gap-4 border-b border-line py-4">
                <PcImage tint={c.tint} className="size-[72px] bg-bg object-cover" />
                <div>
                  <b className="font-display font-medium">{c.name}</b>
                  <small className="block text-[.82rem] text-muted">{c.sub}</small>
                  <small className="block text-[.82rem] text-muted">{peso(c.price)}</small>
                </div>
                <button onClick={() => removeItem(c.key)} className="text-[.82rem] text-muted hover:text-red">Remove</button>
              </div>
            ))
          ) : (
            <p className="px-2.5 py-[60px] text-center text-muted">Your cart is empty.</p>
          )}
        </div>

        <footer className="border-t border-line px-[26px] py-[22px]">
          <div className="mb-5 flex items-baseline justify-between">
            <span className="text-muted">Total</span>
            <b className="font-display text-[1.6rem] font-semibold tracking-[-.03em] text-green">{peso(total)}</b>
          </div>
          <Button primary className="w-full" disabled={!cart.length} onClick={reserve}>Reserve builds</Button>
        </footer>
      </aside>
    </>
  );
}
