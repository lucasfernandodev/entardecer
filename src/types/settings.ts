

export interface ISetting {
  background: {
    type: 'image' | 'color';
    color: `#${string}`;
    isCrop: boolean;
  };
  overlay: {
    opacity: string
  };
  painel: {
    visibility: 'show' | 'hidden';
    position: 'left' | 'center' | 'right'
  }
}

export type ISettingIds = keyof ISetting

export type BackgroundSetting = ISetting['background'];
export type BackgroundPreference = ISetting['background']['type']
export type BackgroundColor = ISetting['background']['color']
export type OverlaySetting = ISetting['overlay'];
export type PainelSetting = ISetting['painel']
export type PainelPosition = ISetting['painel']['position']