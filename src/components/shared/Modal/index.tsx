import { IconX } from '@tabler/icons-react';
import S from './style.module.css';
import React, { FC, useEffect, useState } from 'react';
import { shortcutScheme } from '../../../infra/schema/shortcut';
import { ShortcutRepository } from '../../../infra/database/repository/shortcut-repository';
import { Database } from '../../../infra/database/database';
import { useAlert } from '../../../hooks/useAlert';

interface ModaProps {
  isHidden: boolean;
  onClose: () => void
}
export const Modal: FC<ModaProps> = ({
  isHidden,
  onClose
}) => {

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('');

  const [error, setError] = useState('');
  const [errorKey, setErrorKey] = useState('');
  const alert = useAlert()

  const clearError = () => setError('')

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const isSafe = shortcutScheme.safeParse(Object.fromEntries(formData))
    if (!isSafe.success) {
      isSafe.error.issues.map(err => {
        setError(err.message)
        setErrorKey(err.path.join('.'))
      });
      return;
    }

    const repository = new ShortcutRepository(Database);
    try {
      await repository.add(isSafe.data)
    } catch (err: any) {
      setError(err?.message)
      setErrorKey('')
      return;
    }

    alert.addAlert({
      variation: 'success',
      description: 'Atalho criado com sucesso'
    })
    setError('')
    setTitle('')
    setUrl('')
    setErrorKey('')
  }

  useEffect(() => {
    return () => {
      alert.clearAlerts()
    }
  }, [])

  useEffect(() => {
    if (isHidden === false) {
      setError('')
      setTitle('')
      setUrl('')
      setErrorKey('')
    }
  }, [isHidden])

  return (
    <div className={S.modal} data-hidden={isHidden}>
      <div className={S.wrapper}>
        <div className={S.header}>
          <h2 className={S.title}>Novo atalho</h2>
          <button className={S.button} type="button" onClick={onClose}>
            <IconX width={18} height={18} />
          </button>
        </div>
        <form className={S.form} onSubmit={onFormSubmit}>
          {error.length > 0 && <div className={S.container_error}>
            <p className={S.error_message}>{error}</p>
            <button className={S.button} onClick={clearError}><IconX /></button>
          </div>}
          <div className={S.group}>
            <label htmlFor="title" className={S.label}>Titulo</label>
            <input value={title} onChange={e => setTitle(e.currentTarget.value)} data-error={errorKey === 'title'} name="title" type="text" id="title" className={S.input} placeholder='Titulo' />
          </div>
          <div className={S.group}>
            <label htmlFor="url" className={S.label}>Url</label>
            <input value={url} onChange={e => setUrl(e.currentTarget.value)} data-error={errorKey === 'url'} name="url" type="text" id="url" className={S.input} placeholder='https://' />
          </div>
          <div className={S.actions}>
            <button className={S.button} type="button" onClick={onClose}>Cancelar</button>
            <button className={S.button} type="submit">Criar</button>
          </div>
        </form>
      </div>
    </div>
  )
}