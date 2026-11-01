import { shots } from "../data/showcase";
import { PcImage } from "./ui/PcImage";
import { SectionHead } from "./ui/SectionHead";

export function Showcase() {
  return (
    <section id="showcase" className="relative py-[90px] md:py-[130px]">
      <div className="wrap">
        <SectionHead title="Build showcase" intro="Rigs that already found their owners." />
        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 md:auto-rows-[260px] md:grid-cols-2 lg:grid-cols-4">
          {shots.map((s, i) => {
            const img = "size-full object-cover transition-transform duration-600 ease-snap group-hover:scale-104";
            return (
              <figure key={s.name} className={`group relative overflow-hidden border border-line bg-bg ${i === 0 ? "md:col-span-2 lg:row-span-2" : ""}`}>
                {"src" in s ? (
                  <img src={s.src} alt={`${s.name} build`} loading="lazy" className={img} />
                ) : (
                  <PcImage tint={s.tint} alt={`${s.name} build`} className={img} />
                )}
                <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-b from-transparent to-bg/92 px-5 pt-10 pb-[18px]">
                  <b className="block font-display font-semibold">{s.name}</b>
                  <span className="text-[.85rem] text-muted">{s.place}</span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
