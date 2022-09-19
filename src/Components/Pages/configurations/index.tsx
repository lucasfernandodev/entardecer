import Layout from '../../Atoms/Layout';
import style from './style.module.css';

export default function Configurations() {
  return (
    <Layout large='full'>
      <div className={style.container}>
        <header>
          <h1>Configurações</h1>
          <p>Todas as configurações são definidas por aqui</p>
        </header>
        <section>
          <details>
            <summary><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <path d="M3 21v-4a4 4 0 1 1 4 4h-4" />
  <path d="M21 3a16 16 0 0 0 -12.8 10.2" />
  <path d="M21 3a16 16 0 0 1 -10.2 12.8" />
  <path d="M10.6 9a9 9 0 0 1 4.4 4.4" />
</svg> Tema</summary>
            <p>
              Epcot is a theme park at Walt Disney World Resort featuring
              exciting attractions, international pavilions, award-winning
              fireworks and seasonal special events.
            </p>
          </details>
          <details>
            <summary>Background</summary>
            <p>
              Epcot is a theme park at Walt Disney World Resort featuring
              exciting attractions, international pavilions, award-winning
              fireworks and seasonal special events.
            </p>
          </details>
          <details>
            <summary>Categorias</summary>
            <p>
              Epcot is a theme park at Walt Disney World Resort featuring
              exciting attractions, international pavilions, award-winning
              fireworks and seasonal special events.
            </p>
          </details>
          <details>
            <summary>Autoload</summary>
            <p>
              Epcot is a theme park at Walt Disney World Resort featuring
              exciting attractions, international pavilions, award-winning
              fireworks and seasonal special events.
            </p>
          </details>
        </section>
      </div>
    </Layout>
  );
}
