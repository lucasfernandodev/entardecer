import { useState } from "react";
import PainelOption from "../../../Molecules/Painel/PainelOptions";
import Icon from "../../../utils/icon";
import style from "./style.module.css";

interface PainelHeader {
  title: string;
  changeCategory: (action: string) => void;
  changeStage: () => void;
  stage: boolean;
}

export default function PainelHeader({ title, changeCategory, changeStage, stage }: PainelHeader) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function changeCategoryBack() {
    changeCategory("goToBack");
  }
  function changeCategoryNext() {
    changeCategory("goToNext");
  }

  return (
    <header className={style.header}>
      <div className={style.painelOptions}>
        <button className={style.btnToggle} onClick={!stage ? toggleMenu : changeStage} data-focus={menuOpen}>
          <Icon name={stage ? "arrow_left" : "dots"} />
        </button>

        {menuOpen && <PainelOption currentCategory={title} onClick={changeStage} onBlur={toggleMenu} />}
      </div>

      {/* Painel Title */}
      <div className={style.painelTitle}>
        <h3>{!stage ? title : "Atalhos"}</h3>
      </div>

      {/* Controllers */}
      <div className={style.painelControllers}>
        <button className={style.btnController} onClick={stage ? undefined : changeCategoryBack}>
          <Icon name="chevron_left" />
        </button>
        <button className={style.btnController} onClick={stage ? undefined : changeCategoryNext}>
          <Icon name="chevron_right" />
        </button>
      </div>
    </header>
  );
}
