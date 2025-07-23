import { Link, useSearchParams } from 'react-router-dom';
import S from './style.module.css'; 

export const SettingNavigation = () => {
  const [searchParams] = useSearchParams(); 
  const query = searchParams.get('setting'); 

  return (
    <nav className={S.navigation}>
      <h1 className={S.title}>Configurações</h1>
      <div className={S.wrapper}>
        <ul className={S.menu}>
          <li className={S.item} data-active={query === 'background'}>
            <Link to="/?setting=background" className={S.link}>Plano de fundo</Link>
          </li>
          <li className={S.item}data-active={query === 'overlay'}>
            <Link to="/?setting=overlay" className={S.link}>Overlay</Link>
          </li>
          <li className={S.item} data-active={query === 'painel'}>
            <Link to="/?setting=painel" className={S.link}>Painel</Link>
          </li>
          <li className={S.item} data-active={query === 'export-import'}>
            <Link to="/?setting=export-import" className={S.link}>Exportar/Importar</Link>
          </li>
          <li className={S.item} data-active={query === 'about'}>
            <Link to="/?setting=about" className={S.link}>Sobre</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}