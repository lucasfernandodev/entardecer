import { useEffect, useRef, useState } from 'react';
import { db } from '../../../Services/chrome/database';
import style from './style.module.css';

interface PainelOption {
  onClick: () => void;
  onBlur: () => void;
  currentCategory: string,
}

export default function PainelOption({ onClick, onBlur, currentCategory }: PainelOption) {
  const menuRef = useRef<null | HTMLUListElement>(null);
  const [isItens, setIsItens] = useState(false);

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.focus();

      (async () => {
        const {shortcuts : database} = await db();
        const countShotcuts = await database.getAllFromIndex('website', 'by-category', currentCategory);
        if (countShotcuts && countShotcuts.length !== 0) {
          setIsItens(true);
        }
      })();
    }
  }, []);

  function onblur(evt: React.FocusEvent<HTMLUListElement, Element>) {
    evt.stopPropagation();
    setTimeout(() => {
      onBlur();
    }, 250);
  }

  async function handlerClick() {
    const {shortcuts : database} = await db();
    const countShotcuts = await database.getAll('website');
    if (countShotcuts && countShotcuts.length !== 0) {
      setIsItens(true);
      onClick();
    }
  }

  return (
    <ul
      ref={menuRef}
      className={style.painelOption_suspend}
      onBlur={(evt) => onblur(evt)}
      tabIndex={0}
    >
      <li className={style.painelOption_item}>
        <button onClick={handlerClick} disabled={!isItens}>
          Editar
        </button>
      </li>
      <li className={style.painelOption_item}>
        <a target="_blank" href={`${chrome.runtime.getURL('pages/configurations/index.html')}`}>Configurações</a>
      </li>
    </ul>
  );
}
