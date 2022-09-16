import { useState } from 'react';
import Icon from '../../../utils/icon';
import style from './style.module.css';
import Favicon from '../../../Atoms/favicon';
import '../../../../styles/global.css';
import Select from '../../../Atoms/Select';

interface data {
  page_title: string;
  page_url: string;
  page_url_icon: string | null;
  page_name: string;
  isDark?: boolean | null;
}

interface AddShortcut {
  changeView: () => void;
  data: data;
}

function FormPopup({ changeView, data }: AddShortcut) {
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
            {data.page_url_icon && (
              <Favicon
                src={data.page_url_icon}
                alt={data.page_title}
                brightness={data.isDark === true ? 1 : 0}
              />
            )}
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

        <Select Options={options} className={style.select} />

        <div className={style.group}>
          <label htmlFor='toggleAutoload'>Habilitar autoload:</label>
          <button
            className={style.buttonToggle}
            aria-pressed={pressed}
            onClick={toggleButton}
            id='toggleAutoload'
          >
            <span className={style.buttonToggleText}>Toggle func autoload</span>
          </button>
        </div>
        <button className={style.formButtonSave}>Salvar</button>
      </section>
    </form>
  );
}

export default FormPopup;
