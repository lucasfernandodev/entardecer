import S from './style.module.css';
import { isHexColor } from '../../../../utils/is-hex-color';
import { defaultPalete } from '../../../../infra/hydrate-database';
import { useSetting } from '../../../../hooks/useSetting';




export const BackgroundColorSelector = () => {

  const { settings, updateBackgroundConfig } = useSetting()

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isColor = isHexColor(value);
    if (isColor) {
      await updateBackgroundConfig({
        ...settings.background,
        color: value
      })
    }
  }


  return (
    <div className={S.container}>
      {defaultPalete.map(colorValue => (
        <div key={colorValue} className={S.input_wrapper}>
          <input
            style={{ ['--bg-color' as string]: colorValue }}
            type="radio"
            name="color"
            id={`color-${colorValue}`}
            value={colorValue}
            checked={settings.background.color === colorValue}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  )
}