import S from './style.module.css';
import { useSettingBackgroundStore } from '../../../../hooks/useSettingBackgroundStore';
import { BackgroundSetting } from '../../../../types/settings';
import { useEffect, useState } from 'react';
import { useFetch } from '../../../../hooks/useFetch';
import { ToggleCropMode } from '../../../Molecules/Setting/ToggleCropMode';
import { BackgroundPreferenceSelector } from '../../../Molecules/Setting/BackgroundPreferenceSelector';
import { BackgroundImageUpload } from '../../../Molecules/Setting/BackgroundImageUpload';
import { BackgroundColorSelector } from '../../../Molecules/Setting/BackgroundColorSelector';



export const SettingBackground = () => {

  return (
    <section className={S.layout}>
      <header className={S.header}>
        <h2 className={S.title}>Plano de fundo</h2>
      </header>


      <section id={S.section_preference}>
        <header className={S.header}>
          <h3 className={S.title}>Preferência de plano de fundo</h3>
          <p className={S.subtitle}>
            Escolha se deseja exibir uma imagem ou uma cor para plano de fundo
          </p>
        </header>
        <div className={S.group}>
          <BackgroundPreferenceSelector />
        </div>
      </section>


      <section id={S.section_image}>
        <header className={S.header}>
          <h3 className={S.title}>Imagem</h3>
          <p className={S.subtitle}>
            Selecione uma imagem para usar como plano de fundo da pagina inicial
          </p>
        </header>
        <div className={S.group}>
          <BackgroundImageUpload />
        </div>
      </section>

      <section id={S.section_cropImage}>
        <header className={S.header}>
          <h3 className={S.title}>Cortar imagem</h3>
          <p className={S.subtitle}>
            Escolha se quer usar a imagem original ou cortada para o formato da sua tela
          </p>
        </header>
        <div className={S.group}>
          <ToggleCropMode />
        </div>
      </section>


      <section id={S.section_color}>
        <header className={S.header}>
          <h3 className={S.title}>Cor</h3>
          <p className={S.subtitle}>
            Escolha uma cor para usar como plano de fundo
          </p>
        </header>
        <div className={S.group}>
          <BackgroundColorSelector />
        </div>
      </section>
    </section>
  )
}