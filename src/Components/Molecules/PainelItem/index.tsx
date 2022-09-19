import Favicon from '../../Atoms/favicon';
import style from './style.module.css';

interface PainelItem{
  url: string,
  url_image: string,
  title: string,
  isDark: boolean
}

export default function PainelItem({url, isDark,title, url_image}: PainelItem){

  return (
    <div className={style.card}>
     <a className={style.card_image}>
      <Favicon alt={title} src={url_image} brightness={isDark === true ? 1 : 0}/>
     </a>
      <h3 className={style.cardTitle}>{title}</h3>
    </div>
  )
}