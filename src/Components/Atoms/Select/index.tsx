import {style} from './style';
import ReactSelect, { Options } from 'react-select';
import { ReactElement } from 'react';

type options = Options<{}>

interface SelectInterface{
  Options: options,
  className: string | undefined,
  id: string | undefined,
  getValue: (evt: any) => void
}


const Select: React.FC<SelectInterface> = ({Options,className,getValue, id}) => {

  return (
    <ReactSelect
      captureMenuScroll={false}
      options={Options}
      styles={style}
      placeholder='Selecionar categoria'
      className={className}
      id={id}
      onChange={getValue}
    />
  )
}

export default Select;