import S from './style.module.css';

export const PopupSuccessTemplate = () => {
  return (
    <div className={S.dialog}>
      <div className={S.image}>
        <img src="/images/checked.svg" alt="Imagem com uma ilustração de check" />
      </div>
      <h1 className={S.title}>Atalho salvo</h1>
    </div>
  )
}