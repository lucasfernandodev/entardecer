import { FC, useEffect, useState } from 'react';
import S from './style.module.css';
import { useSetting } from '../../../../hooks/useSetting';



export const ToggleCropMode = () => {

  const { settings, updateBackgroundConfig } = useSetting()

  const toggleCrop = async () => {
    if (settings) {
      await updateBackgroundConfig({
        ...settings.background,
        isCrop: !settings.background.isCrop
      })
    }
  }

  if (!settings) return null;

  return (
    <div className={S.container}>
      <div className={S.group}>
        <label htmlFor="cropped">
          <input
            defaultChecked={settings.background.isCrop}
            onInput={toggleCrop}
            type="checkbox"
            id="cropped"
            checked={settings.background.isCrop}
          />
        </label>
      </div>
    </div>
  )
}