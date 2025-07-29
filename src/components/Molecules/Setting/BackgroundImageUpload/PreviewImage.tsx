import { forwardRef, useEffect, useRef, useState } from 'react';
import S from './style.module.css';

interface Props {
  src?: string;
  position: { x: number, y: number }
  scale: number;
}

const PreviewImage = forwardRef<HTMLImageElement, Props>(({
  src: imageSource, position, scale,
}, forwardedRef) => {

  const internalRef = useRef<HTMLImageElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 2) função que “encaminha” o elemento pra ambas as refs
  function setRefs(el: HTMLImageElement | null) {
    internalRef.current = el;

    if (typeof forwardedRef === 'function') {
      forwardedRef(el);
    } else if (forwardedRef) {
      (forwardedRef as React.MutableRefObject<HTMLImageElement | null>).current = el;
    }
  }


  useEffect(() => {
    const imageElement = internalRef.current as unknown as HTMLImageElement;
    if (!imageElement || !imageSource) return;

    const handleLoad = async () => {

      const naturalWidth = imageElement.naturalWidth;
      const naturalHeight = imageElement.naturalHeight;

      const screenWidth = document.documentElement.clientWidth;
      const screenHeight = document.documentElement.clientHeight;

      const radioImage = naturalWidth / naturalHeight
      const screenRadio = screenWidth / screenHeight

      // Escala original (baseada na altura da janela, por exemplo)
      let width = naturalWidth;
      let height = naturalHeight;

      if (naturalHeight < screenHeight || naturalWidth < screenWidth) {
        if (radioImage > screenRadio) {
          height = screenHeight;
          width = height * radioImage
        } else {
          width = screenWidth;
          height = screenWidth / radioImage
        }
      }


      imageElement.style.width = `${width * scale}px`;
      imageElement.style.height = `${height * scale}px`;


      setIsLoading(false)
    };

    imageElement.addEventListener('load', handleLoad);
    return () => {
      imageElement.removeEventListener('load', handleLoad)
    }
  }, [imageSource]);


  if (!imageSource) return null;

  return (
    <img
      data-loading={isLoading}
      ref={setRefs}
      src={imageSource}
      style={{
        '--x': `${position.x}px`,
        '--y': `${position.y}px`,
      } as any}
      alt="Pré-visualização do plano de fundo da tela inicial" className={S.preview}
    />
  )
})

PreviewImage.displayName = 'PreviewImage'

export { PreviewImage }