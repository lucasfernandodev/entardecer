import style from './style.module.css';

interface Layout{
  children: React.ReactNode,
  large?: 'full' | 'md'
}
export default function Layout({children, large = 'md'}: Layout){
  return (
    <main className={style.main} data-size={large}>
      {children}
    </main>
  )
}