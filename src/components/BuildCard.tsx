import type { Build } from "../data/builds";
import { statusLabel } from "../data/builds";
import { useStore } from "../context/StoreContext";
import { peso, shortPart } from "../lib/format";
import { EyeIcon, PlusIcon } from "./ui/icons";
import { PcImage } from "./ui/PcImage";

const tagColor = { available: "bg-green text-bg", reserved: "bg-fg text-bg", sold: "bg-red text-white" };
const square = "grid size-11 place-items-center border transition-colors [&>svg]:size-5";
const textBtn = "px-1 py-2.5 font-display text-[.86rem] text-green";

export function BuildCard({ build: b }: { build: Build }) {
  const { openDetail, addBuild, toast, requestSimilar } = useStore();

  const specs = [
    ["CPU", shortPart(b.parts.CPU)],
    ["GPU", shortPart(b.parts.Graphics)],
    ["Memory", b.parts.Memory.split(" ")[0]],
    ["Storage", b.parts.Storage.split(" ")[0]],
  ];

  return (
    <article className="group flex flex-col border border-line bg-surface transition-[border-color,transform] duration-250 ease-snap hover:-translate-y-[3px] hover:border-green/45">
      <button
        onClick={() => openDetail(b.id)}
        aria-label={`View ${b.name}`}
        className="relative block aspect-[1/0.82] w-full overflow-hidden bg-[radial-gradient(70%_70%_at_50%_45%,#161916,#0A0B0A)]"
      >
        <PcImage tint={b.tint} className="size-full object-cover transition-transform duration-500 ease-snap group-hover:scale-104" />
        <span className={`absolute top-3.5 left-3.5 px-3 py-[5px] font-display text-[.74rem] font-semibold [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)] ${tagColor[b.status]}`}>
          {statusLabel[b.status]}
        </span>
        <span className="absolute top-3.5 right-3.5 border border-line bg-bg/70 px-2.5 py-1 font-display text-[.78rem]">{b.res}</span>
      </button>

      <div className="flex flex-1 flex-col px-[22px] pt-[22px] pb-5">
        <h3 className="mb-3.5 text-[1.35rem] font-semibold tracking-[-.02em]">{b.name}</h3>
        <div className="mb-[22px] grid grid-cols-2 gap-x-4 gap-y-2.5">
          {specs.map(([k, v]) => (
            <div key={k} className="text-[.88rem] leading-[1.35]">
              <small className="mb-0.5 block text-[.74rem] text-muted">{k}</small>
              {v}
            </div>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-[18px]">
          <span className={`font-display font-semibold tracking-[-.02em] ${b.status === "sold" ? "text-[1.1rem] text-muted line-through" : "text-[1.35rem]"}`}>
            {peso(b.price)}
          </span>
          <div className="flex gap-2">
            <button onClick={() => openDetail(b.id)} aria-label={`Details for ${b.name}`} className={`${square} border-line bg-surface-2 hover:border-fg`}>
              <EyeIcon />
            </button>
            {b.status === "available" && (
              <button onClick={() => addBuild(b)} aria-label={`Add ${b.name} to cart`} className={`${square} border-green bg-green text-bg hover:bg-green-light`}>
                <PlusIcon />
              </button>
            )}
            {b.status === "reserved" && (
              <button onClick={() => toast("You're on the waitlist. I'll message you if it frees up.")} className={textBtn}>Waitlist</button>
            )}
            {b.status === "sold" && (
              <button onClick={() => requestSimilar(b)} className={textBtn}>Build similar</button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
