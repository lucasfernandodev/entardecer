import Icon from '../../utils/icon';
import style from './style.module.css';

export default function PainelFooter(){
  return (<footer className={style.footer}>
    <button className={style.buttonNotify}>
      <Icon name='bell' />
    </button>
    <hr />
  </footer>)
}