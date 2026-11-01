import { useEffect, useRef, useState } from "react";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Eases a displayed number toward `target` (ease-out cubic), snapping to `step`. */
export function useTweenedNumber(target: number, { duration = 350, step = 100 } = {}) {
  const [shown, setShown] = useState(target);
  const current = useRef(target);

  useEffect(() => {
    if (reducedMotion()) {
      current.current = target;
      setShown(target);
      return;
    }
    const from = current.current;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const v = from + (target - from) * (1 - Math.pow(1 - k, 3));
      current.current = v;
      setShown(k < 1 ? Math.round(v / step) * step : target);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, step]);

  return shown;
}
