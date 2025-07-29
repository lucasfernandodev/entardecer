import { useState } from "react"
import { Database } from "../infra/database/database"
import { SettingRepository } from "../infra/database/repository/setting-repository"
import { Shortcut, ShortcutRepository } from "../infra/database/repository/shortcut-repository"
import { importDataScheme } from "../infra/schema/import-data"
import { ISetting } from "../types/settings"
import { readFileAsText } from "../utils/readFileAsText"

interface UserConfig extends ISetting {
  shortcuts: Shortcut[]
}

export const useSyncSetting = () => {

  const [settingRepo] = useState(() => new SettingRepository(Database));
  const [shortcutRepo] = useState(() => new ShortcutRepository(Database))

  const exportConfigs = async (): Promise<void> => {
    let syncData = {} as UserConfig;
    const setting = await settingRepo.getSetting();
    if (!setting) {
      throw new Error('Configuração não encontrada!')
    }


    const shortcuts = await shortcutRepo.getAll();
    if (!shortcuts) {
      throw new Error('Shortcuts não encontrada!')
    }

    syncData = {
      ...setting,
      shortcuts: shortcuts
    }

    const file = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(syncData));
    const link = document.createElement('a');
    link.setAttribute('href', file);
    link.setAttribute('download', "entardecer-configs.json")
    link.click()
  }

  const importConfigs = async (file: File) => {
    let json = null;
    try {
      const fileText = await readFileAsText(file)
      json = JSON.parse(fileText);
    } catch (error) {
      throw new Error('File type invalid')
    }

    const isSafe = importDataScheme.safeParse(json);

    if (!isSafe.success) {
      throw new Error('File validation invalid')
    }

    const { shortcuts, ...settings } = isSafe.data;
    for (const settingId in settings) {
      if (settings.hasOwnProperty(settingId)) {
        const setting = settings[settingId as keyof typeof settings];
        await settingRepo.update(settingId, setting)
      }
    }

    if (shortcuts.length === 0) return;

    for (const shortcut of shortcuts) {
      try {
        await shortcutRepo.add(shortcut)
      } catch (error) {
        console.error('Create shortcut error: ', error);
      }
    }
  }




  return {
    exportConfigs,
    importConfigs
  }
}