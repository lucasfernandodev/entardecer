import { useEffect, useState } from 'react';
import S from './style.module.css';
import { BackgroundColor } from '../../../types/settings';
import { isHexColor } from '../../../utils/is-hex-color';
import { defaultPalete } from '../../../hooks/useSettingBackgroundStore';



interface BackgroundColorSelectorProps {
  onColorSelect: (color: BackgroundColor) => void
  defaultValue: BackgroundColor;
}

export const BackgroundColorSelector = ({
  onColorSelect,
  defaultValue
}: BackgroundColorSelectorProps) => {

  const [color, setColor] = useState(
    defaultValue ?? defaultPalete[1]
  )

  useEffect(() => {
    if (defaultValue && isHexColor(defaultValue)) {
      setColor(defaultValue);
    }
  }, [defaultValue]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log(value)
    const isColor = isHexColor(value);
    if (isColor) {
      setColor(value)
      onColorSelect(value)
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
            checked={color === colorValue}
            onChange={onChange}
          />
        </div>
      ))}
    </div>
  )
}