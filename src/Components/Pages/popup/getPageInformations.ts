import { requestMessage } from "../../../types/requestMessage";
import scriptPath from '../../../Services/chrome/content-script?script'

interface data {
  page_title: string;
  page_url: string;
  page_url_icon: string | null;
  page_name: string;
  isDark?: boolean | null;
}

const messageHead: requestMessage = {
  from: 'popup',
  subject: 'getDomInformation',
};

export default function getPageInformation(callback: (data: any) => void){
  function start(codeInjection: string | boolean = 'unset'){


    chrome.tabs.query(
      { active: true, currentWindow: true },
      (tabs: chrome.tabs.Tab[]) => {
        const id = tabs[0].id || 0;

        chrome.tabs.sendMessage(id, messageHead, function (response: requestMessage) {
          if (!chrome.runtime.lastError) {
            if (response.error === null || response.data !== null) {
              const data = response.data as data;
              callback(data);

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
              start(true)
            }
          }
        });
      }
    );
  }

  start()
}