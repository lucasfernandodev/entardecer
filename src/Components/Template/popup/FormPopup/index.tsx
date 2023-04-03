import React, { useState } from "react";
import Icon from "../../../utils/icon";
import style from "./style.module.css";
import Favicon from "../../../Atoms/favicon";
import Select from "../../../Atoms/Select";
import { isValidHttpUrl } from "../../../../utils/isValidHttpUrl";
import { useNavigate } from "react-router-dom";
import Layout from "../../../Atoms/Layout";
import { storage } from "../../../../utils/storage";
import { db } from "../../../../database/indexDB";
import { message } from "../../../../services/chrome/message";
import "../../../../styles/global.css";

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

  const categories = storage.read<string[]>("category");

  const options =
    categories !== null
      ? categories.map((item) => new Object({ value: item, label: item }))
      : [];

  function _setCategory(category: { value: string }) {
    setCategory(category.value);
  }

  async function notifyHomepage() {
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

    const errors = [];
    const form = evt.target as HTMLFormElement;

    const inputs: Record<string, null | HTMLInputElement> = {
      title: form.querySelector("#website_title"),
      url: form.querySelector("#website_url"),
      category: form.querySelector("#website_category"),
      autoload: form.querySelector("#website_autoload"),
    };

    for (let i = 0; i < Object.keys(inputs).length; i++) {
      const inputsName = Object.keys(inputs);

      const input = inputs[inputsName[i]] as HTMLInputElement;
      input.classList.remove(style.invalid);

      if (inputsName[i] === "title") {
        if (input.value === "") {
          errors.push({
            el: input,
            message: "O campo title não pode ficar em branco",
          });
        }

        if (input.value.length < 4) {
          errors.push({
            el: input,
            message: "O campo title deve ter no minimo 4 letras",
          });
        }

        if (input.value.length > 32) {
          errors.push({
            el: input,
            message: "O campo title deve ter no maximo 32 letras",
          });
        }
      }

      if (inputsName[i] === "url") {
        if (input.value === "") {
          errors.push({
            el: input,
            message: "O campo url não pode ficar em branco",
          });
        }

        if (!isValidHttpUrl(input.value)) {
          errors.push({
            el: input,
            message: "O campo url digitado é invalido",
          });
        }
      }
    }

    if (errors.length !== 0) {
      const elError = errors[0].el;

      elError.classList.add(style.invalid);
      setMsgError(errors[0].message);
      return;
    }

    const item = {
      title: inputs.title?.value as string,
      url: inputs.url?.value as string,
      category: category || "apps",
      autoload: inputs.autoload?.getAttribute("aria-pressed") as string,
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
        const save = await database.add("website", item);
        if (save === item.url) {
          notifyHomepage();
        } else {
          navigate("/error");
        }
      }
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
            getValue={(evt) => _setCategory(evt)}
          />

          <div className={style.group}>
            <label htmlFor="website_autoload">Habilitar autoload:</label>
            <button
              className={style.buttonToggle}
              aria-pressed={pressed}
              onClick={toggleButton}
              id="website_autoload"
              type="button"
            >
              <span className={style.buttonToggleText}>
                Ativar/desativar autoload
              </span>
            </button>
          </div>

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
