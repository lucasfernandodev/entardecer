import { useEffect, useState } from 'react';
import { db } from '../../../Services/chrome/database';
import PainelItem from '../../Molecules/PainelItem';
import Icon from '../../utils/icon';
import style from './style.module.css';

export default function Painel() {

  const [data, setData] = useState([]);
  useEffect(() => {
    getData()
  }, [])


  async function getData(){
    const database = await db();

    const data = await database.getAll('website')as any;
    setData(data)
  }

console.log(data)
  return (
    <main className={style.painel}>
      <header className={style.header}>
        <div className={style.painelOptions}>
          <button>
            <Icon name='dots' />
          </button>
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
        {data && data.map((item: any, index:number) => {
          console.log(item)
          return (<PainelItem isDark={item.darkType}key={index} url_image={item.url_favicon} title={item.title} url={item.url}/>)
        })}
      </section>

      
      <footer className={style.footer}>
        <button className={style.buttonNotify}><Icon name='bell' /></button>
        <hr />
      </footer>
    </main>
  );
}
