import React, { useEffect, useRef, useState } from "react";
import style from "../../styles/pages/settings/style.module.css";
import Layout from "../../Components/Atoms/Layout";
import { SettingsInterface } from "../../Components/Organisms/SettingsInterface";

export default function settings() {
  const [option, setOption] = useState<string>("painel");
  const MenuRef = useRef<null | HTMLUListElement>(null);

  useEffect(() => {
    if (MenuRef.current) {
      MenuRef.current
        .querySelectorAll("a")
        .forEach((e) => e.removeAttribute("data-active"));
      const activeLink = MenuRef.current.querySelector(
        `a[data-label=${option}]`
      );
      activeLink?.setAttribute("data-active", "true");
    }
  }, [option]);

  function selectOption(evt: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    evt.preventDefault();
    const element = evt.target as HTMLLinkElement;
    const currentLabel = element.getAttribute("data-label");
    setOption(currentLabel as string);
  }

  return (
    <Layout large="full">
      <div className={style.container}>
        <header className={style.header}>
          <div className={style.brand}>
            <img src="/images/logo.svg" alt="Logo entardecer" />
            <h1>Entardecer</h1>
          </div>
          <ul className={style.menu} ref={MenuRef}>
            <li className={style.menuItem}>
              <a
                href="#"
                className={style.menuLink}
                onClick={selectOption}
                data-label="painel"
              >
                Painel
              </a>
            </li>
            <li className={style.menuItem}>
              <a
                href="#"
                className={style.menuLink}
                onClick={selectOption}
                data-label="interface"
              >
                Interface
              </a>
            </li>
            <li className={style.menuItem}>
              <a
                href="#"
                className={style.menuLink}
                onClick={selectOption}
                data-label="categorias"
              >
                Categorias
              </a>
            </li>
          </ul>
        </header>
        <main className={style.content}>
          <section className={style.painel}>
            <div className={style.painelHeader}>
              <h1>Configurações - {option}</h1>
            </div>
            <div className={style.painelMain}>
              {option === "interface" && <SettingsInterface />}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
