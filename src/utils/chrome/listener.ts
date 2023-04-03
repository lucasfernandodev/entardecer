import { requestMessage } from "../../types/requestMessage";

type TListener = (request: requestMessage, sender: any, sendResponse: any) => Promise<any>;

// This is a new wrapper to use async function to chrome onMessage;
export const listener = (listener: TListener) =>
  (request: requestMessage, sender: any, sendResponse?: any) => {
    Promise.resolve(listener(request, sender, sendResponse)).then(sendResponse);
    return true;
  };
