import {style} from './style';
import ReactSelect, { Options } from 'react-select';
import { ReactElement } from 'react';

type options = Options<{}>

interface SelectInterface{
  Options: options,
  className: string | undefined,
  id: string | undefined
}


const Select: React.FC<SelectInterface> = ({Options,className, id}) => {

  return (
    <ReactSelect
      captureMenuScroll={false}
      options={Options}
      styles={style}
      placeholder='Selecionar categoria'
      className={className}
      id={id}
    />
  )
}

export default Select;