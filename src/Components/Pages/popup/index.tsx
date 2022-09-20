import FormPopup from '../../Template/popup/FormPopup';
import Hero from '../../Template/popup/hero';
import { useEffect, useState } from 'react';
import { message } from '../../../Services/chrome/message';
import configStorage from '../../../utils/configStorage';

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

  useEffect(() => {
    configStorage()
  }, [])
  
  useEffect(() => {
    if (data !== null) {
      isDataShortcut(true);
    }
  }, [data]);

  async function getDomInformation() {

    const request = await message.send({
      from: 'popup',
      to: 'script-page',
      subject: 'getDomInformation',
    }, true);

    const response = await request;

    if (response.error === null || response.data !== null) {
      const data = response.data as data;
      setData(data);
      response.error && console.log(response.error.message);
    }else{
      console.log(response.error?.message)
    }
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
