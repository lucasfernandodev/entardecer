import { useState } from "react";
import { Database } from "../infra/database/database";
import { SettingRepository } from "../infra/database/repository/setting-repository";
import { defaultPalete } from "../infra/hydrate-database";
import { BackgroundColor, BackgroundPreference, BackgroundSetting, ISetting } from "../types/settings";
import { isHexColor } from "../utils/is-hex-color";


export const useSettingBackgroundStore = () => {

  const [repo] = useState(() => new SettingRepository(Database))
  const ID = 'background'

  const updateDatabase = async (data: Partial<BackgroundSetting>) => {
    const payload: BackgroundSetting = {
      color: defaultPalete[1],
      type: "image",
      isCrop: true
    }

    const isSetting = await repo.getById<ISetting['background']>(ID);
    if (!isSetting) {
      await repo.add(ID, { ...payload, ...data })
      return;
    }

    await repo.update(ID, { ...isSetting, ...data })
  }


  const setPreference = async (pref: BackgroundPreference) => {
    await updateDatabase({
      type: pref
    })
  }

  const setCropMode = async (isActive: boolean) => {
    await updateDatabase({
      isCrop: isActive
    })
  }


  const setColor = async (color: BackgroundColor) => {
    if (!isHexColor(color)) {
      throw new Error(`Cor inválida: "${color}". Apenas valores em hexadecimal são validos`)
    }

    await updateDatabase({
      color: color
    })
  }

  const getData = async () => {
    const backgroundSetting = await repo.getById<BackgroundSetting>('background')
    return backgroundSetting
  }

  return {
    setColor,
    setPreference,
    setCropMode,
    getData
  }
}