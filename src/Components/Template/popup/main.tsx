import style from './style.module.css';
import AddShortcut from '../../../Components/Layout/popup/addShortcut';
import Hero from '../../../Components/Layout/popup/hero';
import { useState } from 'react';
import { requestMessage } from '../../../types/requestMessage';

import scriptPath from '../../../Services/chrome/content-script?script'

interface data {
  page_title: string;
  page_url: string;
  page_url_icon: string | null;
  page_name: string;
  isDark?: boolean | null;
}

function Popup() {
  const [dataShortcut, isDataShortcut] = useState(false);
  const [data, setData] = useState<null | data>(null);

  const messageHead: requestMessage = {
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

        chrome.tabs.sendMessage(id, messageHead, function (response: requestMessage) {
          if (!chrome.runtime.lastError) {
            if (response.error === null || response.data !== null) {
              const data = response.data as data;
              setData(data);
              isDataShortcut(true);

              response.error && console.log(response.error.message);
            }else{
              console.log(response.error?.message)
            }
          }else{

            console.log(`[POPUP]: Erro não foi possivel acessar o script-content`);

            // try to add the content-script to the page again
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
        <>{data !== null&& <AddShortcut changeView={navigationBack} data={data} />}</>
      )}
    </main>
  );
}

export default Popup;
