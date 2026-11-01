import { useEffect, useRef } from "react";
import { findBuild, statusLabel } from "../data/builds";
import { useStore } from "../context/StoreContext";
import { peso } from "../lib/format";
import { Button } from "./ui/Button";
import { CloseIcon } from "./ui/icons";
import { PcImage } from "./ui/PcImage";

export function DetailDialog() {
  const { detailId, closeDetail, addBuild, toast, requestSimilar } = useStore();
  const ref = useRef<HTMLDialogElement>(null);
  const b = detailId ? findBuild(detailId) : undefined;

  useEffect(() => {
    const dlg = ref.current;
    if (!dlg) return;
    if (b && !dlg.open) dlg.showModal();
    if (!b && dlg.open) dlg.close();
  }, [b]);

  const max = b ? Math.max(...b.fps.map(([, v]) => v)) : 1;

  return (
    <dialog
      ref={ref}
      aria-labelledby="dName"
      onClose={closeDetail}
      onClick={(e) => e.target === e.currentTarget && closeDetail()}
      className="m-auto max-h-[92vh] w-[min(1000px,calc(100%-32px))] border border-line bg-surface p-0 text-fg open:animate-fade-up open:[animation-duration:.35s] backdrop:bg-[rgba(5,6,5,.8)] backdrop:backdrop-blur-xs"
    >
      {b && (
        <>
          <button onClick={closeDetail} aria-label="Close" className="absolute top-3.5 right-3.5 z-2 grid size-[42px] place-items-center border border-line bg-bg/80 [&>svg]:size-[18px]">
            <CloseIcon />
          </button>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="max-h-[300px] bg-[radial-gradient(70%_70%_at_50%_45%,#161916,#0A0B0A)] lg:max-h-none">
              <PcImage tint={b.tint} alt={`${b.name} build`} loading="eager" className="size-full object-cover" />
            </div>
            <div className="max-h-[92vh] overflow-auto p-9">
              <h2 id="dName" className="text-[2.2rem] font-semibold tracking-[-.03em]">{b.name}</h2>
              <p className="mb-[22px] text-muted">{statusLabel[b.status]}. Plays best at {b.res}.</p>

              <table className="mb-7 w-full border-collapse text-[.9rem]">
                <tbody>
                  {Object.entries(b.parts).map(([k, v]) => (
                    <tr key={k} className="border-b border-line">
                      <th scope="row" className="w-[34%] py-[9px] pr-3 text-left font-medium text-muted">{k}</th>
                      <td className="py-[9px]">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="mb-3.5 font-medium">Average fps</h3>
              {b.fps.map(([game, v]) => (
                <div key={game} className="mb-2.5 grid grid-cols-[10em_1fr_3.5em] items-center gap-3 text-[.86rem]">
                  <span>{game}</span>
                  <div className="h-1.5 bg-surface-2">
                    <i className="block h-full origin-left bg-green shadow-[0_0_12px_rgba(124,255,58,.35)] animate-grow" style={{ width: `${(v / max) * 100}%` }} />
                  </div>
                  <b className="text-right font-display font-medium">{v}</b>
                </div>
              ))}

              <div className="mt-[30px] flex flex-wrap items-center gap-4">
                <span className="mr-auto font-display text-[1.8rem] font-semibold tracking-[-.02em]">
                  {b.status === "sold" ? "Sold" : peso(b.price)}
                </span>
                {b.status === "available" && <Button primary onClick={() => addBuild(b)}>Add to cart</Button>}
                {b.status === "reserved" && <Button onClick={() => toast("You're on the waitlist. I'll message you if it frees up.")}>Join waitlist</Button>}
                {b.status === "sold" && <Button primary onClick={() => requestSimilar(b)}>Build similar</Button>}
              </div>
            </div>
          </div>
        </>
      )}
    </dialog>
  );
}
