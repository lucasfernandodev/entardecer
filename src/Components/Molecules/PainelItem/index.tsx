import { db } from '../../../Services/chrome/database';
import Favicon from '../../Atoms/favicon';
import Icon from '../../utils/icon';
import style from './style.module.css';

interface PainelItem {
  url: string;
  url_image: string;
  title: string;
  isDark: boolean;
  edit: boolean;
  onClick: (url: string) => void
}

export default function PainelItem({
  url,
  edit,
  isDark,
  title,
  url_image,
  onClick
}: PainelItem) {

  async function removeShortcut(url: string){
    const database = await db();
    const result = await database.delete('website', url)
    console.log(result)
    onClick(url)
  }

  return (
    <div className={style.card} data-edit={edit}>
      {edit && (
      <button className={style.buttonClose} title="Apagar atalho" onClick={() => removeShortcut(url)}>
        <Icon name='close' />
      </button>
      )}
      <a target={edit ? '_self' : '_blank'} href={edit ? '#' : url} className={style.card_image}>
        <Favicon
          alt={title}
          src={url_image}
          brightness={isDark === true ? 1 : 0}
        />
      </a>
      <h3 className={style.cardTitle} title={title}>
        {title}
      </h3>
    </div>
  );
}
