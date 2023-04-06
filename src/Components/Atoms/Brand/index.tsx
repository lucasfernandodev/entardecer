import style from "./style.module.css";

const Brand = () => {
  return (
    <div className={style.brand}>
      <img src="/images/logo.svg" alt="Logo entardecer" />
      <h1>Entardecer</h1>
    </div>
  );
};
export { Brand };
