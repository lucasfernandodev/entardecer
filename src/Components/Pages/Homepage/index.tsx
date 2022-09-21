import Layout from '../../Atoms/Layout';
import Painel from '../../Template/Painel';
import style from './style.module.css';

export default function Homepage(){
  return (
    <Layout large='full'>
      <div className={style.container} style={{backgroundImage: `url(${chrome.runtime.getURL("images/bg.jpeg")})`}}>
        <Painel />
      </div>
    </Layout>
  )
}