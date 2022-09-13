import style from './style.module.css';
import Icon from '../../../utils/icon';
import { Fragment, useState } from 'react';

export default function Hero({changeView}: {changeView: () => void}) {
  const [pressed, isPressed] = useState(true);

  function toggleButton() {
    isPressed(!pressed);
  }

  return (
    <div id={style.hero}>
      <header className={style.header}>
        <img src='/images/logo.svg' alt='Logo entardecer' />
        <h1>Entardecer</h1>
      </header>
      <section className={style.navigation}>
        <ul className={style.menu}>
          <li className={style.menuItem}>
            <a href='#' className={style.menuLink} onClick={changeView}>
              <Icon name='shortcut' />
              <span>Adicionar atalho</span>
            </a>
          </li>
          <li className={style.menuItem}>
            <a href='#' className={style.menuLink}>
              <Icon name='github' />
              <span>Pagina Inicial</span>
            </a>
          </li>
          <li className={style.menuItem}>
            <a href='#' className={style.menuLink}>
              <Icon name='config' />
              <span>Configurações</span>
            </a>
          </li>
          <li className={style.menuItem}>
            <a href='#' className={style.menuLink}>
              <Icon name='help' />
              <span>Ajuda</span>
            </a>
          </li>
        </ul>
      </section>
      <footer className={style.footer}>
        <div className={style.wrapperButton}>
          <button
            className={style.btnToggleTheme}
            onClick={toggleButton}
            aria-pressed={`${pressed}`}
          >
            <span>
              <Icon name='sun' />
              <span className={style.themeText}>Ligth</span>
            </span>
            <span>
              <Icon name='moom' />
              <span className={style.themeText}>Dark</span>
            </span>
          </button>
        </div>
      </footer>
    </div>
  );
}
