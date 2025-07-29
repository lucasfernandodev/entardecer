import { SettingRepository } from './database/repository/setting-repository';
import { ISetting } from "../types/settings"
import { Database } from './database/database';

export const defaultPalete: `#${string}`[] = [
  '#F2727D', '#023E73', '#F2CF66', '#F29C6B', '#F26A4B'
]

/**
 * Adiciona as configurações iniciais ao banco de dados
 */
export const hydrateDatabase = async () => {
  const defaultSetting: ISetting = {
    painel: {
      position: 'right',
      visibility: 'show'
    },
    background: {
      isCrop: true,
      type: 'color',
      color: defaultPalete[1]
    },
    overlay: {
      opacity: '50'
    }
  }

  const ids = Object.keys(defaultSetting)

  const repo = new SettingRepository(Database);
  for (const id of ids) {
    const setting = defaultSetting[id as keyof ISetting];
    const isConfig = await repo.getById(id);
    if (!isConfig) {
      await repo.add(id, setting);
    }
  }
}