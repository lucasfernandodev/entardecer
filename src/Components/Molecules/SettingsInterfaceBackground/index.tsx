import { useEffect, useState } from 'react';
import { db } from '../../../Services/chrome/database';
import getBase64Image from '../../../utils/getBase64Image';
import Icon from '../../utils/icon';
import Alert from '../Alert';
import style from './style.module.css';

export default function SettingsInterfaceBackground() {
  const [error, setError] = useState<string | null>(null);
  const [isUploadLoading, setIsUploadLoading] = useState(false);
  const [image, setImage] = useState<any | String>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      const { bg_homepage: database } = await db();
      const isImage = await database.getAll('image');
      if(isImage.length > 0) {
        // const image = URL.createObjectURL(isImage[0].data)
        setImage(isImage[0].data);
      }
      setIsLoading(false)
    })();
  }, [])

  function blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  async function storeImage(file: any) {
    console.log('store image initilized');
    const imageInBase64 = await blobToBase64(file)
    try {
      if (file) {
        const { bg_homepage: database } = await db();

        const isImage = await database.getAll('image');


        if (isImage.length === 0) {
          await database.add('image', { data: imageInBase64, id: 'bg_homepage'});
        } else {
          await database.put('image', { data: imageInBase64, id: 'bg_homepage'});
        }
        
        setIsUploadLoading(false)
        setIsUploaded(true)
        setImage(URL.createObjectURL(file));
          console.log('store image end');
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFile(file: any) {
    const fileSize = file.size / 1024;

    if (file) {
      if (fileSize > 3072) {
        setError('- São aceitas somentes imagem de tamanho maximo 3MB');
        setImage(null);
      } else {
        storeImage(file);
        setError(null);
      }
    }
  }

  function preverImage(evt: React.ChangeEvent<HTMLInputElement>) {
    setIsUploadLoading(true)
    const input = evt.target as any;
    const file = input.files[0];
    handleFile(file);
  }

  function dropHandler(ev: React.DragEvent<HTMLDivElement>) {
    // Impedir o comportamento padrão (impedir que o arquivo seja aberto)
    setIsUploadLoading(true)
    ev.preventDefault();
    const el = ev.target as HTMLElement;

    el.classList.remove(style.dragOver);

    if (ev.dataTransfer.items) {
      // Use a interface DataTransferItemList para acessar o (s) arquivo (s)
      for (var i = 0; i < ev.dataTransfer.items.length; i++) {
        // Se os itens soltos não forem arquivos, rejeite-os
        if (ev.dataTransfer.items[i].kind === 'file') {
          let file = ev.dataTransfer.items[i].getAsFile() as any;
          handleFile(file);
        }
      }
    } else {
      // Use a interface DataTransfer para acessar o (s) arquivo (s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        const file = ev.dataTransfer.files[i];
        handleFile(file);
      }
    }
  }

  function onDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const el = e.target as HTMLElement;

    el.classList.add(style.dragOver);
  }

  function onDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    const el = e.target as HTMLElement;

    el.classList.remove(style.dragOver);
  }

  return (
    <form className={style.uploadPhoto}>
      <h3>Alterar plano de fundo</h3>
      <p>Personalizar imagem de background da pagina inicial</p>

      <div
        className={style.preview}
        onDrop={dropHandler}
        onDragLeave={onDragLeave}
        style={{ backgroundImage: `url(${image})` }}
        data-loading-image={isUploadLoading || isLoading && !isUploaded ? true : false}
      >
        {!isUploaded && (
          <div className={style.placeholder}>
           <div className={style.content}>
           <Icon name='image' className={style.icon} />
            <p>
              Solte sua imagem aqui, ou{' '}
              <label htmlFor={style.inputImage}>selecionar imagem</label>
            </p>
           </div>
          </div>
        )}
      </div>

      <p className={style.msgError}>{error}</p>
      <input
        type='file'
        id={style.inputImage}
        accept='image/*'
        onChange={preverImage}
      />
      {isUploaded && <Alert 
          type='success' 
          title='Configurações de interface' 
          msg='O Background alterado com sucesso'
        />}
    </form>
  );
}
