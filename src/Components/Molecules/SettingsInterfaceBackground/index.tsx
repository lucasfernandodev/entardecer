import { useEffect, useState } from 'react';
import useImageBackgroundLoading from '../../../hooks/useImageBackgroundLoading';
import { message } from '../../../services/chrome/message';
import { db } from '../../../storage/database';
import blobToBase64 from '../../../utils/blobToBase64';
import crop from '../../../utils/image/crop';
import Icon from '../../utils/icon';
import Alert from '../Alert';
import style from './style.module.css';

interface imagecroped {
  data?: Blob;
  crop: Boolean;
}

type Drag = React.DragEvent<HTMLDivElement>;

export default function SettingsInterfaceBackground() {
  const [image, setImage] = useState<any | String>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [backgroundImage] = useImageBackgroundLoading();


  async function storeImage(file: File) {
    setError('');
    setIsUploaded(false);

    async function uploadImage(image64: string) {
      const { bg_homepage: database } = await db();

      const isImage = await database.getAll('image');

      if (isImage.length === 0) {
        await database.add('image', {
          data: image64,
          id: 'bg_homepage',
        });
      } else {
        await database.put('image', {
          data: image64,
          id: 'bg_homepage',
        });
      }
    }

    const fileSize = file.size / 1024;
    const windowSize = { width: window.innerWidth, height: window.innerHeight };
    const imageTypesAccepts: string[] = [
      'image/png',
      'image/jpg',
      'image/jpeg',
      'image/webp',
      'image/svg+xml',
    ];

    if (fileSize > 3072) {
      setError('- São aceitas somentes imagem de tamanho maximo 3MB');
      setImage(null);
      setIsUploadLoading(false);
      setIsLoading(false);
      return;
    }

    if (!imageTypesAccepts.includes(file.type)) {
      setError('- Arquivo de imagem invalido');
      setImage(null);
      setIsUploadLoading(false);
      setIsLoading(false);
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    const isCropImage = (await crop(imageUrl, windowSize)) as imagecroped;

    const image64 = isCropImage.data
      ? isCropImage.data
      : await blobToBase64(file);

    try {
      await uploadImage(image64 as string);
      setIsUploadLoading(false);
      setIsUploaded(true);
      setImage(imageUrl);

      await message.send({
        from: 'configuration',
        to: 'homepage',
        subject: 'update',
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setIsUploadLoading(true);
    const input = evt.target as any;
    const file = input.files[0];
    storeImage(file);
    input.value = '';
  }

  function handleDrag() {
    function processImage(e: Drag) {
      let file;

      if (e.dataTransfer.items) {
        // Use a interface DataTransferItemList para acessar o (s) arquivo (s)
        for (var i = 0; i < e.dataTransfer.items.length; i++) {
          // Se os itens soltos não forem arquivos, rejeite-os
          if (e.dataTransfer.items[i].kind === 'file') {
            file = e.dataTransfer.items[i].getAsFile() as any;
          }
        }
      } else {
        // Use a interface DataTransfer para acessar o (s) arquivo (s)
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          file = e.dataTransfer.files[i];
        }
      }

      storeImage(file);
    }

    return {
      over: (e: Drag) => {
        e.preventDefault();
        e.stopPropagation();
        const el = e.target as HTMLElement;

        el.classList.add(style.dragOver);
      },
      drop: (e: Drag) => {
        e.preventDefault();
        setIsUploadLoading(true);

        const el = e.target as HTMLElement;

        el.classList.remove(style.dragOver);
        processImage(e);
      },
      leave: (e: Drag) => {
        e.preventDefault();
        e.stopPropagation();
        const el = e.target as HTMLElement;

        el.classList.remove(style.dragOver);
      },
    };
  }

  function resetUpload(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    setImage(null);
    setIsUploaded(false);
    setIsUploadLoading(false);
    setIsLoading(false);
    setError('');
  }

  return (
    <form className={style.form}>
      <h3>Alterar plano de fundo</h3>
      <p>Personalizar imagem de background da pagina inicial</p>

      <div
        className={style.preview}
        onDragOver={handleDrag().over}
        onDrop={handleDrag().drop}
        onDragLeave={handleDrag().leave}
        style={{ backgroundImage: `url(${backgroundImage})` }}
        data-loading={
          isUploadLoading || (isLoading && !isUploaded) ? true : false
        }
      >
        {!isUploaded && (
          <div className={style.placeholder}>
            <div className={style.content}>
              <Icon name='image' className={style.icon} />
              <p>
                <span>Solte sua imagem aqui, ou</span>
                <label htmlFor={style.formInput}>selecionar imagem</label>
              </p>
            </div>
          </div>
        )}

        {isUploaded && (
          <button className={style.btnUpdateImage} onClick={resetUpload}>
            <Icon name='update' />
          </button>
        )}
      </div>

      <p className={style.msgError}>{error}</p>
      <input
        type='file'
        id={style.formInput}
        accept='image/*'
        onChange={handleOnChange}
      />
      {isUploaded && (
        <Alert
          type='success'
          title='Configurações de interface'
          msg='O Background alterado com sucesso'
        />
      )}
    </form>
  );
}
