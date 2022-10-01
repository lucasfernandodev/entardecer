import { requestMessage } from '../../types/requestMessage';

interface message {
  send: (messageHead: requestMessage, useTabId?: boolean) => Promise<any>;
}

export const message: message = {
  send: (messageHead, useTabId = false) => {
    return new Promise((resolve, reject) => {
   
      if(useTabId === true){
        chrome.tabs.query(
          { active: true, currentWindow: true },
          (tabs: chrome.tabs.Tab[]) => {
            const id = tabs[0].id || 0;
  
            chrome.tabs.sendMessage(
              id,
              messageHead,
              (response: requestMessage)  => {
                if (!chrome.runtime.lastError) {
                  resolve(response);
                } else {
                  reject(
                    `[Message]: Não foi possivel se comunicar com o ${messageHead.to}`
                  );
                }
              }
            );
          }
        );
      }else{
        chrome.runtime.sendMessage(messageHead, function(response) {
          if (!chrome.runtime.lastError) {
            resolve(response);
          } else {
            reject(
              `[Message]: Não foi possivel se comunicar com o ${messageHead.to}`
            );
          }
        });
      }
      
    });
  },
};
