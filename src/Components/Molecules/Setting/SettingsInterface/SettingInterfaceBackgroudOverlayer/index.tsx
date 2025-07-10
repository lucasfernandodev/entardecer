import { useEffect, useRef, useState } from 'react';
import S from './style.module.css';

export const SettingInterfaceBackgroudOverlayer = () => {
  const [overlayerOpacity, setOverlayerOpacity] = useState(
    window.localStorage.getItem('overlayer-opacity') || '50'
  )
  const inputRef = useRef<HTMLInputElement>(null)

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value;
    setOverlayerOpacity(value)
    window.localStorage.setItem('overlayer-opacity', value);
  }

  useEffect(() => {
    if (inputRef.current) {
      const range = inputRef.current
      const defaultValue = window.localStorage.getItem('overlayer-opacity') || '50';
      range.style.backgroundSize = ((Number(defaultValue) - 0) / (100 - 0)) * 100 + "% 100%"

      inputRef.current.addEventListener('input', () => {
        const min = Number(range.min)
        const max = Number(range.max)
        const currentVal = Number(range.value)

        range.style.backgroundSize = ((currentVal - min) / (max - min)) * 100 + "% 100%"
      })
    }
  }, [])

  return (
    <form className={S.form}>
      <h3 className={S.title}>Alterar a opacidade do overlayer</h3>
      <p className={S.desc}>
        Ajuste a opacidade da camada sobreposta (overlay), de mais clara a mais escura.
        Quanto mais escura, menos visível será a imagem de fundo.
      </p>
      <div className={S.groupInput}>
        <span className={S.result}>{overlayerOpacity}%</span>
        <input
          ref={inputRef}
          onChange={onChange}
          min={0}
          max={100}
          type="range"
          name="overlayer-opacity"
          id="overlayer-opacity"
          className={S.slider}
          defaultValue={Number.parseInt(overlayerOpacity)}
        />
      </div>
    </form>
  )
}