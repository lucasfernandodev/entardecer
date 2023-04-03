import { requestMessage } from '../../types/requestMessage';

interface message {
  send: (messageHead: requestMessage, useTabId?: boolean) => Promise<requestMessage>;
}

type tabs = chrome.tabs.Tab[];

export const message: message = {
  send: (messageHead, useTabId = false) => {

    return new Promise((resolve, reject) => {
      const option = { active: true, currentWindow: true };

      if (useTabId === true) {
        chrome.tabs.query(option, (tabs: tabs) => {
          const id = tabs[0].id || 0;

          chrome.tabs.sendMessage(id, messageHead, (response: requestMessage) => {
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
      } else {
        chrome.runtime.sendMessage(messageHead, function (response) {
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
