import type { ImgHTMLAttributes } from "react";
import pc from "../../assets/pc.jpg";
import type { Tint } from "../../data/builds";
import { tintFilter } from "../../lib/format";

/** The placeholder product photo, recoloured to match a build's lighting. */
export function PcImage({ tint, alt = "", style, ...props }: { tint: Tint } & ImgHTMLAttributes<HTMLImageElement>) {
  return <img src={pc} alt={alt} loading="lazy" style={{ filter: tintFilter[tint], ...style }} {...props} />;
}
