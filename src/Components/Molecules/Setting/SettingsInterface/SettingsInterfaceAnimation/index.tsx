import { useState } from "react";
import ButtonSwich from "../../../../Atoms/Buttons/Swich";
import style from "./style.module.css";

export default function SettingsInterfaceAnimation() {
  const [isMotionState, setIsMotionState] = useState<boolean>(false);
  return (
    <form className={style.SettingsInterfaceAnimation}>
      <fieldset>
        <label htmlFor="">Reduzir Movimento</label>
        <ButtonSwich
          pressed={isMotionState}
          isPressed={(pressed) => setIsMotionState(pressed)}
          alternativeText="Ativar / Desativar Animações"
        />
      </fieldset>
      <p>Reduz animações e transições na interface do usuário</p>
    </form>
  );
}
