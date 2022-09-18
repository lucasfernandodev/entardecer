import FormPopup from '../../Template/popup/FormPopup';
import Hero from '../../Template/popup/hero';
import { useEffect, useState } from 'react';
import getPageInformation from './getPageInformations';

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
    if (data !== null) {
      isDataShortcut(true);
    }
  }, [data]);

  function swichPage() {
    getPageInformation((data) => {
      setData(data);
    });
  }

  function navigationBack() {
    isDataShortcut(!dataShortcut);
  }

  if (data !== null && dataShortcut === true) {
    return <FormPopup changeView={navigationBack} data={data} />;
  }

  return <Hero changeView={swichPage} />;
}

export default Popup;
