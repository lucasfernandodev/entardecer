import { useState } from "react";
import style from "./style.module.css";
interface ButtonSwich {
  isPressed: (value: boolean) => void;
  className?: string | undefined;
  id?: string | undefined;
  alternativeText: string;
  pressed: boolean;
}

export default function ButtonSwich({ pressed, isPressed, className, id, alternativeText }: ButtonSwich) {
  const [currentPressed, setCurrentPressed] = useState<boolean>(pressed);

  function swichValue() {
    setCurrentPressed(!pressed);
    isPressed(currentPressed);
  }

  const classname = `${className} ${style.btnSwich}`;
  return (
    <button className={classname} aria-pressed={pressed} onClick={swichValue} id={id} type="button">
      <span className={style.alternativeText}>{alternativeText}</span>
    </button>
  );
}
