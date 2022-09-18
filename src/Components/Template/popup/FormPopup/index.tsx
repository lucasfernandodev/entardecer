import React, { HTMLAttributes, useState } from 'react';
import Icon from '../../../utils/icon';
import style from './style.module.css';
import Favicon from '../../../Atoms/favicon';
import '../../../../styles/global.css';
import Select from '../../../Atoms/Select';
import { isValidHttpUrl } from '../../../../utils/isValidHttpUrl';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../Atoms/Layout';

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

interface inputs {
  [key: string]: HTMLInputElement | null;
}

const options = [
  { value: 'Principal', label: 'Principal' },
  { value: 'Favoritos', label: 'Favoritos' },
  { value: 'Trabalho', label: 'Trabalho' },
  { value: 'Estudo', label: 'Estudo' },
];

function FormPopup({ changeView, data }: AddShortcut) {
  const navigate = useNavigate();
  const [pressed, isPressed] = useState(false);
  const [msgError, setMsgError] = useState<string>('');

  function toggleButton() {
    isPressed(!pressed);
  }

  function handlerSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setMsgError('');

    const errors = [];
    const form = evt.target as HTMLFormElement;

    const inputs: inputs = {
      title: form.querySelector('#website_title'),
      url: form.querySelector('#website_url'),
      category: form.querySelector('#website_category'),
      autoload: form.querySelector('#website_autoload'),
    };

    for (let i = 0; i < Object.keys(inputs).length; i++) {
      const inputsName = Object.keys(inputs);

      const input: any = inputs[inputsName[i]];
      input.classList.remove(style.invalid);

      if (inputsName[i] === 'title') {
        if (input.value === '') {
          errors.push({
            el: input,
            message: 'O campo title não pode ficar em branco',
          });
        }

        if (input.value.lenght < 4) {
          errors.push({
            el: input,
            message: 'O campo title deve ter no minimo 4 letras',
          });
        }

        if (input.value.lenght > 32) {
          errors.push({
            el: input,
            message: 'O campo title deve ter no maximo 32 letras',
          });
        }
      }

      if (inputsName[i] === 'url') {
        if (input.value === '') {
          errors.push({
            el: input,
            message: 'O campo url não pode ficar em branco',
          });
        }

        if (!isValidHttpUrl(input.value)) {
          errors.push({
            el: input,
            message: 'O campo url digitado é invalido',
          });
        }
      }
    }

    if (errors.length !== 0) {
      const elError = errors[0].el;

      elError.classList.add(style.invalid);
      setMsgError(errors[0].message);
      return;
    }

    const data = {
      title: inputs.title?.value,
      url: inputs.url?.value,
      category: inputs.category?.value || 'others',
      autoload: inputs.autoload?.getAttribute('aria-pressed'),
    };

    navigate('/success');
  }

  return (
    <Layout>
      <form onSubmit={handlerSubmit} id={style.form}>
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
              id='website_title'
            />
          </div>
          <input
            type='text'
            className={style.siteUrl}
            placeholder='Website url...'
            defaultValue={data?.page_url}
            id='website_url'
          />

          <Select
            Options={options}
            className={style.select}
            id='website_category'
          />

          <div className={style.group}>
            <label htmlFor='website_autoload'>Habilitar autoload:</label>
            <button
              className={style.buttonToggle}
              aria-pressed={pressed}
              onClick={toggleButton}
              id='website_autoload'
            >
              <span className={style.buttonToggleText}>
                Toggle func autoload
              </span>
            </button>
          </div>

          <span className={style.msgError}>{msgError}</span>
          <button className={style.formButtonSave}>Salvar</button>
        </section>
      </form>
    </Layout>
  );
}

export default FormPopup;
