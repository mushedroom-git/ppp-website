import { Wordmark } from "./ui/Wordmark";

export function Footer() {
  return (
    <footer className="border-t border-line pt-14 pb-9 text-[.9rem] text-muted">
      <div className="wrap flex flex-wrap items-center justify-between gap-[30px]">
        <Wordmark small />
        <nav className="flex flex-wrap gap-7 [&>a:hover]:text-fg">
          <a href="#builds">Builds</a>
          <a href="#customize">Customize</a>
          <a href="#showcase">Showcase</a>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
        </nav>
        <span>© 2026 PPP. Sample prices and photos.</span>
      </div>
    </footer>
  );
}
