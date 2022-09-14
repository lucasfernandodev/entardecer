import { useState } from 'react';
import Icon from '../../../utils/icon';
import style from './style.module.css';
import Select from 'react-select';
import Favicon from '../../../Atoms/favicon';

interface data {
  page_title: string;
  page_url: string;
  page_url_icon: string | null;
  page_name: string;
  isDark?: boolean | null;
}
export default function AddShortcut({
  changeView,
  data,
}: {
  changeView: () => void;
  data: data;
}) {
  const [pressed, isPressed] = useState(false);

  function toggleButton() {
    isPressed(!pressed);
  }

  const options = [
    { value: 'Principal', label: 'Principal' },
    { value: 'Favoritos', label: 'Favoritos' },
    { value: 'Trabalho', label: 'Trabalho' },
    { value: 'Estudo', label: 'Estudo' },
  ];

  const customStyles = {
    container: (provided: any, state: any) => ({
      ...provided,
      color: 'hsla(180, 2%, 81%, 100%)',
      background: 'var(--bg-color)',
      height: '32px',
      minHeight: '32px',
      outline: 'unset',
    }),

    option: (provided: any, state: any) => {
      const background = state.isFocused ? '#3E7BFA' : 'var(--bg-color)';
      return { ...provided, background, cursor: "pointer" };
    },

    control: (provided: any, state: any) => {
      const border = state.isFocused
        ? '1px solid #3E7BFA'
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
      const color = state.isFocused ?'#3E7BFA' : '#27293B'
      console.log(state)
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
      color: 'hsla(180, 2%, 81%, 100%)',

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

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
      }}
      id={style.form}
    >
      <header className={style.header}>
        <button onClick={changeView}>
          <Icon name='arrow_left' />
        </button>
        <h1>Novo atalho</h1>
      </header>
      <section className={style.sectionForm}>
        <div className={style.group}>
          <div className={style.icon}>
            {data.page_url_icon && <Favicon
              src={data.page_url_icon}
              alt={data.page_title}
              brightness={data.isDark === true ? 1 : 0}
            />}
          </div>
          <input
            type='text'
            className={style.siteName}
            placeholder='Website name...'
            defaultValue={data?.page_title}
          />
        </div>
        <input
          type='text'
          className={style.siteUrl}
          placeholder='Website url...'
          defaultValue={data?.page_url}
        />
        <Select
          captureMenuScroll={false}
          options={options}
          styles={customStyles}
          placeholder='Selecionar categoria'
          className={style.select}
        />

        <div className={style.group}>
          <label htmlFor='toggleAutoload'>Habilitar autoload:</label>
          <button
            className={style.buttonToggle}
            aria-pressed={pressed}
            onClick={toggleButton}
            id="toggleAutoload"
          >
            <span className={style.buttonToggleText}>Toggle func autoload</span>
          </button>
        </div>
        <button className={style.formButtonSave}>Salvar</button>
      </section>
    </form>
  );
}
