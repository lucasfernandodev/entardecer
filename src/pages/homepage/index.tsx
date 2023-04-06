import { useEffect, useState } from "react";
import { db } from "../../database/indexDB";
import { requestMessage } from "../../types/requestMessage";
import Layout from "../../Components/Atoms/Layout";
import Painel from "../../Components/Template/Painel";
import style from "../../styles/pages/Homepage/style.module.css";
import { storage } from "../../utils/storage";

export default function Homepage() {
  const state = storage.read<boolean>("painel-visibility");
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

    chrome.runtime.onMessage.addListener(({ from, to, subject }: requestMessage) => {
      if (from === "configuration" && to === "homepage" && subject === "update") {
        location.reload();
      }
      return true;
    });
  }, []);

  return (
    <Layout large="full">
      <div className={style.container} style={bg ? { backgroundImage: `url(${bg})` } : {}}>
        {!state && <Painel />}
      </div>
    </Layout>
  );
}
