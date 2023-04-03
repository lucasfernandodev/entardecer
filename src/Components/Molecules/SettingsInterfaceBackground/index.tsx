import { useEffect, useState } from 'react';
import useImageBackgroundLoading from '../../../hooks/useImageBackgroundLoading';
import useImageUpload from '../../../hooks/useImageUpload';
import Icon from '../../utils/icon';
import Alert from '../Alert';
import style from './style.module.css';

type Drag = React.DragEvent<HTMLDivElement>;

export default function SettingsInterfaceBackground() {
  const [loading, setLoading] = useState<boolean>(false);

  const [backgroundImage] = useImageBackgroundLoading();
  const { storeImage, onFinish, error, image, clearInput } = useImageUpload();

  useEffect(() => {
    if (onFinish) setLoading(false);
  }, [loading, onFinish]);

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLoading(true);
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
        for (let i = 0; i < e.dataTransfer.items.length; i++) {
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
        setLoading(true);
        e.preventDefault();

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

  return (
    <form className={style.form}>
      <h3>Alterar plano de fundo</h3>
      <p>Personalizar imagem de background da pagina inicial</p>

      <div
        className={style.preview}
        onDragOver={handleDrag().over}
        onDrop={handleDrag().drop}
        onDragLeave={handleDrag().leave}
        style={{ backgroundImage: `url(${image ? image : backgroundImage})` }}
        data-loading={loading}
      >
        {!onFinish && (
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

        {onFinish && (
          <button className={style.btnUpdateImage} onClick={clearInput}>
            <Icon name='update' />
          </button>
        )}
      </div>

      <p className={style.msgError}>{error[0]}</p>
      <input
        type='file'
        id={style.formInput}
        accept='image/*'
        onChange={handleOnChange}
      />
      {onFinish && (
        <Alert
          type='success'
          title='Configurações de interface'
          msg='O Background alterado com sucesso'
        />
      )}
    </form>
  );
}
