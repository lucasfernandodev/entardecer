import { useState } from 'react';
import { db } from '../../../storage/database';
import Favicon from '../../Atoms/favicon';
import Icon from '../../utils/icon';
import style from './style.module.css';

interface PainelItem {
  stage: boolean;
  closeStage: () => void;
  data: {
    url: string;
    url_favicon: string;
    title: string;
    darkType: boolean;
  };
}

export default function PainelItem({ data, stage, closeStage }: PainelItem) {
  const [isRemoved, setIsRemoved] = useState(false);
  const [itemRemoved, setitemRemoved] = useState(false);

  async function removeShortcut() {
    const {shortcuts : database} = await db();
    try {
      await database.delete('website', data.url);
      setIsRemoved(true);
      setTimeout(() => {
        setitemRemoved(true);
      }, 300);

      const countShotcuts = await database.getAll('website');
      if (countShotcuts && countShotcuts.length === 0) {
        closeStage();
      }
    } catch (error) {
      console.log('Não foi possivel apagar o atalho', error);
    }
  }

  const linkPropertie = {
    target: stage ? '_self' : '_blank',
    href: stage ? '#' : data.url,
  };

  return (
    <div
      className={style.card}
      style={itemRemoved ? { display: 'none' } : {}}
      data-stage={stage}
      data-removed={isRemoved}
    >
      {stage && (
        <button
          className={style.btnClose}
          title='Apagar atalho'
          onClick={removeShortcut}
        >
          <Icon name='close' />
        </button>
      )}

      <a
        target={linkPropertie.target}
        href={linkPropertie.href}
        className={style.card_image}
      >
        <Favicon
          alt={data.title}
          src={data.url_favicon}
          brightness={data.darkType === true ? 1 : 0}
        />
      </a>

      <h3 className={style.cardTitle} title={data.title}>
        {data.title}
      </h3>
    </div>
  );
}
