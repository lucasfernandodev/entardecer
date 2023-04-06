import { useState } from "react";
import Layout from "../../Atoms/Layout";
import { SettingHeader } from "../../Organisms/Setting/SettingHeader";
import style from "./style.module.css";
import { SettingContent } from "../../Organisms/Setting/SettingContent";

const SettingTemplate = () => {
  const [option, setOption] = useState("interface");

  return (
    <Layout large="full">
      <div className={style.container}>
        <SettingHeader fn={setOption} optionCurrent={option} />
        <SettingContent option={option} />
      </div>
    </Layout>
  );
};

export { SettingTemplate };
