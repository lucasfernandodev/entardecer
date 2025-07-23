import { useEffect, useState } from 'react';
import S from './style.module.css';
import { BackgroundPreference } from '../../../types/settings';


interface BackgroundPreferenceSelectorProps {
  onPreferenceSelect: (pref: BackgroundPreference) => void;
  defaultValue: BackgroundPreference
}

export const BackgroundPreferenceSelector = ({
  onPreferenceSelect,
  defaultValue
}: BackgroundPreferenceSelectorProps) => {
  const [preference, setPreference] = useState(
    defaultValue || '' as BackgroundPreference
  );

  useEffect(() => {
    if (defaultValue) {
      setPreference(defaultValue)
    }
  }, [defaultValue])

  const onSelectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as BackgroundPreference;
    setPreference(value);
    onPreferenceSelect(value);
  };

  return (
    <div className={S.container}>
      <select value={preference} className={S.select} onChange={onSelectHandle}>
        <option value="" disabled>Selecionar</option>
        <option value="image">Imagem</option>
        <option value="color">Cor</option>
      </select>
    </div>
  )
}