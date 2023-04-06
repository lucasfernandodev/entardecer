import { SettingsInterface } from "../../../Molecules/Setting/SettingsInterface";
import style from "./style.module.css";

interface SettingContentProps {
  option: string;
}
const SettingContent = ({ option }: SettingContentProps) => {
  return (
    <main className={style.content}>
      <section className={style.painel}>
        <div className={style.painelHeader}>
          <h1>
            <a href={`#setting-${option}`}>Configurações - {option}</a>
          </h1>
        </div>
        <div className={style.painelMain}>{option === "interface" && <SettingsInterface />}</div>
      </section>
    </main>
  );
};

export { SettingContent };
