import { useState } from "react";
import style from './style.module.css';
interface ButtonSwich{
  isPressed: (value: boolean) => void,
  className?: string | undefined,
  id?: string | undefined,
  alternativeText: string
}

export default function ButtonSwich({
  isPressed,
  className,
  id,
  alternativeText
}: ButtonSwich) {

  const [pressed, setPressed] = useState<boolean>(false);

  function swichValue(){
    setPressed(!pressed)
    isPressed(pressed)
  }

  const classname = `${className} ${style.btnSwich}`
  return (
    <button
      className={classname}
      aria-pressed={pressed}
      onClick={swichValue}
      id={id}
      type='button'
    >
      <span className={style.alternativeText}>{alternativeText}</span>
    </button>
  );
}
