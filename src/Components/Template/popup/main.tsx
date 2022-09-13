import style from './style.module.css';
import AddShortcut from '../../../Components/Layout/popup/addShortcut';
import Hero from '../../../Components/Layout/popup/hero';
import { useState } from 'react';
import { message } from '../../../types/messages';

import scriptPath from '../../../Services/chrome/content-script?script'

interface data {
  page_title: string;
  url: string;
  icon: string;
  page_name: string;
}

function Popup() {
  const [dataShortcut, isDataShortcut] = useState(false);
  const [data, setData] = useState<null | data>(null);

  const messageHead: message = {
    from: 'popup',
    subject: 'getDomInformation',
  };

  function navigationBack() {
    isDataShortcut(!dataShortcut);
  }

  function addShortcut(codeInjection: boolean | string = 'unset') {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        const id = tabs[0].id || 0;

        chrome.tabs.sendMessage(id, messageHead, function (response: message) {
          if (!chrome.runtime.lastError) {
            if (
              typeof response.error !== 'undefined' &&
              response.error === null
            ) {
              const data = response.data as data;
              setData(data);
              isDataShortcut(true);
            } else {
              console.log('erro', response);
              console.log('Error ao busar informações do DOM');
            }
          }else{
            console.log(chrome.runtime.lastError)
            console.log(`[ERRO]: Mensagem com informações do dom não recebida :)`);

            if(codeInjection === 'unset'){
       
              chrome.scripting.executeScript({
                target: { tabId: id },
                files: [scriptPath]
              });
              addShortcut(true)
            }
          }
        });
      }
    );
  }

  return (
    <main className={style.main}>
      {dataShortcut === false ? (
        <Hero changeView={() => addShortcut('unset')} />
      ) : (
        <AddShortcut changeView={navigationBack} data={data ? data : null} />
      )}
    </main>
  );
}

export default Popup;
