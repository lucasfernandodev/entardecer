import { useEffect, useRef } from "react";
import { Brand } from "../../../Atoms/Brand";
import style from "./style.module.css";

interface SettingHeaderProps {
  fn: (option: string) => void;
  optionCurrent: string;
}

const SettingHeader = ({ fn, optionCurrent }: SettingHeaderProps) => {
  const MenuRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    const menu = MenuRef.current;
    if (menu) {
      const links = menu.querySelectorAll("a");
      links.forEach((e) => e.removeAttribute("data-active"));
      const activeLink = menu.querySelector(`a[data-id="${optionCurrent}]`);
      activeLink?.setAttribute("data-active", "true");
    }
  }, [optionCurrent]);

  function handleMenu(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    evt.preventDefault();
    const element = evt.target as HTMLLinkElement;
    const currentLabel = element.dataset.id as string;
    fn(currentLabel);
  }

  return (
    <header className={style.header}>
      <Brand />
      <ul className={style.menu} ref={MenuRef}>
        <li className={style.menuItem}>
          <a data-id="interface" href="#setting-interface" className={style.menuLink} onClick={handleMenu}>
            Interface
          </a>
        </li>
        <li className={style.menuItem}>
          <a data-id="painel" href="#setting-painel" className={style.menuLink} onClick={handleMenu}>
            Painel
          </a>
        </li>
        <li className={style.menuItem}>
          <a data-id="categories" href="#setting-categories" className={style.menuLink} onClick={handleMenu}>
            categories
          </a>
        </li>
      </ul>
    </header>
  );
};

export { SettingHeader };
