import { Slash } from "./Slash";

export function SectionHead({ title, intro, className = "mb-12" }: { title: string; intro: string; className?: string }) {
  return (
    <div className={className}>
      <Slash className="mb-5" />
      <h2 className="text-[clamp(2rem,3.8vw,3.2rem)] leading-[1.05] font-semibold tracking-[-.03em]">{title}</h2>
      <p className="mt-3 max-w-[30em] text-muted">{intro}</p>
    </div>
  );
}
