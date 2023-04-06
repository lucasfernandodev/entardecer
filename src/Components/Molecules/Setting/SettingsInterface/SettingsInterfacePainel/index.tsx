import { useEffect, useState } from "react";
import ButtonSwich from "../../../../Atoms/Buttons/Swich";
import style from "./style.module.css";
import { storage } from "../../../../../utils/storage";

export default function SettingsInterfacePainel() {
  const state = storage.read<boolean>("painel-visibility");
  const [isMotionState, setIsMotionState] = useState<boolean>(state || false);

  useEffect(() => {
    try {
      storage.create("painel-visibility", isMotionState);
    } catch (error) {
      storage.update("painel-visibility", isMotionState);
    }
  }, [isMotionState]);

  return (
    <form className={style.container}>
      <fieldset>
        <label htmlFor="">Desativar painel</label>
        <ButtonSwich
          pressed={isMotionState}
          isPressed={(pressed) => setIsMotionState(!pressed)}
          alternativeText="Ativar / Desativar Animações"
        />
      </fieldset>
      <p>Não exibe mais o painel com os atalhos na homepage.</p>
    </form>
  );
}
