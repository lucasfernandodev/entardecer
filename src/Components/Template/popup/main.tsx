import style from './style.module.css';
import AddShortcut from '../../../Components/Layout/popup/addShortcut';
import Hero from '../../../Components/Layout/popup/hero';
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

  function addShortcut() {
    getPageInformation((data) => {
      setData(data);
    });
  }

  function navigationBack() {
    isDataShortcut(!dataShortcut);
  }

  return (
    <main className={style.main}>
      {dataShortcut === false ? (
        <Hero changeView={() => addShortcut()} />
      ) : (
        <>
          {data !== null && (
            <AddShortcut changeView={navigationBack} data={data} />
          )}
        </>
      )}
    </main>
  );
}

export default Popup;
