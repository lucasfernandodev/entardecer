import { requestMessage } from "../../types/requestMessage";

type TListener = (request: requestMessage, sender: any, sendResponse: any) => Promise<any>;

type sender = chrome.runtime.MessageSender;

type Listener = (listener: TListener) => (request: requestMessage, sender: sender, sendResponse?: (response?: any) => void) => boolean

// This is a new wrapper to use async function to chrome onMessage;
export const listener: Listener = (listener) => (request, sender, sendResponse) => {
  Promise.resolve(listener(request, sender, sendResponse)).then(sendResponse);
  return true;
};
