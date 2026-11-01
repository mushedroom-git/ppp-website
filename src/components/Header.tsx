import { useEffect, useRef, useState } from "react";
import { useStore } from "../context/StoreContext";
import { CartIcon, MenuIcon, SearchIcon } from "./ui/icons";
import { Wordmark } from "./ui/Wordmark";

const links = [
  ["#builds", "Builds"],
  ["#customize", "Customize"],
  ["#showcase", "Showcase"],
  ["#request", "Request"],
] as const;

const iconBtn = "relative grid size-[42px] place-items-center text-fg [&>svg]:size-6";

export function Header() {
  const { query, setQuery, cart, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;
    const t = setTimeout(() => searchRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, [searchOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background,border-color] duration-300 ${
        scrolled ? "border-line bg-bg/85 backdrop-blur-[14px]" : "border-transparent"
      }`}
    >
      <div className="wrap flex h-[84px] items-center gap-10">
        <Wordmark />
        <nav
          className={`${menuOpen ? "flex" : "hidden"} absolute inset-x-0 top-[84px] flex-col border-b border-line bg-bg/97 md:static md:mx-auto md:flex md:flex-row md:gap-[26px] md:border-0 md:bg-transparent lg:gap-11`}
        >
          {links.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="relative border-t border-line px-5 py-4 font-display text-[.95rem] text-[#D6DAD5] md:border-0 md:px-0 md:py-1.5 md:after:absolute md:after:inset-x-0 md:after:bottom-0 md:after:h-0.5 md:after:origin-left md:after:scale-x-0 md:after:bg-green md:after:transition-transform md:after:duration-250 md:after:ease-snap md:hover:after:scale-x-100"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-[18px] md:ml-0">
          <button className={iconBtn} aria-label="Search builds" aria-expanded={searchOpen} onClick={() => setSearchOpen((o) => !o)}>
            <SearchIcon />
          </button>
          <button className={iconBtn} aria-label="Open cart" onClick={() => setCartOpen(true)}>
            <CartIcon />
            <span
              className={`absolute top-0.5 right-0 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-green px-[5px] text-[.7rem] font-bold text-bg transition-transform duration-250 ease-snap ${
                cart.length ? "scale-100" : "scale-0"
              }`}
            >
              {cart.length}
            </span>
          </button>
          <button className={`${iconBtn} md:hidden`} aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((o) => !o)}>
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className={`overflow-hidden bg-bg/95 transition-[max-height] duration-300 ease-snap ${searchOpen ? "max-h-[90px] border-t border-line" : "max-h-0"}`}>
        <div className="wrap pb-4">
          <label className="sr-only" htmlFor="q">Search builds</label>
          <input
            ref={searchRef}
            id="q"
            type="search"
            autoComplete="off"
            placeholder="Search by name or part, e.g. RTX 5080"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && document.getElementById("builds")?.scrollIntoView()}
            className="w-full border-b border-line bg-transparent py-[18px] font-display text-[1.1rem] outline-none focus:border-green"
          />
        </div>
      </div>
    </header>
  );
}
