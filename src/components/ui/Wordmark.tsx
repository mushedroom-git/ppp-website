export function Wordmark({ small }: { small?: boolean }) {
  return (
    <a href="#" aria-label="PPP home" className={`flex items-center gap-2.5 font-display leading-none font-extrabold tracking-[.02em] ${small ? "text-2xl" : "text-[1.7rem] md:text-[2rem]"}`}>
      <i className={`block -skew-x-14 bg-green ${small ? "h-[22px] w-[9px]" : "h-[30px] w-3"}`} />
      <span className="block -skew-x-14">PPP</span>
    </a>
  );
}
