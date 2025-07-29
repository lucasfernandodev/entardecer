import S from './style.module.css';
import { BackgroundPreference } from '../../../../types/settings';
import { useSetting } from '../../../../hooks/useSetting';
import { useAlert } from '../../../../hooks/useAlert';
import { useEffect } from 'react';



export const BackgroundPreferenceSelector = () => {

  const { settings, updateBackgroundConfig } = useSetting()
  const { addAlert, clearAlerts } = useAlert();

  useEffect(() => {
    return () => {
      clearAlerts()
    }
  }, [])

  const onSelectHandle = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as BackgroundPreference;
    const { success, message } = await updateBackgroundConfig({
      ...settings.background,
      type: value
    });

    if (success) {
      addAlert({
        variation: 'success',
        title: 'Preferência selecionada',
        description: `Plano de fundo da nova aba definido para ${value}`
      })
      return;
    }

    addAlert({
      variation: 'error',
      title: 'Seleção de preferência falhou',
      description: message ?? undefined
    })
  };

  return (
    <div className={S.container}>
      <select value={settings.background.type} className={S.select} onChange={onSelectHandle}>
        <option value="" disabled>Selecionar</option>
        <option value="image">Imagem</option>
        <option value="color">Cor</option>
      </select>
    </div>
  )
}