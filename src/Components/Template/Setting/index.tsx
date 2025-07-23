import { useSearchParams } from 'react-router-dom';
import S from './style.module.css';
import { SettingNavigation } from '../../Organisms/SettingNavigation';
import { SettingBackground } from '../../Organisms/SettingBackground';

export const SettingTemplate = () => {

  const [searchParams] = useSearchParams();

  const query = searchParams.get('setting') || 'background';

  return (
    <div className={S.layout}>
      <div className={S.container_navigation}>
        <SettingNavigation />
      </div>
      <div className={S.container_options}>
        {query === 'background' && <SettingBackground />}
      </div>
    </div>
  )
}