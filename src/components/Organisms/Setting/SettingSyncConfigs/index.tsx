import { useEffect } from 'react';
import { useAlert } from '../../../../hooks/useAlert';
import { useSetting } from '../../../../hooks/useSetting';
import { importDataScheme } from '../../../../infra/schema/import-data';
import { readFileAsText } from '../../../../utils/readFileAsText';
import S from './style.module.css';



export const SettingSyncConfigs = () => {

  const { importData, exportData } = useSetting()
  const { addAlert, clearAlerts } = useAlert()

  useEffect(() => {
    return () => {
      clearAlerts()
    }
  }, [])

  const onUpload = async (data?: FileList | null) => {
    if (data && data[0]) {
      let json = null;
      try {
        const file = data[0]
        const fileText = await readFileAsText(file)
        json = JSON.parse(fileText);
      } catch (error) {
        addAlert({
          variation: 'error',
          title: 'Importação falhou',
          description: 'Tipo do arquivo invalido'
        })
        return;
      }

      const isSafe = importDataScheme.safeParse(json);

      if (!isSafe.success) {
        addAlert({
          variation: 'error',
          title: 'Importação falhou',
          description: isSafe.error.issues[0].message
        })
        return;
      }

      const { success, message } = await importData({
        ...isSafe.data
      })
      if (success) {
        addAlert({
          variation: 'success',
          description: 'Atalhos e configurações importados com sucesso'
        })
      } else {
        addAlert({
          variation: 'error',
          title: 'Importação falhou',
          description: message ?? undefined
        })
      }
    }
  }

  const onExportHandle = async () => {
    const { data, message, success } = await exportData()
    if (!success || !data) {
      addAlert({
        variation: 'error',
        title: 'Exportação falhou',
        description: message ?? undefined
      })
      return;
    }

    const encodeFile = encodeURIComponent(JSON.stringify(data))
    const file = "data:text/json;charset=utf-8," + encodeFile;
    const link = document.createElement('a');
    link.setAttribute('href', file);
    link.setAttribute('download', "entardecer-configs.json")
    link.click()
  }

  return (
    <section className={S.layout}>
      <header className={S.header}>
        <h2 className={S.title}>Import/Export</h2>
      </header>

      <section id={S.section_export}>
        <header className={S.header}>
          <h3 className={S.title}>Exportar Configurações</h3>
          <p className={S.subtitle}>
            Salve suas configurações em um arquivo local para reutilizá-las depois
          </p>
        </header>
        <div className={S.group}>
          <div className={S.container}>
            <button onClick={onExportHandle} className={S.button}>Exportar</button>
          </div>
        </div>
      </section>

      <section id={S.section_import}>
        <header className={S.header}>
          <h3 className={S.title}>Importar Configurações</h3>
          <p className={S.subtitle}>
            Carregue um arquivo de configurações previamente exportado
          </p>
        </header>
        <div className={S.group}>
          <div className={S.container}>
            <label htmlFor={'import-input'} className={S.button}>Importar</label>
            <input onInput={ev => onUpload(ev?.currentTarget?.files)} type="file" id="import-input" hidden={true} />
          </div>
        </div>
      </section>
    </section>
  )
}