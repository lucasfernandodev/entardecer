import { requestMessage } from '../../types/requestMessage';
import {
  getBrightness,
  getIcon,
  getTitle,
  getPageName,
  getUrl,
} from '../../utils/chrome/collectInfomationDom';

interface data {
  page_title: string;
  page_url: string;
  page_url_icon: string | null;
  page_name: string;
  isDark?: boolean | null;
}

chrome.runtime.onMessage.addListener(
  (request: requestMessage, sender, sendResponse) => {
    if (request.from === 'popup' && request.subject === 'getDomInformation') {
      // Message Response Model
      const message: requestMessage = {
        from: 'content-script',
        subject: 'sendDomInformation',
        to: 'popup',
        data: null,
        error: null,
      };

      const data: data = {
        page_title: getTitle(),
        page_url: getUrl().url,
        page_url_icon: getIcon(),
        page_name: getPageName(),
      };

      if (
        data.page_title === null ||
        data.page_url === null ||
        data.page_name === null ||
        data.page_url_icon === null
      ) {
        message.error = {
          message:
            '[content-script]: Erro não foi possivel buscar todos os dados',
        };

        sendResponse(message);
      }

      getBrightness(data.page_url_icon)
        .then((response) => {
         
          if(response?.error === null){
            message.data = {
              ...data,
              isDark: response.isDark,
            };
          }else{
            message.error = {
              message: response?.error.message || 'Message Error not encontred'
            }
          }
         
          sendResponse(message);
        })
        .catch((err) => {
          message.data = {
            ...data,
            isDark: null,
          };
          
          message.error = {
            message: err.msg
          }

          sendResponse(message);
        });
    }

    return true;
  }
);

export {};
