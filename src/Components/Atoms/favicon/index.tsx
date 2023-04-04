import { useState } from "react";
import style from "./style.module.css";

interface Favicon {
  src: string;
  alt: string;
  brightness: 0 | 1;
}

type imageState = "loading" | "broken" | "complete";

export default function Favicon({ src, alt, brightness }: Favicon) {
  const [state, setState] = useState<imageState>("loading");

  return (
    <div className={style.favicon} data-state={state}>
      {
        <img
          src={src}
          alt={alt}
          className={style.faviconImage}
          style={{ filter: `invert(${brightness})` }}
          data-state={state}
          crossOrigin="anonymous"
          onLoad={() => setState("complete")}
          onError={() => setState("broken")}
        />
      }
      {state === "broken" && (
        <span className={style.alternativeImage}>{alt[0]}</span>
      )}
    </div>
  );
}
