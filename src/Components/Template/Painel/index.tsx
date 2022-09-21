import { useEffect, useState } from 'react';
import { db } from '../../../Services/chrome/database';
import { storage } from '../../../Services/chrome/storage';
import { requestMessage } from '../../../types/requestMessage';
import PainelItem from '../../Molecules/PainelItem';
import PainelFooter from '../../Organisms/PainelFooter';
import PainelHeader from '../../Organisms/PainelHeader';
import Icon from '../../utils/icon';
import style from './style.module.css';

interface data {
  url: string;
  url_favicon: string;
  title: string;
  darkType: boolean;
}

export default function Painel() {
  const [data, setData] = useState<data[]>([]);
  const [stage, setStage] = useState(false);
  const [update, setUpdate] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [category, setCategory] = useState(0);

  useEffect(() => {
    const categories = ['apps', ...storage.read('category').data];
    setCategories(categories);
  }, [update]);

  useEffect(() => {
    (async () => {
      const database = await db();

      const data = await database.getAllFromIndex('website','by-category',
        categories[category]) as data[]

      if (data !== undefined) {
        setData(data);
      }
    })();
  }, [category]);


  function changeCategory(action: string) {
    const qtdCategories = categories.length - 1;

    if (action === 'goToNext') {
      if (category + 1 <= qtdCategories) {
        const currentCategory = category + 1;
        setCategory(currentCategory);
      }
    }

    if (action === 'goToBack') {
      if (category - 1 >= 0) {
        const currentCategory = category - 1;
        setCategory(currentCategory);
      }
    }
  }

  chrome.runtime.onMessage.addListener(function (
    request: requestMessage,
    sender,
    sendResponse
  ) {
    if (request.from === 'popup' && request.subject === 'update') {
      setUpdate(`item?${Date.now()}}`);
      sendResponse(true);
    }
    return true;
  });

  function changeStage(){
    if(data.length > 0){
      setStage(!stage)
    }
  }

  return (
    <main className={style.painel}>
      <PainelHeader
        title={categories[category]}
        changeCategory={changeCategory}
        changeStage={changeStage}
        stage={stage}
      />

      <section className={style.section}>
        {data.length > 0 ?
          data.map((item) => (
            <PainelItem
              stage={stage}
              closeStage={() => setStage(!stage)}
              key={item.url}
              data={item}
            />
          )): <span className={style.alternativeText}>Nenhum atalho salvo nessa categoria.</span>}
      </section>

      <PainelFooter />
    </main>
  );
}