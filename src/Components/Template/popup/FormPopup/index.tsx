import React, { useState } from "react";
import Icon from "../../../utils/icon";
import style from "./style.module.css";
import Favicon from "../../../Atoms/favicon";
import Select from "../../../Atoms/Select";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Atoms/Layout";
import { storage } from "../../../../utils/storage";
import { db } from "../../../../database/indexDB";
import { message } from "../../../../services/chrome/message";
import "../../../../styles/global.css";
import { InputValidade } from "./validade";

interface data {
  title: string;
  url: string;
  favicon: string;
  brightness: boolean;
}

interface FormPopupTemplateProps {
  changeView: () => void;
  data: data;
}

function FormPopupTemplate({ changeView, data }: FormPopupTemplateProps) {
  const navigate = useNavigate();
  const [pressed, isPressed] = useState(false);
  const [msgError, setMsgError] = useState<string>("");
  const [category, setCategory] = useState("apps");

  function toggleButton() {
    isPressed(!pressed);
  }

  const categories = storage.read<string[]>("category") || [];
  const options = categories.map(
    (item) => new Object({ value: item, label: item })
  );

  function updateCategory(category: { value: string }) {
    setCategory(category.value);
  }

  async function updateHome() {
    try {
      await message.send({ from: "popup", to: "homepage", subject: "update" });
      navigate("/success");
    } catch (err) {
      navigate("/success");
    }
  }

  async function handlerSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setMsgError("");

    const form = evt.target as HTMLFormElement;

    const inputs: Record<string, null | HTMLInputElement> = {
      title: form.querySelector("#website_title"),
      url: form.querySelector("#website_url"),
      category: form.querySelector("#website_category"),
    };

    // Valida os inputs
    const errors = InputValidade(inputs);

    if (errors.length === 0) {
      const { title, url } = inputs as Record<string, HTMLInputElement>;

      const item = {
        title: title.value,
        url: url.value,
        category: category || "all",
        darkType: data.brightness,
        url_favicon: data.favicon,
      };

      const { shortcuts: database } = await db();

      if (database) {
        const isItem = await database.getAllFromIndex(
          "website",
          "by-url",
          item.url
        );

        if (isItem.length === 0) {
          const shortcut = await database.add("website", item);

          if (shortcut !== item.url) {
            navigate("/error");
          }

          updateHome();
        }
      }
    } else {
      // Show messages error of validation
      errors[0].el.classList.add(style.invalid);
      setMsgError(errors[0].message);
    }
  }

  return (
    <Layout>
      <form onSubmit={handlerSubmit} id={style.form}>
        <header className={style.header}>
          <button onClick={changeView}>
            <Icon name="arrow_left" />
          </button>
          <h1>Novo atalho</h1>
        </header>
        <section className={style.sectionForm}>
          <div className={style.group}>
            <div className={style.icon}>
              {data.favicon && (
                <Favicon
                  src={data.favicon}
                  alt={data.title}
                  brightness={data.brightness === true ? 1 : 0}
                />
              )}
            </div>
            <input
              type="text"
              className={style.siteName}
              placeholder="Website name..."
              defaultValue={data?.title}
              id="website_title"
            />
          </div>
          <input
            type="text"
            className={style.siteUrl}
            placeholder="Website url..."
            defaultValue={data?.url}
            id="website_url"
          />

          <Select
            Options={options}
            className={style.select}
            id="website_category"
            getValue={(evt) => updateCategory(evt)}
          />
          <span className={style.msgError}>{msgError}</span>
          <button className={style.formButtonSave} type="submit">
            Salvar
          </button>
        </section>
      </form>
    </Layout>
  );
}

export default FormPopupTemplate;
