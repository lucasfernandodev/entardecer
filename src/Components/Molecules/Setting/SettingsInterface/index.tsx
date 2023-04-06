import { useState } from "react";
import style from "./style.module.css";
import { SettingsInterfaceMenu } from "./SettingsInterfaceMenu";
import SettingsInterfaceAnimation from "./SettingsInterfaceAnimation";
import SettingsInterfaceBackground from "./SettingsInterfaceBackground";
import SettingsInterfacePainel from "./SettingsInterfacePainel";

export function SettingsInterface() {
  const [option, setOption] = useState<string>("animation");

  function selectOption(option: string) {
    setOption(option);
  }
  return (
    <main className={style.main} id="setting-inteface">
      <SettingsInterfaceMenu getOptionSelect={selectOption} />
      {option === "animations" && <SettingsInterfaceAnimation />}
      {option === "background" && <SettingsInterfaceBackground />}
      {option === "painel" && <SettingsInterfacePainel />}
    </main>
  );
}
