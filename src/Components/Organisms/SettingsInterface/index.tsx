import { useState } from 'react';
import SettingsInterfaceAnimation from '../../Molecules/SettingsInterfaceAnimation';
import SettingsInterfaceBackground from '../../Molecules/SettingsInterfaceBackground';
import { SettingsInterfaceMenu } from '../../Molecules/SettingsInterfaceMenu';
import style from './style.module.css';

export function SettingsInterface() {

  const [option, setOption] = useState<string>('animation')

  function selectOption(option: string){
    setOption(option)
  }
  return (
    <main className={style.main}>
      <SettingsInterfaceMenu getOptionSelect={selectOption}/>
      {option === 'animations' && <SettingsInterfaceAnimation />}
      {option === 'background' && <SettingsInterfaceBackground />}

    </main>
  );
}
