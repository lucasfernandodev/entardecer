export interface ISetting {
  background: {
    type: 'image' | 'color';
    color: `#${string}`;
    isCrop: boolean;
  };
  overlay: number;
  painel: {
    visibility: 'show' | 'hidden';
    position: 'left' | 'center' | 'right'
  }
}

export type BackgroundSetting = ISetting['background'];
export type BackgroundPreference = ISetting['background']['type']
export type BackgroundColor = ISetting['background']['color'] 