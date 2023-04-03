import { useEffect, useRef, useState } from "react";
import { useOnLoadImages } from "../../../hooks/useOnLoadImages";
import style from "./style.module.css";

interface Favicon {
  src: string;
  alt: string;
  brightness: 0 | 1;
}

export default function Favicon({ src, alt, brightness }: Favicon) {
  const [state, setState] = useState<"loading" | "broken" | "complete">(
    "loading"
  );

  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesLoaded = useOnLoadImages(wrapperRef);

  const imageElement = useRef(null);

  useEffect(() => {
    if (imagesLoaded) {
      if (imageElement.current) {
        const image = imageElement.current as HTMLImageElement;
        image.onerror = () => {
          setState("broken");
        };

        if (state === "loading") {
          setState("complete");
        }
      }
    }
  }, [imagesLoaded]);

  return (
    <div className={style.favicon} ref={wrapperRef} data-state={state}>
      {
        <img
          src={src}
          alt={alt}
          className={style.faviconImage}
          style={{ filter: `invert(${brightness})` }}
          ref={imageElement}
          data-state={state}
          crossOrigin="anonymous"
        />
      }
      {state === "broken" && (
        <span className={style.alternativeImage}>{alt[0]}</span>
      )}
    </div>
  );
}
