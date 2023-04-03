import { requestMessage } from "../../types/requestMessage";
import { getPageMeta } from "../../utils/chrome/getTabMeta";
import { listener } from "../../utils/chrome/listener";

interface data {
  title: string;
  url: string;
  favicon: string;
  brightness: boolean;
}

chrome.runtime.onMessage.addListener(
  listener(async (request, _, sendResponse) => {
    if (request.from === "popup" && request.subject === "getDomInformation") {
      const message: requestMessage = {
        from: "content-script",
        subject: "sendDomInformation",
        to: "popup",
        data: null,
        error: null,
      };

      const data: data = await getPageMeta();

      message.data = data;

      sendResponse(message);
    }

    return true;
  })
);

export {};
