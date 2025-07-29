import { useState } from 'react';
import S from './style.module.css';
import { shortcutScheme } from '../../../infra/schema/shortcut';
import { Database, } from '../../../infra/database/database';
import Icon from '../../Atoms/icon';
import { PopupSuccessTemplate } from './Success';
import { Shortcut, ShortcutRepository } from '../../../infra/database/repository/shortcut-repository';



export const PopupTemplate = ({
  title,
  url,
  icon
}: Shortcut) => {

  const [saveError, setSaveError] = useState('')
  const [titleError, setTitleError] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false)

  const cancel = () => window.close();
  const closeSaveError = () => setSaveError('')
  const resetError = () => {
    setTitleError('')
    setUrlError('')
  }

  const storeDB = async (shortcut: Shortcut) => {
    const repository = new ShortcutRepository(Database);
    const isShortcut = await repository.getByUrl(shortcut.url);
    if (isShortcut) {
      setSaveError('Esse atalho já foi salvo');
      return;
    }

    try {
      await repository.add(shortcut)
      setIsSuccess(true)
    } catch (error: any) {
      if (error?.message && typeof error.message === 'string') {
        setSaveError(error.message)
      }
      setIsSuccess(false)
    }
  }

  const onsubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    resetError()

    const data = new FormData(ev.target as HTMLFormElement);
    const isValid = shortcutScheme.safeParse(Object.fromEntries(data));

    if (!isValid.success) {
      for (const issue of isValid.error.issues) {
        const field = issue.path.join('.');
        const message = issue.message

        if (field === 'title') {
          setTitleError(message)
        }

        if (field === 'url') {
          setUrlError(message)
        }
      }
      return;
    }

    await storeDB({
      title: isValid.data.title,
      url: isValid.data.url,
      icon: icon
    })
  }

  if (isSuccess) return <PopupSuccessTemplate />

  return (
    <div className={S.dialog}>
      <div className={S.header}>
        <h3 className={S.title}>Novo atalho</h3>
      </div>
      <div className={S.preview_icon}>
        <div className={S.card_icon}>
          <img src={icon} alt={title} className={S.icon} />
        </div>
      </div>
      <form className={S.form} onSubmit={onsubmit}>
        <div data-error={!!saveError.trim()} className={S.container_error}>
          <p>{saveError}</p>
          <button type='button' onClick={closeSaveError}><Icon name="close" /></button>
        </div>
        <div className={S.wrapper}>
          <div className={S.group}>
            <label htmlFor="data-title" className={S.label}>Titulo</label>
            <input data-error={!!titleError.trim()} name="title" id="data-title" placeholder='Titulo...' type="text" className={S.input} defaultValue={title} />
            <p className={S.input_error}>{titleError}</p>
          </div>
          <div className={S.group}>
            <label htmlFor="data-url" className={S.label}>Url</label>
            <input data-error={!!urlError.trim()} name="url" id="data-url" type="url" placeholder='https://' className={S.input} defaultValue={url} />
            <p className={S.input_error}>{urlError}</p>
          </div>
        </div>
        <div className={S.group_actions}>
          <button className={[S.btn, S['btn-confirm']].join(" ")} type='submit'>Criar</button>
        </div>
      </form>
    </div>
  )
}