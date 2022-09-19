import Layout from '../../Atoms/Layout';
import Painel from '../../Organisms/Painel';
import style from './style.module.css';

export default function Homepage(){
  return (
    <Layout large='full'>
      <div className={style.container}>
        <Painel />
      </div>
    </Layout>
  )
}