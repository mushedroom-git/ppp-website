import { useMemo, useState } from "react";
import pc from "../assets/pc.jpg";
import { ASSEMBLY_FEE, defaultPicks, groups, swatch, type GroupKey } from "../data/builder";
import { useStore } from "../context/StoreContext";
import { peso, roundBudget, tintFilter } from "../lib/format";
import { useTweenedNumber } from "../lib/useTweenedNumber";
import { Button } from "./ui/Button";
import { SectionHead } from "./ui/SectionHead";

export function Builder() {
  const { addCustom, startRequest } = useStore();
  const [picks, setPicks] = useState(defaultPicks);

  const build = useMemo(() => {
    const sel = Object.fromEntries(groups.map((g) => [g.key, g.opts[picks[g.key]]])) as Record<GroupKey, (typeof groups)[number]["opts"][number]>;
    const total = groups.reduce((s, g) => s + g.opts[picks[g.key]].price, 0) + ASSEMBLY_FEE;
    return { sel, total, tier: sel.gpu.tier!, tint: sel.light.tint! };
  }, [picks]);
  const { sel, total, tier, tint } = build;
  const shownTotal = useTweenedNumber(total);

  return (
    <section id="customize" className="relative bg-linear-to-b from-bg to-bg-2 py-[90px] md:py-[130px]">
      <div className="wrap">
        <SectionHead title="Build yours" intro="Pick your parts. The price updates as you go." />

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div>
            {groups.map((g) => (
              <fieldset key={g.key} className="mb-[34px] min-w-0 border-0">
                <legend className="sr-only">{g.title}</legend>
                <h3 className="mb-3.5 text-[1.05rem] font-medium">{g.title}</h3>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2.5">
                  {g.opts.map((o, i) => {
                    const id = `b-${g.key}-${i}`;
                    return (
                      <div key={id} className="relative">
                        <input
                          type="radio"
                          id={id}
                          name={`b-${g.key}`}
                          checked={picks[g.key] === i}
                          onChange={() => setPicks((p) => ({ ...p, [g.key]: i }))}
                          className="peer pointer-events-none absolute opacity-0"
                        />
                        <label
                          htmlFor={id}
                          className="block h-full cursor-pointer border border-line bg-surface px-4 py-3.5 transition-[border-color,background] duration-200 hover:border-[#3a403a] peer-checked:border-green peer-checked:bg-green/6 peer-checked:shadow-[inset_3px_0_0_var(--color-green)] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green"
                        >
                          <b className="block font-display text-[.92rem] leading-[1.3] font-medium">
                            {o.tint && <i className="mr-2 inline-block size-3 rounded-full align-[-1px]" style={{ background: swatch[o.tint] }} />}
                            {o.name}
                          </b>
                          <small className="text-[.82rem] text-muted">
                            {g.key === "light" ? "Included" : `${o.note}${o.note ? " · " : ""}${peso(o.price)}`}
                          </small>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>

          <aside aria-label="Your build" className="border border-line bg-surface lg:sticky lg:top-[110px]">
            <div className="relative aspect-[1/0.75] overflow-hidden bg-[radial-gradient(70%_70%_at_50%_45%,#161916,#0A0B0A)]">
              <img src={pc} alt="Preview of your build's lighting" className="size-full object-cover transition-[filter] duration-500" style={{ filter: tintFilter[tint] }} />
              <span className="absolute top-4 right-4 border border-line bg-bg/70 px-2.5 py-1 font-display text-[.78rem]">Plays best at {tier}</span>
            </div>
            <div className="p-6">
              <ul className="mb-5">
                {groups.filter((g) => g.key !== "light").map((g) => (
                  <li key={g.key} className="flex justify-between gap-4 border-b border-line py-[9px] text-[.9rem]">
                    <span className="text-muted">{g.title}</span>
                    <span className="text-right">{sel[g.key].name}</span>
                  </li>
                ))}
                <li className="flex justify-between gap-4 border-b border-line py-[9px] text-[.9rem]">
                  <span className="text-muted">Assembly and 24-hour test</span>
                  <span className="text-right">{peso(ASSEMBLY_FEE)}</span>
                </li>
              </ul>
              <div className="mb-5 flex items-baseline justify-between">
                <span className="text-muted">Total</span>
                <b className="font-display text-[2rem] font-semibold tracking-[-.03em] text-green">{peso(shownTotal)}</b>
              </div>
              <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                <Button
                  primary
                  className="px-2.5 py-3.5"
                  onClick={() => addCustom({ name: "Custom build", sub: `${sel.cpu.name}, ${sel.gpu.name}`, price: total, tint })}
                >
                  Add to cart
                </Button>
                <Button
                  className="px-2.5 py-3.5"
                  onClick={() =>
                    startRequest({
                      budget: roundBudget(total),
                      res: tier,
                      notes: `My pick: ${sel.cpu.name}, ${sel.gpu.name}, ${sel.ram.name}, ${sel.ssd.name}, ${sel.base.name} base, ${sel.light.name} lighting.\n`,
                    })
                  }
                >
                  Send as request
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
