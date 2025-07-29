import { IconBrandGithub } from '@tabler/icons-react';
import S from './style.module.css';

export const SettingAbout = () => {
  return (
    <section className={S.layout}>
      <header className={S.header}>
        <h2 className={S.title}>Sobre</h2>
      </header>

      <section id={S.section_version}>
        <header className={S.header}>
          <h3 className={S.title}>Versão</h3>
          <p className={S.subtitle}>
            Informações sobre a versão atual da extensão.
          </p>
        </header>
        <div className={S.group}>
          <div className={S.container}>
            <span className={S.text}>v{__APP_VERSION__}</span>
          </div>
        </div>
      </section>

      <section id={S.section_contact}>
        <header className={S.header}>
          <h3 className={S.title}>Contato</h3>
          <p className={S.subtitle}>
            Acesse o repositório no GitHub para mais informações ou para reportar um problema.
          </p>
        </header>
        <div className={S.group}>
          <div className={S.container}>
            <a
              href="https://github.com/lucasfernandodev/entardecer"
              target="_blank"
              rel="noopener noreferrer"
              className={S.button}
            >
              <IconBrandGithub size={18} style={{ marginRight: 8 }} />
              GitHub
            </a>
          </div>
        </div>
      </section>
    </section>
  );
};
