import { message } from '../../types/messages';
import { collectInfomationDom } from '../../utils/collectInfomationDom';

chrome.runtime.onMessage.addListener(function (
  request: message,
  sender,
  sendResponse
) {
  const messageHead = {
    from: 'content-script',
    subject: 'sendDomInformation',
  };

  const message: message = {
    ...messageHead,
    data: null,
    error: null,
  };

  if (request.from === 'popup' && request.subject === 'getDomInformation') {
    const page_title = document.title || 'Page title not found';
    const url = window.location.href;
    const icon = collectInfomationDom.getIcon();
    const page_name = collectInfomationDom.getPageName();

    if (url === null && typeof url === 'undefined') {
      message.error = {
        message: 'Error url is null',
      };
    }

    if (icon === null && typeof icon === 'undefined') {
      message.error = {
        message: 'Error icon is null',
      };
    }

    if (page_title === null && typeof page_title === 'undefined') {
      message.error = {
        message: 'Error page_title is null',
      };
    }

    if (page_name === null && typeof page_name === 'undefined') {
      message.error = {
        message: 'Error page_name is null',
      };
    }

    message.data = {
      page_title,
      url,
      icon,
      page_name: page_name,
    };
  }

  sendResponse(message);
});

export {}