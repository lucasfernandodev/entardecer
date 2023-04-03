import { useEffect, useState } from "react";
import { db } from "../../database/indexDB";
import { requestMessage } from "../../types/requestMessage";
import Layout from "../../Components/Atoms/Layout";
import Painel from "../../Components/Template/Painel";
import style from "../../styles/pages/Homepage/style.module.css";

export default function Homepage() {
  const [bg, setBg] = useState<unknown | null>(null);

  useEffect(() => {
    async function getImageBackground() {
      const { bg_homepage: database } = await db();
      const isImagebackground = await database.getAll("image");
      if (isImagebackground.length !== 0) {
        setBg(isImagebackground[0].data);
      }
    }

    getImageBackground();

    chrome.runtime.onMessage.addListener(function (request: requestMessage) {
      if (
        request.from === "configuration" &&
        request.to === "homepage" &&
        request.subject === "update"
      ) {
        location.reload();
      }
      return true;
    });
  }, []);

  return (
    <Layout large="full">
      <div
        className={style.container}
        style={bg ? { backgroundImage: `url(${bg})` } : {}}
      >
        <Painel />
      </div>
    </Layout>
  );
}
