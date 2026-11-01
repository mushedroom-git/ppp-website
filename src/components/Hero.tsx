import pc from "../assets/pc.jpg";
import { builds } from "../data/builds";
import { useStore } from "../context/StoreContext";
import { peso } from "../lib/format";
import { LinkButton } from "./ui/Button";
import { ArrowIcon, BoxIcon, ChipIcon, HeadsetIcon, ShieldIcon } from "./ui/icons";
import { Slash } from "./ui/Slash";

const perks = [
  [ChipIcon, "Custom built"],
  [ShieldIcon, "Quality tested"],
  [HeadsetIcon, "Expert support"],
  [BoxIcon, "Upgrade ready"],
] as const;

const featured = builds[0];

export function Hero() {
  const { openDetail } = useStore();

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-[radial-gradient(60%_70%_at_72%_45%,#141a13_0%,transparent_70%),linear-gradient(180deg,#0B0C0B_0%,#070807_100%)]">
      {/* angled dark panel on the left */}
      <span aria-hidden="true" className="absolute inset-y-0 -left-[10%] w-[90%] origin-top-left -skew-x-14 bg-linear-to-b from-[#121412] to-[#0B0C0B] opacity-90 md:w-[52%]" />
      <span aria-hidden="true" className="absolute right-[6%] bottom-[22%] h-[62%] w-[3px] origin-bottom rotate-32 bg-linear-to-b from-transparent via-green to-transparent opacity-85 drop-shadow-[0_0_10px_var(--color-green)] animate-beam" />
      <span aria-hidden="true" className="absolute bottom-[18%] left-[41%] h-[44%] w-[120px] bg-linear-to-r from-transparent to-green/55 opacity-55 blur-[1px] [clip-path:polygon(100%_0,100%_100%,0_100%)] animate-fade-in" />
      <span aria-hidden="true" className="absolute inset-x-0 bottom-[16%] h-px bg-linear-to-r from-transparent via-green/25 to-transparent" />

      <div className="wrap relative grid flex-1 grid-cols-1 items-center gap-5 pt-[120px] lg:grid-cols-[1fr_1.1fr] lg:pt-24">
        <div className="relative z-2 [&>*]:animate-fade-up [&>*:nth-child(2)]:[animation-delay:.1s] [&>*:nth-child(3)]:[animation-delay:.2s] [&>*:nth-child(4)]:[animation-delay:.3s]">
          <Slash />
          <h1 className="mb-[26px] text-[clamp(2.8rem,6.2vw,5.4rem)] leading-[1.02] font-semibold tracking-[-.035em]">
            Custom PCs
            <br />
            built for{" "}
            <em className="inline-block -skew-x-6 font-bold text-green [text-shadow:0_0_40px_rgba(124,255,58,.3)]">you</em>
          </h1>
          <p className="mb-[46px] flex flex-wrap gap-[22px] font-display text-[.82rem] font-light tracking-[.25em] text-muted md:text-[.95rem] md:tracking-[.42em] [&>span:nth-child(even)]:tracking-normal [&>span:nth-child(even)]:opacity-50">
            <span>GAMING</span><span>/</span><span>CREATIVE</span><span>/</span><span>WORK</span>
          </p>
          <div className="flex flex-wrap gap-[22px]">
            <LinkButton primary href="#customize">
              Build yours <ArrowIcon />
            </LinkButton>
            <LinkButton href="#builds">Explore builds</LinkButton>
          </div>
        </div>

        <div className="relative z-1 -mt-2.5 w-[min(100%,560px,calc(100svh-250px))] justify-self-center lg:mt-0 lg:w-[min(100%,680px,calc(100svh-250px))] lg:justify-self-end">
          <span aria-hidden="true" className="absolute inset-x-[12%] bottom-[6%] h-[60px] bg-[radial-gradient(50%_50%_at_50%_50%,rgba(124,255,58,.45),transparent_70%)] blur-[18px] animate-breathe" />
          <img
            src={pc}
            alt="Black glass gaming PC with green-lit fans"
            width={740}
            height={740}
            className="relative h-auto w-full animate-pc-in [mask-image:radial-gradient(75%_75%_at_52%_48%,#000_58%,transparent_80%)]"
          />
          <button
            onClick={() => openDetail(featured.id)}
            className="absolute bottom-[14%] left-0 z-3 flex items-center gap-4 border border-l-[3px] border-line border-l-green bg-[rgba(15,17,15,.75)] px-[18px] py-3.5 text-left backdrop-blur-md animate-fade-up [animation-delay:1.2s] [animation-duration:.8s] lg:-left-[4%]"
          >
            <span>
              <small className="block text-[.78rem] text-muted">Featured build</small>
              <b className="font-display font-semibold">{featured.name}</b>
            </span>
            <span className="font-display text-[1.05rem] font-semibold text-green">{peso(featured.price)}</span>
          </button>
        </div>
      </div>

      <div className="wrap">
        <div className="relative z-2 grid grid-cols-2 gap-y-5 border-t border-fg/6 pt-[26px] pb-[30px] md:grid-cols-4 md:gap-y-0">
          {perks.map(([Icon, label], i) => (
            <div
              key={label}
              className={`flex items-center justify-start gap-4 pl-1 font-display text-[#DADDD9] md:justify-center md:px-5 ${i > 0 ? "md:border-l md:border-line" : ""}`}
            >
              <Icon className="size-9 flex-none text-green" />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
