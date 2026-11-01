import { useEffect, useState } from "react";
import { useStore } from "../context/StoreContext";

export function Toast() {
  const { toastMsg } = useStore();
  // Keep the last message rendered while the toast fades out.
  const [text, setText] = useState("");
  useEffect(() => {
    if (toastMsg) setText(toastMsg);
  }, [toastMsg]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-7 left-1/2 z-100 -translate-x-1/2 border border-l-[3px] border-line border-l-green bg-surface-2 px-5 py-3.5 font-display text-[.92rem] transition-all duration-300 ease-snap ${
        toastMsg ? "visible translate-y-0 opacity-100" : "invisible translate-y-[30px] opacity-0"
      }`}
    >
      {text}
    </div>
  );
}
