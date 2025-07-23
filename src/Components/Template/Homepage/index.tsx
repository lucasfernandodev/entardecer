import { useSetBackgroundImage } from '../../../hooks/useSetBackground';
import { ISetting } from '../../../types/settings';
import S from './style.module.css';

type HomepageTemplateProps = ISetting

export const HomepageTemplate = (props: HomepageTemplateProps) => {
  const { background: bg, painel, overlay } = props;

  const { background: bgImage } = useSetBackgroundImage({
    isCrop: bg.isCrop,
    isEnabled: bg.type === 'image' || false
  })

  const background = {
    backgroundColor: bg.type === 'color' ? bg.color : 'none',
    backgroundImage: bg.type === 'image' ? `url(${bgImage})` : 'none'
  }

  return (
    <main style={{ ...background }} className={S.layout}>
      {painel.visibility === 'show' && <div className={S.container_painel}></div>}
      <div
        style={{ ['--overlay-opacity' as string]: `${overlay}%` }}
        className={S.overlay}
      >
      </div>
    </main>
  )
}