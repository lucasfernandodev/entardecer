import { useEffect, useState } from 'react';
import Icon from '../../utils/icon';
import style from './style.module.css';

interface Alert{
  type: 'success' | 'error' | 'information' | 'warning'
  msg: string,
  title: string
}

export default function Alert({type, msg, title}: Alert){

  let timer: any = null;

  const[isVisible, setIsVisible] = useState(true);
  
  function handleAlert(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    setIsVisible(false);
  }

  useEffect(() => {
    timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div className={style.alert} style={{display: isVisible ? 'block' : 'none'}}>
      <button type="button" className={style.btn_close} onClick={handleAlert}>
        <Icon name='close'/>
      </button>
      <h3 className={style.title}>{title}</h3>
      <p className={style.msg}>{msg}</p>
    </div>
  )
}