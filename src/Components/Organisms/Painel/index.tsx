import { useEffect, useState } from 'react';
import { db } from '../../../Services/chrome/database';
import { requestMessage } from '../../../types/requestMessage';
import PainelItem from '../../Molecules/PainelItem';
import PainelOption from '../../Molecules/PainelOptions';
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


  chrome.runtime.onMessage.addListener(
    function(request: requestMessage, sender, sendResponse) {
      if(request.from === 'popup' && request.subject === "update"){
        setUpdate(`item?${Date.now()}}`)
        sendResponse(true)
      }
      return true;
    }
  );

  function handleModeEdit(back = false){
    if(back){
      setOptionsVisibility(!optionsVisibility);
    }else{
      setItemEdit(!itemEdit);
    }
  }

  return (
    <main className={style.painel}>
      <header className={style.header}>
        <div className={style.painelOptions}>
          <button
            onClick={() => handleModeEdit(!itemEdit)}
            data-focus={optionsVisibility}
            className={style.buttonToggleOption}
          >
            {itemEdit ? <Icon name='arrow_left' /> : <Icon name='dots' />}
          </button>
          {optionsVisibility && <PainelOption onClick={toggleItensEdit} onBlur={() => setOptionsVisibility(!optionsVisibility)}/>}
        </div>
        <div className={style.painelTitle}>
          <h3>{itemEdit ? 'Organizar atalhos' :'Atalhos'}</h3>
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
                stage={itemEdit}
                closeStage={() => setItemEdit(!itemEdit)}
                key={index}
                data={item}
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
