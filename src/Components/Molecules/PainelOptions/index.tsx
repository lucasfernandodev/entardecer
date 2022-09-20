import { useEffect, useRef } from 'react';
import style from './style.module.css';


export default function PainelOption({onClick, onBlur}: {onClick: () => void, onBlur: () => void}) {
  const menuRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    if(menuRef.current){
      menuRef.current.focus()
    }
  }, [])

  function onblur(evt: React.FocusEvent<HTMLUListElement, Element>){
    evt.stopPropagation();
    setTimeout(() => {
      onBlur()
    }, 250)
  }

  return (
    <ul ref={menuRef} className={style.painelOption_suspend} onBlur={evt => onblur(evt)} tabIndex={0}>
      <li className={style.painelOption_item}>
        <button onClick={onClick}>Editar</button>
      </li>
      <li className={style.painelOption_item}>
        <button>Configurações</button>
      </li>
    </ul>
  );
}