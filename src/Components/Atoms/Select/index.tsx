import { style } from "./style";
import ReactSelect, { Options } from "react-select";

type options = Options<any>;

interface SelectInterface {
  Options: options;
  className: string | undefined;
  id: string | undefined;
  getValue: (evt: any) => void;
}

const Select = ({ Options, className, getValue, id }: SelectInterface) => {
  return (
    <ReactSelect
      captureMenuScroll={false}
      options={Options}
      styles={style}
      placeholder="Selecionar categoria"
      className={className}
      id={id}
      onChange={getValue}
    />
  );
};

export default Select;
