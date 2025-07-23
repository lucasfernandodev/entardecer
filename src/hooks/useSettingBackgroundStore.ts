import { Database } from "../database/database";
import { SettingRepository } from "../database/repository/setting-repository";
import { BackgroundColor, BackgroundPreference, BackgroundSetting, ISetting } from "../types/settings";
import { isHexColor } from "../utils/is-hex-color";



export const defaultPalete: `#${string}`[] = [
  '#F2727D', '#023E73', '#F2CF66', '#F29C6B', '#F26A4B'
]

export const useSettingBackgroundStore = () => {

  const ID = 'background'

  const updateDatabase = async (data: Partial<BackgroundSetting>) => {
    const payload: BackgroundSetting = {
      color: defaultPalete[1],
      type: "image",
      isCrop: true
    }

    const repository = new SettingRepository(Database);
    const isSetting = await repository.getById<ISetting['background']>(ID);
    if (!isSetting) {
      await repository.add(ID, { ...payload, ...data })
      return;
    }

    await repository.update(ID, { ...isSetting, ...data })
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
    const repository = new SettingRepository(Database);
    const backgroundSetting = await repository.getById<BackgroundSetting>('background')
    return backgroundSetting
  }

  return {
    setColor,
    setPreference,
    setCropMode,
    getData
  }
}