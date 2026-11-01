import { useState, type FormEvent } from "react";
import { useStore, type RequestDraft } from "../context/StoreContext";
import { BUDGET_MAX, BUDGET_MIN, peso } from "../lib/format";
import { Button } from "./ui/Button";
import { SectionHead } from "./ui/SectionHead";

const facts = [
  ["Reply", "Within 24 hours"],
  ["Build time", "5–10 days"],
  ["Testing", "24-hour stress test"],
  ["Warranty", "1 year workmanship"],
];

const resOptions: [RequestDraft["res"], string][] = [["1080p", "1080p"], ["1440p", "1440p"], ["4K", "4K"], ["unsure", "Not sure"]];

const fieldLabel = "font-display text-[.85rem] text-muted";
const textInput = "border-0 border-b border-[#2F342F] bg-transparent py-2.5 text-[1.05rem] outline-none transition-colors focus:border-green";

export function RequestForm() {
  const { draft, setDraft } = useStore();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({ name: false, contact: false });
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = { name: !name.trim(), contact: !contact.trim() };
    setErrors(next);
    if (next.name) return document.getElementById("fname")?.focus();
    if (next.contact) return document.getElementById("fcontact")?.focus();
    // No backend yet: this is where the request would be POSTed.
    console.info("Build request", { name, contact, ...draft });
    setSent(true);
  };

  return (
    <section id="request" className="relative bg-bg-2 py-[90px] md:py-[130px]">
      <div className="wrap grid grid-cols-1 items-start gap-20 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <SectionHead title="Request a build" intro="Tell me your games and budget. I'll reply with a parts list and price." className="" />
          <ul className="mt-9">
            {facts.map(([k, v]) => (
              <li key={k} className="flex justify-between border-b border-line py-4">
                <span className="text-muted">{k}</span>
                <b>{v}</b>
              </li>
            ))}
          </ul>
        </div>

        <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-x-7 gap-y-[30px] md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="fname" className={fieldLabel}>Name</label>
            <input id="fname" type="text" autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={errors.name} className={textInput} />
            {errors.name && <span className="text-[.82rem] text-red">Enter your name.</span>}
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="fcontact" className={fieldLabel}>Email or mobile</label>
            <input id="fcontact" type="text" autoComplete="email" value={contact} onChange={(e) => setContact(e.target.value)} aria-invalid={errors.contact} className={textInput} />
            {errors.contact && <span className="text-[.82rem] text-red">Enter an email or mobile number for your quote.</span>}
          </div>

          <div className="flex flex-col gap-2 md:col-span-2">
            <div className="flex items-baseline justify-between">
              <label htmlFor="budget" className={fieldLabel}>Budget</label>
              <output htmlFor="budget" className="font-display text-[1.4rem] font-semibold">
                {peso(draft.budget)}{draft.budget >= BUDGET_MAX ? "+" : ""}
              </output>
            </div>
            <input
              id="budget"
              type="range"
              min={BUDGET_MIN}
              max={BUDGET_MAX}
              step={5000}
              value={draft.budget}
              onChange={(e) => setDraft({ ...draft, budget: +e.target.value })}
              className="w-full accent-green"
            />
          </div>

          <fieldset className="flex min-w-0 flex-col gap-2 border-0 md:col-span-2">
            <legend className={`${fieldLabel} mb-2`}>Monitor</legend>
            <div className="flex flex-wrap gap-2">
              {resOptions.map(([v, text]) => (
                <label key={v} className="relative">
                  <input
                    type="radio"
                    name="res"
                    value={v}
                    checked={draft.res === v}
                    onChange={() => setDraft({ ...draft, res: v })}
                    className="peer absolute opacity-0"
                  />
                  <span className="inline-block cursor-pointer border border-line px-4 py-[9px] font-display text-[.88rem] text-muted peer-checked:border-green peer-checked:text-green peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-green">
                    {text}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-2 md:col-span-2">
            <label htmlFor="games" className={fieldLabel}>Games and other uses</label>
            <textarea
              id="games"
              placeholder="e.g. Valorant at 240 fps, some video editing"
              value={draft.notes}
              onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
              className={`${textInput} min-h-[70px] resize-y`}
            />
          </div>

          <div className="md:col-span-2">
            <Button primary type="submit" disabled={sent}>Send request</Button>
          </div>
          {sent && (
            <p role="status" className="border border-green px-5 py-[18px] font-display text-green md:col-span-2">
              Request sent. I'll reply within 24 hours.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
