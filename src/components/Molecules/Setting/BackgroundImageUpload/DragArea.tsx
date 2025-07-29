import S from './style.module.css';
import { FC, useEffect } from "react"
import { useDropzone } from "../../../../hooks/useDropzone"
import { cn } from "../../../../utils/cn"
import Icon from '../../../Atoms/icon';
import { imageUploadSchema } from '../../../../infra/schema/imageUpload';
import { useAlert } from '../../../../hooks/useAlert';


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

const ActionsReposition = ({
  onCancel,
  onSaveReposition
}: {
  onCancel: () => void,
  onSaveReposition: () => void
}) => {

  const onSave = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const btn = ev.currentTarget;
    btn.innerText = 'loading'
    onSaveReposition()
  }

  return (
    <div className={S.actions}>
      <button onClick={onCancel}>Cancelar</button>
      <button onClick={onSave}>Salvar</button>
    </div>
  )
}


interface DragAreaProps {
  onUploaded: (file: File) => void;
  enabledDropzone: boolean,
  actions: {
    isPreviewLoading: boolean;
    isPreview: boolean;
    isPreviewCropped: boolean;
    isReposition: boolean;
  },
  onRepositionSave: () => void;
  onRepositionActive: () => void;
  onRepositionCancel: () => void
}

export const DragArea: FC<DragAreaProps> = ({
  onUploaded,
  enabledDropzone,
  actions,
  onRepositionSave,
  onRepositionActive,
  onRepositionCancel
}) => {
  const alerts = useAlert()

  useEffect(() => {
    return () => {
      alerts.clearAlerts()
    }
  }, [])

  const parseFiles = (files?: FileList | null) => {
    if (!files || files?.length < 1) return;
    const file = files[0];

    if (!file || !(file instanceof File)) return

    const validateImage = imageUploadSchema.safeParse({ image: file });
    if (!validateImage.success) {
      const messages = validateImage.error.issues.flat().map(e => e.message);
      alerts.addAlert({
        variation: 'error',
        title: 'Upload falhou!',
        description: messages[0]
      });
      return;
    }

    if (validateImage.data.image) {
      onUploaded(validateImage.data.image)
    }
  }

  const { isDragActive, getRootEvents } = useDropzone({
    isEnabled: enabledDropzone,
    onDrop: parseFiles,
  })

  const dragHoverClass = isDragActive ? S.hover : ''

  const Actions = () => {
    if (actions.isPreviewLoading) return 'loading...';

    if (actions.isPreview && actions.isReposition) {
      return <ActionsReposition
        onCancel={onRepositionCancel}
        onSaveReposition={onRepositionSave}
      />
    }

    if (actions.isPreview && !actions.isReposition) {
      return <ActionsUploaded
        isCrop={actions.isPreviewCropped}
        onResize={onRepositionActive}
      />;
    }

    return <ActionsDefault />
  }

  return (
    <div className={cn(S.upload_area, dragHoverClass)} {...getRootEvents()}>
      <div data-image={!!actions.isPreview} className={S.group}>
        <Actions />
        <input
          onChange={e => parseFiles(e.target.files)}
          type="file"
          name="background"
          id="bg" hidden
        />
      </div>
    </div>
  )
}