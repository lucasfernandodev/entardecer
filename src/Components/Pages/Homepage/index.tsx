import { useEffect, useState } from 'react';
import { db } from '../../../Services/chrome/database';
import Layout from '../../Atoms/Layout';
import Painel from '../../Template/Painel';
import style from './style.module.css';

export default function Homepage(){
  const [bg, setBg] = useState<unknown | null>(null);

  useEffect(() => {
    async function getImageBackground (){
      const {bg_homepage : database} = await db();
      const isImagebackground = await database.getAll('image');
      if(isImagebackground.length !== 0){
        setBg(isImagebackground[0].data)
      }
    }

    getImageBackground()
  }, [])
  


  return (
    <Layout large='full'>
      <div className={style.container} style={{backgroundImage: `url(${bg})`}}>
        <Painel />
      </div>
    </Layout>
  )
}