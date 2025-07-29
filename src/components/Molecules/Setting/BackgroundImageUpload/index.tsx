import { useEffect, useRef, useState } from 'react';
import S from './style.module.css';
import { PreviewImage } from './PreviewImage';
import { usePreviewStore } from '../../../../hooks/usePreviewStore';
import { useReposition } from '../../../../hooks/useReposition';
import { cn } from '../../../../utils/cn';
import { PreviewRepository } from '../../../../infra/database/repository/preview-repository';
import { Database } from '../../../../infra/database/database';
import { BackgroundImageRepository } from '../../../../infra/database/repository/background-image-repository';
import { resizeAndCropImage } from '../../../../utils/resize-and-crop';
import { DragArea } from './DragArea';
import { useAlert } from '../../../../hooks/useAlert';
import { useSetting } from '../../../../hooks/useSetting';

export type onImageUploadProps = {
  imageElement: HTMLImageElement,
  position: { x: number, y: number },
  scale: number,
}


export const BackgroundImageUpload = ({
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null)
  const [scale, setScale] = useState(1);
  const [isUpload, setIsUpload] = useState(false)
  const [blobUrl, setBlobUrl] = useState<null | string>(null)

  const { preview, setPreview, isPreview, isPreviewDbFetchFinish, initialPosition } = usePreviewStore()
  const alerts = useAlert()
  const { settings } = useSetting()

  useEffect(() => {
    return () => {
      alerts.clearAlerts()
    }
  }, [])

  
  useEffect(() => {
    if (!preview) {
      setBlobUrl(null);
      return;
    }
    const url = URL.createObjectURL(preview);
    setBlobUrl(url);
    return () => { URL.revokeObjectURL(url); }
  }, [preview])

  const { position, isReposition, controller, isGrab } = useReposition({
    previewContainer: previewRef.current,
    initialPosition: initialPosition,
    image: imageRef.current
  })

  // Define o tamanho do preview e a escala
  useEffect(() => {
    if (!previewRef.current) return;
    const preview = previewRef.current as HTMLDivElement;
    const previewHeight = preview.getBoundingClientRect().height;
    const screenWidth = document.documentElement.clientWidth;
    const screenHeight = document.documentElement.clientHeight;

    const scaleConfig = screenWidth / screenHeight
    const calcPreviewWidth = scaleConfig * previewHeight;

    preview.style.width = `${calcPreviewWidth}px`

    setScale(preview.offsetHeight / screenHeight)
  }, [])


  const uploadToDatabase = async ({ image }: { image: File | Blob }) => {
    if (!image) return;

    const poxEnd = position;
    const bgRepo = new BackgroundImageRepository(Database);
    const previewRepo = new PreviewRepository(Database);

    const cropImage = await resizeAndCropImage({ file: image, position: poxEnd, scale });

    if (!cropImage) {
      alerts.addAlert({
        variation: 'error',
        title: 'Upload Falhou!',
        description: 'Não foi possivel cortar a imagem',
      })
      return;
    }

    // Salva a imagem cortada na resolução do usuário
    await bgRepo.set({ image: cropImage })
    // Salva a imagem original
    await previewRepo.set({
      image: image,
      position: poxEnd
    })

    alerts.addAlert({
      variation: 'success',
      title: 'Imagem salva!',
      description: 'Imagem salva no banco de dados!',
    })
  }


  return (
    <div data-reposition={isReposition} ref={previewRef} className={cn(S.container, isGrab ? S.grab : '')} >
      <DragArea
        enabledDropzone={!isReposition}
        onRepositionActive={controller.startReposition}
        onRepositionCancel={controller.cancelReposition}
        onRepositionSave={async () => {
          if (preview) {
            await uploadToDatabase({ image: preview })
            controller.savePosition()
          }
        }}
        actions={{
          isPreview: isPreview,
          isPreviewCropped: settings.background.isCrop,
          isPreviewLoading: !isPreviewDbFetchFinish || isUpload,
          isReposition: isReposition
        }}
        onUploaded={async (image) => {
          setIsUpload(true)
          controller.resetPosition()
          await uploadToDatabase({ image });
          setPreview(image)
          setIsUpload(false)
        }}
      />
      <div className={S.preview_container} data-crop={settings.background.isCrop}>
        {blobUrl && !isUpload && <PreviewImage
          src={blobUrl}
          ref={imageRef}
          position={position}
          scale={scale}
        />}
      </div>
    </div>
  )
}


