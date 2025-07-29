import { useEffect } from 'react';
import { useSettingPainelStore } from '../../../../hooks/useSettingPainelStore';
import S from './style.module.css';
import { useAlert } from '../../../../hooks/useAlert';
import { useSetting } from '../../../../hooks/useSetting';


export const SettingPainel = () => {
  const { settings, updatePainelConfig } = useSetting()
  const { addAlert, clearAlerts } = useAlert()

  const onChangePosition = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'left' || value === 'center' || value === 'right') {
      const { success, message } = await updatePainelConfig({
        ...settings.painel,
        position: value
      })
      if (success) {
        addAlert({
          variation: 'success',
          title: 'Painel',
          description: `A posição do painel foi alterado para ${value}`
        })
      } else {
        addAlert({
          variation: 'error',
          title: 'Falha ao mudar posição do painel',
          description: message ?? undefined
        })
      }
    }
  }

  const onChangeVisibility = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'show' || value === 'hidden') {
      const { message, success } = await updatePainelConfig({
        ...settings.painel,
        visibility: value
      })

      if (success) {
        addAlert({
          variation: 'success',
          title: 'Painel',
          description: `A visibilidade do painel foi alterado para ${value}`
        })
      } else {
        addAlert({
          variation: 'error',
          title: 'Falha ao mudar visibilidade do painel',
          description: message ?? undefined
        })
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
        <h2 className={S.title}>Painel</h2>
      </header>
      <section id={S.section_visibility}>
        <header className={S.header}>
          <h3 className={S.title}>Visibilidade</h3>
          <p className={S.subtitle}>
            Mostre ou esconda o painel de atalhos
          </p>
        </header>
        <div className={S.group}>
          <div className={S.container}>
            <select
              className={S.select}
              defaultValue={settings.painel.visibility}
              onChange={onChangeVisibility}
            >
              <option value="" disabled>Selecionar</option>
              <option value="show">Mostrar</option>
              <option value="hidden">Esconder</option>
            </select>
          </div>
        </div>
      </section>

      <section id={S.section_position}>
        <header className={S.header}>
          <h3 className={S.title}>Posicionamento</h3>
          <p className={S.subtitle}>
            Escolha onde você deseja posicionar o painel
          </p>
        </header>
        <div className={S.group}>
          <div className={S.container}>

            <select
              className={S.select}
              defaultValue={settings.painel.position}
              onChange={onChangePosition}
            >
              <option value="" disabled>Selecionar</option>
              <option value="left">Esquerda</option>
              <option value="center">Centro</option>
              <option value="right">Direita</option>
            </select>

          </div>
        </div>
      </section>
    </section>
  )
}