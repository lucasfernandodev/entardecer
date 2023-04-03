import FormPopup from "../../Components/Template/popup/FormPopup";
import Hero from "../../Components/Template/popup/hero";
import { useEffect, useState } from "react";
import { setup } from "../../database/localstorage";
import { message } from "../../services/chrome/message";
import { storage } from "../../utils/storage";

interface data {
  title: string;
  url: string;
  favicon: string;
  brightness: boolean;
}

function Popup() {
  const [dataShortcut, isDataShortcut] = useState(false);
  const [data, setData] = useState<null | data>(null);

  useEffect(() => {
    if (!storage.read("theme")) {
      setup();
    }
  }, []);

  useEffect(() => {
    if (data !== null) {
      isDataShortcut(true);
    }
  }, [data]);

  async function getDomInformation() {
    const meta = await message.send(
      {
        from: "popup",
        to: "script-page",
        subject: "getDomInformation",
      },
      true
    );

    meta.data && setData(meta.data);
  }

  function navigationBack() {
    isDataShortcut(!dataShortcut);
  }

  if (data !== null && dataShortcut === true) {
    return <FormPopup changeView={navigationBack} data={data} />;
  }

  return <Hero changeView={getDomInformation} />;
}

export default Popup;
