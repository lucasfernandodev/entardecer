import style from './style.module.css';
import Icon from '../../../utils/icon';
import { useEffect, useState } from 'react';
import { getCurrentTab } from '../../../../utils/getcurrentTab';
import Layout from '../../../Atoms/Layout';

export default function Hero({ changeView }: { changeView: () => void }) {
  const [pressed, isPressed] = useState(true);
  const [inValidPage, setInValidPage] = useState(false);

  function toggleButton() {
    isPressed(!pressed);
  }

  useEffect(() => {
    (async () => {
      const tab = await getCurrentTab();
      if (typeof tab !== 'undefined' && tab?.title !== 'undefined') {
        if (!tab.url?.includes('chrome://')) {
          setInValidPage(true);
        }
      }
    })();


  }, []);

  return (
   <Layout>
     <div id={style.hero}>
      <header className={style.header}>
        <img src='/images/logo.svg' alt='Logo entardecer' />
        <h1>Entardecer</h1>
      </header>
      <section className={style.navigation}>
        <ul className={style.menu}>
          <li className={style.menuItem}>
            <a
              href='#'
              className={style.menuLink}
              data-state={inValidPage}
              onClick={inValidPage ? changeView : () => {}}
            >
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
   </Layout>
  );
}
