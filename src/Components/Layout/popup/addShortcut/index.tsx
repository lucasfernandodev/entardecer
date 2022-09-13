import { useState } from 'react';
import Icon from '../../../utils/icon';
import style from './style.module.css';
import Select from 'react-select';
import Favicon from '../../../Atoms/favicon';

interface data {
  page_title: string,
  url: string,
  icon: string,
  page_name: string
}
export default function AddShortcut({changeView, data}: {changeView: () => void, data: data}){
  
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
    container:(provided: any, state: any) => ({
      ...provided,
      color: 'hsla(180, 2%, 81%, 100%)',
      background: 'var(--bg-color)',
      height: '32px',
      minHeight: '32px',
      outline: 'unset'
    }),

    option: (provided: any, state: any) => {
      const background =   state.isFocused ? '#27293B' : 'var(--bg-color)'
      return {  ...provided,background}
    },

    control: (provided: any, state: any) => {
      const border = state.isFocused ? '1px solid #676A87' : '1px solid #27293B';

      return{
      ...provided,
      background: 'var(--bg-color)',
      margin: 0,
      height: '32px',
      minHeight: '32px',
      border,
      boxShadow: 'unset',
      outline: 'unset'
    }},

    
    indicatorSeparator: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: '#27293B',
      height: 'calc(100% - 8px)',
      marginTop: '3px'
    }),

    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      margin: 0,
      height: '32px',
      minHeight: '32px',
      border: 'unset'
    }),

    valueContainer: (provided: any, state: any)=> ({
      ...provided,
      minHeight: '32px',
      paddingTop: 0,
    }),

    input: (provided: any, state: any) => ({
      ...provided,
      paddingTop: 0,
      margin: 0,
      paddingBottom: 0,
      color: 'hsla(180, 2%, 81%, 100%)',
    }),

    menu: (provided: any, state: any) => ({
      ...provided,
      width: '100%',
      borderBottom: '1px solid #27293B',
      color: 'hsla(180, 2%, 81%, 100%)',
      background: 'var(--bg-color)',
      height: '115px',
      overflowY: 'scroll',
    }),

  
    singleValue: (provided: any, state:any) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition ,       color: 'hsla(180, 2%, 81%, 100%)',};
    }
  }

  return (
    <form onSubmit={(evt) => {evt.preventDefault()}} id={style.form}>
      <header className={style.header}>
        <button onClick={changeView}>
          <Icon name='arrow_left' />
        </button>
        <h1>Novo atalho</h1>
      </header>
      <section className={style.sectionForm}>
        <div className={style.group}>
          <div className={style.icon}>
            
            <Favicon src={data.icon} alt={data.page_title} brightness={0} />
          </div>
          <input type="text" className={style.siteName} placeholder="Website name..." value={data?.page_title}/>
        </div>
        <input type="text" className={style.siteUrl} placeholder="Website url..." value={data?.url}/>
        <Select
          captureMenuScroll={false}
          options={options}
          styles={customStyles}
          placeholder="Selecionar categoria"
          className={style.select}
        />

        <div className={style.group}>
          <label htmlFor="">Habilitar autoload:</label>
          <button className={style.buttonToggle} aria-pressed={pressed} onClick={toggleButton}><span className={style.buttonToggleText}>Toggle func autoload</span></button>
        </div>
        <button className={style.formButtonSave}>Salvar</button>
      </section>
    </form>
  )
}