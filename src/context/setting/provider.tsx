import { ReactNode, useEffect, useState } from "react"
import { SettingContext, UserConfig } from "./context"
import { BackgroundSetting, ISetting, OverlaySetting, PainelSetting } from "../../types/settings"
import { SettingRepository } from "../../infra/database/repository/setting-repository";
import { Database } from "../../infra/database/database";
import { useFetch } from "../../hooks/useFetch";
import { ShortcutRepository } from "../../infra/database/repository/shortcut-repository";

export const SettingProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<null | ISetting>(null);
  const [repository] = useState(() => new SettingRepository(Database));
  const [shortcutRepository] = useState(() => new ShortcutRepository(Database))

  const { data, isLoading } = useFetch({
    queryFn: repository.getSetting
  })

  useEffect(() => {
    if (!isLoading && data) {
      setSettings(data)
    }
  }, [data, isLoading])



  const updateBackgroundConfig = async (config: BackgroundSetting) => {
    try {
      if (!settings) {
        return { success: false, message: 'Nenhuma configuração encontrada', data: null }
      }

      await repository.update<BackgroundSetting>('background', config)
      setSettings({ ...settings, background: { ...config } })
      return { success: true, message: null, data: null }
    } catch (error: any) {
      return { success: false, message: error?.message, data: null }
    }
  };

  const updateOverlayConfig = async (config: OverlaySetting) => {
    try {
      if (!settings) {
        return { success: false, message: 'Nenhuma configuração encontrada', data: null }
      }
      await repository.update<OverlaySetting>('overlay', config)
      setSettings({ ...settings, overlay: { ...config } })
      return { success: true, message: null, data: null }
    } catch (error: any) {
      return { success: false, message: error?.message, data: null }
    }
  };

  const updatePainelConfig = async (config: PainelSetting) => {
    if (!settings) {
      return { success: false, message: 'Nenhuma configuração encontrada', data: null }
    }

    try {
      await repository.update<PainelSetting>('painel', config)
      setSettings({ ...settings, painel: { ...config } })
      return { success: true, message: null, data: null }
    } catch (error: any) {
      return { success: false, message: error?.message, data: null }
    }
  };

  const importData = async (config: UserConfig) => {
    const { shortcuts, ...settings } = config

    for (const settingId in settings) {
      if (settings.hasOwnProperty(settingId)) {
        const setting = settings[settingId as keyof typeof settings];
        await repository.update(settingId, setting)
      }
    }

    if (shortcuts.length === 0) {
      return { success: true, message: null, data: null }
    }

    for (const shortcut of shortcuts) {
      try {
        await shortcutRepository.add(shortcut)
      } catch (error) {
        console.error('Create shortcut error: ', error);
      }
    }

    return { success: true, message: null, data: null }
  }

  const exportData = async () => {
    let syncData = {} as UserConfig;
    const setting = await repository.getSetting();

    if (!setting) {
      return { success: false, message: 'Configuração não encontrada!', data: null }
    }


    const shortcuts = await shortcutRepository.getAll();

    if (!shortcuts) {
      return { success: false, message: 'Shortcuts não encontrada', data: null }
    }

    syncData = {
      ...setting,
      shortcuts: shortcuts
    }

    return { success: true, message: null, data: syncData }
  }

  if (!settings || isLoading) return null;

  return (
    <SettingContext
      value={{
        settings,
        updateBackgroundConfig,
        exportData,
        importData,
        updateOverlayConfig,
        updatePainelConfig
      }}
    >
      {children}
    </SettingContext>
  )
}