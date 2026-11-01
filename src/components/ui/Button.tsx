import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = { primary?: boolean; small?: boolean };

/** Parallelogram button: the skewed frame is a ::before so the label stays upright. */
export function buttonClass({ primary, small }: Variant = {}, extra = "") {
  return [
    "relative isolate inline-flex items-center justify-center gap-2.5 whitespace-nowrap font-display",
    "before:absolute before:inset-0 before:-z-10 before:-skew-x-14 before:border before:transition-[background,border-color,box-shadow] before:duration-200",
    "disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-[18px]",
    small ? "px-[22px] py-2.5 text-[.9rem]" : "px-[34px] py-[15px] text-base",
    primary
      ? "font-semibold text-bg before:border-green before:bg-green before:shadow-[0_8px_30px_-8px_rgba(124,255,58,.35)] hover:before:bg-green-light hover:before:shadow-[0_10px_40px_-6px_rgba(124,255,58,.35)]"
      : "font-medium text-fg before:border-fg/35 hover:before:border-fg hover:before:bg-fg/5",
    extra,
  ].join(" ");
}

export function Button({ primary, small, className = "", ...props }: Variant & ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={buttonClass({ primary, small }, className)} {...props} />;
}

export function LinkButton({ primary, small, className = "", ...props }: Variant & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={buttonClass({ primary, small }, className)} {...props} />;
}
