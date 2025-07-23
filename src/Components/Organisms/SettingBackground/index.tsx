import S from './style.module.css';
import { BackgroundImageUpload } from '../../Molecules/BackgroundImageUpload';
import { useSettingBackgroundStore } from '../../../hooks/useSettingBackgroundStore';
import { BackgroundPreferenceSelector } from '../../Molecules/BackgroundPreferenceSelector';
import { BackgroundColor, BackgroundPreference, BackgroundSetting } from '../../../types/settings';
import { BackgroundColorSelector } from '../../Molecules/BackgroundColorSelector';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../hooks/useFetch';



export const SettingBackground = () => {

  const [defaultData, setDefaultData] = useState({} as BackgroundSetting)
  const { setColor, setPreference, setCropMode, getData } = useSettingBackgroundStore()
  const [isCrop, setIsCrop] = useState(true);

  const fetch = async () => {
    return await getData()
  }

  const { isLoading, data } = useFetch({
    queryFn: fetch
  })

  useEffect(() => {
    if (!isLoading && data) {
      setDefaultData(data)
      setIsCrop(data.isCrop);
    }
  }, [isLoading, data])

  const onPreferenceSelect = async (pref: BackgroundPreference) => {
    await setPreference(pref)
  }

  const onColorSelect = async (color: BackgroundColor) => {
    await setColor(color)
  }

  const onCropModeToggle = async (isActive: boolean) => {
    setIsCrop(isActive)
    await setCropMode(isActive)
  }

  if (isLoading) return null;

  return (
    <section className={S.layout}>
      <header className={S.header}>
        <h2 className={S.title}>Plano de fundo</h2>
      </header>


      <section id={S.section_preference}>
        <header className={S.header}>
          <h3 className={S.title}>Preferência de plano de fundo</h3>
          <p className={S.subtitle}>
            Escolha se deseja exibir uma imagem ou uma cor para plano de fundo
          </p>
        </header>
        <div className={S.group}>
          <BackgroundPreferenceSelector
            defaultValue={defaultData.type}
            onPreferenceSelect={onPreferenceSelect}
          />
        </div>
      </section>


      <section id={S.section_image}>
        <header className={S.header}>
          <h3 className={S.title}>Imagem</h3>
          <p className={S.subtitle}>
            Selecione uma imagem para usar como plano de fundo da pagina inicial
          </p>
        </header>
        <div className={S.group}>
          <BackgroundImageUpload isCrop={isCrop} />
          <h4>Cortar imagem</h4>
          <div className="group">
            <label htmlFor="cropped">
              <input
                defaultChecked={isCrop}
                onInput={() => onCropModeToggle(!isCrop)}
                type="checkbox"
                id="cropped"
                checked={isCrop}
              />
            </label>
          </div>
        </div>
      </section>


      <section id={S.section_color}>
        <header className={S.header}>
          <h3 className={S.title}>Cor</h3>
          <p className={S.subtitle}>
            Escolha uma cor para usar como plano de fundo
          </p>
        </header>
        <div className={S.group}>
          <BackgroundColorSelector
            defaultValue={defaultData.color}
            onColorSelect={onColorSelect}
          />
        </div>
      </section>
    </section>
  )
}