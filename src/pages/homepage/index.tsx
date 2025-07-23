import { useEffect, useState } from "react"
import { HomepageTemplate } from "../../Components/Template/Homepage"
import { BackgroundSetting } from "../../types/settings"
import { useFetch } from "../../hooks/useFetch";
import { SettingRepository } from "../../database/repository/setting-repository";
import { Database } from "../../database/database";

export const Homepage = () => {
  const [bgSetting, setBgSetting] = useState({} as BackgroundSetting)

  const fetch = async () => {
    const repository = new SettingRepository(Database);
    const backgroundSetting = await repository.getById<BackgroundSetting>('background')
    return backgroundSetting
  }


  const { isLoading, data } = useFetch({
    queryFn: fetch
  })

  useEffect(() => {
    if (!isLoading && data) {
      setBgSetting({
        color: data.color,
        type: data.type,
        isCrop: data.isCrop
      })
    }
  }, [isLoading, data]);

  return (
    <HomepageTemplate
      background={bgSetting}
      overlay={50}
      painel={{
        visibility: 'hidden',
        position: "right"
      }}
    />
  )
}