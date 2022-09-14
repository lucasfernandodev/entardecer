export const selectCustomStyle = {
  container: (provided: any, state: any) => ({
    ...provided,
    color: 'hsla(180, 2%, 81%, 100%)',
    background: 'var(--bg-color)',
    height: '32px',
    minHeight: '32px',
    outline: 'unset',
  }),

  option: (provided: any, state: any) => {
    const background = state.isFocused ? 'var(--color-primary)' : 'var(--bg-color)';
    return { ...provided, background, cursor: "pointer" };
  },

  control: (provided: any, state: any) => {
    const border = state.isFocused
      ? '1px solid var(--color-primary)'
      : '1px solid #27293B';

    return {
      ...provided,
      background: 'var(--bg-color)',
      margin: 0,
      height: '32px',
      minHeight: '32px',
      border,
      boxShadow: 'unset',
      outline: 'unset',
    };
  },

  indicatorSeparator: (provided: any, state: any) => {
    const backgroundColor = state.isFocused ? '#27293B' : '#27293B';
    return {
    ...provided,
    backgroundColor: backgroundColor,
    height: 'calc(100% - 8px)',
    marginTop: '3px',
  }},

  dropdownIndicator: (provided: any, state: any) => {
    const color = state.isFocused ?'var(--color-primary)' : '#27293B'

    return{
    ...provided,
    margin: 0,
    height: '32px',
    minHeight: '32px',
    border: 'unset',
    cursor: 'pointer',
    padding: '0px 6px',
    color
  }},

  valueContainer: (provided: any, state: any) => ({
    ...provided,
    minHeight: '32px',
    paddingTop: 0,
    paddingBottom: 0,
    display: 'flex',
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    paddingTop: 0,
    margin: 0,
    paddingBottom: 0,
    position: 'absolute',
    left: '8px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: 'hsla(180, 2%, 81%, 100%)',
      fontSize: '13px',
      fontWeight: 'bold',
  }),

  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: 'hsla(180, 2%, 81%, 50%)',
    fontSize: '12px',
    fontWeight: 'bold',
  }),

  menu: (provided: any, state: any) => ({
    ...provided,
    width: '100%',
    border: '1px solid #27293B',
    color: 'hsla(180, 2%, 81%, 100%)',
    background: 'var(--bg-color)',
    height: '125px',
    overflowY: 'scroll',
    fontSize: "12px",
    
  }),

  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return {
      ...provided,
      opacity,
      transition,
      color: 'hsla(180, 2%, 81%, 100%)',
      fontSize: '13px',
      fontWeight: 'bold',
    };
  },
};