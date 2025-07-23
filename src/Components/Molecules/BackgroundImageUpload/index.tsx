import { useEffect, useRef, useState } from 'react';
import Icon from '../../utils/icon';
import S from './style.module.css';
import { PreviewImage } from './PreviewImage';
import { usePreviewStore } from '../../../hooks/usePreviewStore';
import { useDropzone } from '../../../hooks/useDropzone';
import { useReposition } from '../../../hooks/useReposition';
import { cn } from '../../../utils/cn';
import { imageUploadSchema } from '../../../schema/imageUpload';
import { PreviewRepository } from '../../../database/repository/preview-repository';
import { Database } from '../../../database/database';
import { BackgroundImageRepository } from '../../../database/repository/background-image-repository';
import { resizeAndCropImage } from '../../../utils/resize-and-crop';
import { minifyImage } from '../../../utils/minify-image';

export type onImageUploadProps = {
  imageElement: HTMLImageElement,
  position: { x: number, y: number },
  scale: number,
}

interface BackgroundUploadProps {
  isCrop: boolean;
}

const ActionsDefault = () => {
  return (
    <>
      <Icon name="image" />
      <p>Solte sua imagem aqui ou <label htmlFor="bg">Selecionar imagem</label></p>
    </>
  )
}

const ActionsUploaded = ({ onResize, isCrop = true }: { onResize: () => void, isCrop: boolean }) => {
  return (
    <div className={S.actions}>
      {isCrop === true ? <button onClick={onResize}>Reposicionar</button> : ''}
      <label htmlFor="bg">Mudar imagem</label>
    </div>
  )
}

const ActionsReposition = (
  { onCancel, onSaveReposition }: { onCancel: () => void, onSaveReposition: () => void }
) => {
  return (
    <div className={S.actions}>
      <button onClick={onCancel}>Cancelar</button>
      <button onClick={onSaveReposition}>Salvar</button>
    </div>
  )
}


export const BackgroundImageUpload = ({
  isCrop = true
}: BackgroundUploadProps) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null)
  const [scale, setScale] = useState(1);



  const {
    position,
    isReposition,
    updatePosition,
    resetPosition,
    savePosition,
    cancelReposition,
    activeReposition,
    isGrab
  } = useReposition({ image: imageRef.current, previewContainer: previewRef.current })

  const { preview, setPreview, isPreview, isLoading } = usePreviewStore({
    position: position,
    onPositionUpdate: updatePosition
  })


  const handleFiles = async (files: FileList | null) => {

    if (!files || files?.length < 1) return;
    const file = files[0];

    const validateImage = imageUploadSchema.safeParse({ image: file });
    if (!validateImage.success) {
      const messages = validateImage.error.issues.flat().map(e => e.message);
      alert(messages[0]);
      return;
    }

    setPreview('')

    const repository = new PreviewRepository(Database);
    const imageAvif = await minifyImage(validateImage.data.image);
    if (!imageAvif) {
      throw new Error('Não foi possivel converter sua imagem para base64')
    }

    const endPosition = position;
    await repository.set({ image: imageAvif, position: endPosition })
    await saveImages(validateImage.data.image)

    resetPosition()
    setPreview(URL.createObjectURL(imageAvif))
  }

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

    if (scaleConfig !== scale) {
      setScale(preview.offsetHeight / screenHeight)
    }

  }, [scale])

  console.log("updating...")

  const {
    isDragActive,
    dragEnter,
    dragLeave,
    dragOver,
    dragDrop
  } = useDropzone({
    isEnabled: !isReposition,
    onDrop: handleFiles,
  })


  const saveImages = async (file?: File | HTMLImageElement) => {
    const endPosition = position;

    if (!file) {
      return;
    }

    const croppedImage = await resizeAndCropImage({
      file: file,
      position: endPosition,
      scale
    });

    if (!croppedImage) {
      throw new Error('Não foi possivel cortar a imagem')
    }

    const backgroundImageRepo = new BackgroundImageRepository(Database);
    const imageAvif = await minifyImage(croppedImage);
    await backgroundImageRepo.set({ image: URL.createObjectURL(imageAvif) })
    alert('image saved')
  }

  const saveReposition = async () => {
    if (imageRef.current) {
      await saveImages(imageRef.current)
      savePosition()
    }
  }

  return (
    <div
      data-reposition={!!isReposition}
      ref={previewRef}
      className={cn(S.container, isGrab ? S.grab : '')}
    >
      <div
        className={cn(S.upload_area, isDragActive ? S.hover : '')}
        onDragEnter={dragEnter}
        onDrop={dragDrop}
        onDragOver={dragOver}
        onDragLeave={dragLeave}
      >
        <div data-image={!!isPreview} className={S.group}>
          {!isLoading && (
            <>
              {isPreview && !isReposition && <ActionsUploaded isCrop={isCrop} onResize={activeReposition} />}
              {isPreview && isReposition && (
                <ActionsReposition
                  onCancel={cancelReposition}
                  onSaveReposition={saveReposition}
                />
              )}
              {!isPreview && <ActionsDefault />}
            </>
          )}
          <input
            onChange={e => handleFiles(e.target.files)}
            type="file"
            name="background"
            id="bg" hidden
          />
        </div>
      </div>
      <div className={S.preview_container} data-crop={isCrop}>
        {preview && <PreviewImage
          image={preview}
          ref={imageRef}
          position={position}
          scale={scale}
        />}
      </div>
    </div>
  )
}
