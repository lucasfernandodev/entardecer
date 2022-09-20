import { useEffect, useState } from 'react';
import { db } from '../../../Services/chrome/database';
import PainelItem from '../../Molecules/PainelItem';
import Icon from '../../utils/icon';
import style from './style.module.css';

export default function Painel() {
  const [data, setData] = useState([]);
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [itemEdit, setItemEdit] = useState(false);
  const [update, setUpdate] = useState<string>('');

  useEffect(() => {
    getData();
  }, [update]);

  async function getData() {
    const database = await db();

    const data = (await database.getAll('website')) as any;
    setData(data);
  }

  function toggleItensEdit() {
    setOptionsVisibility(!optionsVisibility);
    setItemEdit(!itemEdit);
  }

  function PainelOption() {
    return (
      <ul className={style.painelOption_suspend}>
        <li className={style.painelOption_item}>
          <button onClick={toggleItensEdit}>Editar</button>
        </li>
        <li className={style.painelOption_item}>
          <button>Configurações</button>
        </li>
      </ul>
    );
  }

  function handleModeEdit(){
    if(itemEdit){
      toggleItensEdit()
    }else{
      setOptionsVisibility(!optionsVisibility)
    }
  }

  return (
    <main className={style.painel}>
      <header className={style.header}>
        <div className={style.painelOptions}>
          <button
            onClick={() => handleModeEdit()}
            data-focus={optionsVisibility}
            className={style.buttonToggleOption}
          >
            {itemEdit ? <Icon name='arrow_left' /> : <Icon name='dots' />}
          </button>
          {optionsVisibility && <PainelOption />}
        </div>
        <div className={style.painelTitle}>
          <h3>Atalhos</h3>
        </div>
        <div className={style.painelControllers}>
          <button className={style.btnController}>
            <Icon name='chevron_left' />
          </button>
          <button className={style.btnController}>
            <Icon name='chevron_right' />
          </button>
        </div>
      </header>

      <section className={style.section}>
        {data &&
          data.map((item: any, index: number) => {
            return (
              <PainelItem
                onClick={setUpdate}
                edit={itemEdit}
                isDark={item.darkType}
                key={index}
                url_image={item.url_favicon}
                title={item.title}
                url={item.url}
              />
            );
          })}
      </section>

      <footer className={style.footer}>
        <button className={style.buttonNotify}>
          <Icon name='bell' />
        </button>
        <hr />
      </footer>
    </main>
  );
}
