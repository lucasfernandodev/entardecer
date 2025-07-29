import { useSearchParams } from 'react-router-dom';
import S from './style.module.css';
import { SettingAbout } from '../../Organisms/Setting/SettingAbout';
import { SettingBackground } from '../../Organisms/Setting/SettingBackground';
import { SettingNavigation } from '../../Organisms/Setting/SettingNavigation';
import { SettingOverlay } from '../../Organisms/Setting/SettingOverlay';
import { SettingPainel } from '../../Organisms/Setting/SettingPainel';
import { SettingSyncConfigs } from '../../Organisms/Setting/SettingSyncConfigs';
import { FC } from 'react';

export type SettingOptions = 'background' | 'overlay' | 'painel' | 'export-import' | 'about'

interface SettingTemplateProps {
  option: SettingOptions
}

export const SettingTemplate: FC<SettingTemplateProps> = ({ option }) => {
  return (
    <div className={S.layout}>
      <div className={S.container_navigation}>
        <SettingNavigation />
      </div>
      <div className={S.container_options}>
        {option === 'background' && <SettingBackground />}
        {option === 'overlay' && <SettingOverlay />}
        {option === 'painel' && <SettingPainel />}
        {option === 'export-import' && <SettingSyncConfigs />}
        {option === 'about' && <SettingAbout />}
      </div>
    </div>
  )
}