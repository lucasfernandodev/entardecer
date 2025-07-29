import S from './style.module.css';
import { useSetting } from '../../../../hooks/useSetting';
import { useAlert } from '../../../../hooks/useAlert';
import { useEffect, useState } from 'react';

export const SettingOverlay = () => {

  const { settings, updateOverlayConfig } = useSetting()
  const [opacity, setOpacity] = useState(settings.overlay.opacity)
  const { addAlert, clearAlerts } = useAlert()

  const changeOpacity = async (value?: string) => {
    if (!value) return;
    if (Number.parseInt(value) >= 0 && Number.parseInt(value) <= 100) {
      const { success, message } = await updateOverlayConfig({
        ...settings.overlay,
        opacity: value
      })
      if (success) {
        addAlert({
          variation: 'success',
          title: 'Overlay',
          description: `Opacidade definido para ${value}%`
        })
      } else {
        addAlert({
          variation: 'error',
          title: 'Overlay',
          description: message ?? undefined,
        })
        setOpacity(settings.overlay.opacity)
      }
    }
  }

  useEffect(() => {
    return () => {
      clearAlerts()
    }
  }, [])


  return (
    <section className={S.layout}>
      <header className={S.header}>
        <h2 className={S.title}>Overlay</h2>
      </header>
      <section id={S.section_opacity}>
        <header className={S.header}>
          <h3 className={S.title}>Mudar opacidade</h3>
          <p className={S.subtitle}>
            O overlay é uma camada sobre o plano de fundo.
            Ele pode ir do transparente ao totalmente escuro.
          </p>
        </header>
        <div className={S.group}>
          <div className={S.group}>
            <input
              onChange={e => setOpacity(e.currentTarget.value)}
              onMouseUp={() => changeOpacity(opacity)}
              type="range"
              name="overlay-opacity"
              id="overlay-opacity"
              min={0}
              max={100}
              value={opacity}
              style={{
                background: `linear-gradient(to right, #fff ${opacity}%, hsla(0, 0%, 100%, 25%) ${opacity}%)`
              }}
            />
          </div>
          <div className={S.result}>
            <span className={S.initial}>0%</span>
            <span className={S.current}>{opacity}%</span>
          </div>
        </div>
      </section>
    </section>
  )
}