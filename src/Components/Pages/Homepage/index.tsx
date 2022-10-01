import { useEffect, useState } from 'react';
import { db } from '../../../storage/database';
import { requestMessage } from '../../../types/requestMessage';
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

    getImageBackground();

      
  chrome.runtime.onMessage.addListener(function (
    request: requestMessage,
    sender,
    sendResponse
  ) {
    console.log(request)
    if (request.from === 'configuration' && request.to === "homepage" && request.subject === 'update') {
     location.reload();
    }
    return true;
  });
  }, [])


  return (
    <Layout large='full'>
      <div className={style.container} style={{backgroundImage: `url(${bg})`}}>
        <Painel />
      </div>
    </Layout>
  )
}