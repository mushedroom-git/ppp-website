import { useMemo, useState } from "react";
import { builds } from "../data/builds";
import { useStore } from "../context/StoreContext";
import { BuildCard } from "./BuildCard";
import { LinkButton } from "./ui/Button";
import { SectionHead } from "./ui/SectionHead";

type StatusFilter = "all" | "available" | "sold";
type ResFilter = "all" | "1080p" | "1440p" | "4K";
type Sort = "new" | "low" | "high";

function Pills<T extends string>({ label, value, options, onChange }: {
  label: string; value: T; options: [T, string][]; onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="flex gap-1 border border-line bg-surface p-1">
      {options.map(([v, text]) => (
        <button
          key={v}
          aria-pressed={value === v}
          onClick={() => onChange(v)}
          className="px-4 py-2 font-display text-[.88rem] text-muted transition-colors hover:text-fg aria-pressed:bg-green aria-pressed:font-semibold aria-pressed:text-bg"
        >
          {text}
        </button>
      ))}
    </div>
  );
}

export function ReadyBuilds() {
  const { query } = useStore();
  const [status, setStatus] = useState<StatusFilter>("all");
  const [res, setRes] = useState<ResFilter>("all");
  const [sort, setSort] = useState<Sort>("new");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return builds
      .filter((b) =>
        (status === "all" || (status === "available" ? b.status !== "sold" : b.status === "sold")) &&
        (res === "all" || b.res === res) &&
        (!q || `${b.name} ${Object.values(b.parts).join(" ")}`.toLowerCase().includes(q)),
      )
      .sort((a, b) => (sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : b.date.localeCompare(a.date)));
  }, [query, status, res, sort]);

  return (
    <section id="builds" className="relative py-[90px] md:py-[130px]">
      <div className="wrap">
        <SectionHead title="Ready builds" intro="Built, tested and ready to ship. Each one is one of a kind." />

        <div className="mb-9 flex flex-wrap items-center gap-x-7 gap-y-3">
          <Pills label="Availability" value={status} onChange={setStatus} options={[["all", "All"], ["available", "Available"], ["sold", "Sold"]]} />
          <Pills label="Best resolution" value={res} onChange={setRes} options={[["all", "Any"], ["1080p", "1080p"], ["1440p", "1440p"], ["4K", "4K"]]} />
          <span className="text-[.9rem] text-muted" aria-live="polite">{list.length} build{list.length === 1 ? "" : "s"}</span>
          <select
            aria-label="Sort builds"
            value={sort}
            onChange={(e) => setSort(e.target.value as Sort)}
            className="border border-line bg-surface px-3.5 py-2.5 font-display text-[.88rem] md:ml-auto"
          >
            <option value="new">Newest</option>
            <option value="low">Price: low to high</option>
            <option value="high">Price: high to low</option>
          </select>
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(285px,1fr))] gap-6">
          {list.length ? (
            list.map((b) => <BuildCard key={b.id} build={b} />)
          ) : (
            <div className="col-span-full border border-dashed border-line px-5 py-16 text-center text-muted">
              No builds match.
              <br />
              <LinkButton primary small href="#customize" className="mt-[18px]">Build your own</LinkButton>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
