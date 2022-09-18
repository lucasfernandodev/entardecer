import Layout from "../../../Atoms/Layout"
import style from './style.module.css';

export function FormSuccess(){


  const image = chrome.runtime.getURL('images/icons/success.svg');

  setTimeout(() => {
    window.close()
  }, 2000)

  return (
    <Layout>
       <div className={style.container}>
      <img src={image} alt="ilustration error"/>
      <p>Seu atalho foi salvo com sucesso</p>
      </div>
    </Layout>
  )
}

export function FormError(){

  const image = chrome.runtime.getURL('images/error.svg');

  setTimeout(() => {
    window.close()
  }, 2000)

  return (
    <Layout>
      <div className={style.container}>
      <img src={image} alt="ilustration error"/>
      <p>Erro, não foi possivel adicionar site aos atalhos.</p>
      </div>
    </Layout>
  )
}