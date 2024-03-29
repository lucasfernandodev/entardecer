import { useEffect, useRef, useState } from "react";
import style from "./style.module.css";

interface SettingsInterfaceMenu {
  getOptionSelect: (option: string) => void;
}
export function SettingsInterfaceMenu({ getOptionSelect }: SettingsInterfaceMenu) {
  const [option, setOption] = useState<string>("animations");
  const MenuRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    if (MenuRef.current) {
      MenuRef.current.querySelectorAll("a").forEach((e) => e.removeAttribute("data-active"));
      const activeLink = MenuRef.current.querySelector(`a[data-label=${option}]`);
      activeLink?.setAttribute("data-active", "true");
      getOptionSelect(option);
    }
  }, [option]);

  function selectOption(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    evt.preventDefault();
    const element = evt.target as HTMLLinkElement;
    const currentLabel = element.getAttribute("data-label");
    setOption(currentLabel as string);
  }

  return (
    <div className={style.settingInterface}>
      <ul className={style.menu} ref={MenuRef}>
        <li>
          <a href="#" className={style.menuLink} onClick={selectOption} data-label="animations">
            Animations
          </a>
        </li>
        <li>
          <a href="#" className={style.menuLink} onClick={selectOption} data-label="background">
            Background
          </a>
        </li>
        <li>
          <a href="#" className={style.menuLink} onClick={selectOption} data-label="painel">
            Painel
          </a>
        </li>
        <li>
          <a href="#" className={style.menuLink} onClick={selectOption} data-label="theme">
            Theme
          </a>
        </li>
      </ul>
      <section className={style.settingContent}></section>
    </div>
  );
}
