import {style} from './style';
import ReactSelect, { Options } from 'react-select';

type options = Options<{}>

type SelectInterface ={
  Options: options,
  className: string | undefined
}


const Select: React.FC<SelectInterface> = ({Options,className}) => {

  return (
    <ReactSelect
      captureMenuScroll={false}
      options={Options}
      styles={style}
      placeholder='Selecionar categoria'
      className={className}
    />
  )
}

export default Select;