import { createContext } from "react";
import { BackgroundSetting, ISetting, OverlaySetting, PainelSetting } from "../../types/settings";
import { Shortcut } from "../../infra/database/repository/shortcut-repository";

export interface UserConfig extends ISetting {
  shortcuts: Shortcut[];
}

type Response<T> = Promise<{ success: boolean, message: string | null, data: T | null }>

export interface SettingContext {
  settings: ISetting;
  updateBackgroundConfig: (config: BackgroundSetting) => Response<void>;
  updateOverlayConfig: (config: OverlaySetting) => Response<void>;
  updatePainelConfig: (config: PainelSetting) => Response<void>;
  importData: (config: UserConfig) => Response<void>
  exportData: () => Response<UserConfig>
}

export const SettingContext = createContext<SettingContext>(null!);