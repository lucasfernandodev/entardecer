import { useEffect, useState } from "react"
import { HomepageTemplate } from "../../components/Template/Homepage"
import { ISetting } from "../../types/settings"
import { useFetch } from "../../hooks/useFetch";
import { SettingRepository } from "../../infra/database/repository/setting-repository";
import { Database } from "../../infra/database/database";
import { ModalProvider } from "../../context/modal/provider";
import { AlertProvider } from "../../context/alert/provider";

export const Homepage = () => {
  const [setting, setSetting] = useState({} as ISetting);

  const fetch = async () => {
    const repository = new SettingRepository(Database);
    const all = await repository.getSetting();
    return all;
  }


  const { isLoading, data } = useFetch({
    queryFn: fetch
  })

  useEffect(() => {
    if (!isLoading && data) {
      setSetting(prev => ({ ...prev, ...data }))
    }
  }, [isLoading, data]);

  if (isLoading || Object.keys(setting).length === 0) return null;

  return (
    <AlertProvider>
      <ModalProvider>
        <HomepageTemplate
          background={setting.background}
          overlay={setting.overlay}
          painel={setting.painel}
        />
      </ModalProvider>
    </AlertProvider>
  )
}