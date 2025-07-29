import { IconChevronLeft, IconChevronRight, IconDots, IconPlus } from '@tabler/icons-react';
import S from './style.module.css';
import { PainelPosition } from '../../../../types/settings';
import { useEffect, useRef, useState } from 'react';
import { Shortcut, ShortcutRepository } from '../../../../infra/database/repository/shortcut-repository';
import { Database } from '../../../../infra/database/database';
import { useFetch } from '../../../../hooks/useFetch';
import { useContextMenu } from '../../../../hooks/useContextMenu';
import { ShortcutMessage, createChannel } from '../../../../infra/services/shortcut-event';
import { useModal } from '../../../../hooks/useModal';
import { title } from 'process';

interface PainelProps {
  position: PainelPosition
}

export const Painel = ({ position }: PainelProps) => {
  const [pages, setPages] = useState<Required<Shortcut>[][]>([[]])
  const [currentPage, setCurrentPage] = useState(0);
  const pagesRef = useRef(null);
  const { ContextMenu, showContextMenu } = useContextMenu()
  const modal = useModal();

  const getShortcuts = async () => {
    const repo = new ShortcutRepository(Database);
    const shortcuts = repo.getAllByRecent();
    return shortcuts;
  }

  const { isLoading, data, runQuery } = useFetch({
    queryFn: getShortcuts
  })

  useEffect(() => {
    if (!isLoading && data) {
      const _pages = {} as Record<string, any>
      let interaction = 0;
      let i = 0;

      for (const site of data) {
        let page = _pages[`page${interaction}`];
        if (!page) {
          _pages[`page${interaction}`] = [];
          page = _pages[`page${interaction}`]
        }

        if (interaction === 0 && page.length === 10) {
          interaction++
        }

        if (interaction !== 0 && page.length === 11) {
          interaction++
        }

        page.push(site)

        i++
      }

      const pagesToArray = Object.values(_pages)
      if (!pagesToArray[0]) {
        pagesToArray[0] = []
      }

      pagesToArray[0].unshift({ icon: '', title: 'Adicionar favorito', url: '#create' })
      setPages(pagesToArray)
    }

  }, [isLoading, data])

  useEffect(() => {
    const channel = createChannel()

    channel.onmessage = (ev: MessageEvent) => {
      const msg = ev.data as ShortcutMessage;
      if (msg.type === 'database:shortcut:change') {
        runQuery();
      }
    }

    return () => {
      channel.close();
    };
  }, [])

  const openSetting = () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    }
  }

  const next = () => {
    if (pagesRef.current) {
      if ((currentPage + 1) == pages.length) return;
      setCurrentPage(prev => prev + 1)
    }
  }

  const prev = () => {
    if (pagesRef.current) {
      if (currentPage - 1 < 0) return;
      setCurrentPage(prev => prev - 1)
    }
  }

  const isNextPage = (currentPage + 1) == pages.length;
  const isPrevPage = (currentPage - 1 < 0);

  const openUrl = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
 
    if (newWindow) {
      newWindow.opener = null;
    }
  }

  return (
    <div className={S.painel} data-position={position}>
      <div className={S.header}>
        <button className={S.btn_setting} onClick={openSetting}>
          <IconDots />
        </button>
        <div className={S.btn_actions}>
          <button data-disabled={isPrevPage} onClick={prev} className={S.btn}><IconChevronLeft /></button>
          <button data-disabled={isNextPage} onClick={next} className={S.btn}><IconChevronRight /></button>
        </div>
      </div>

      <div className={S.wrapper}>
        <div className={S.pages} ref={pagesRef} style={{ left: `-${currentPage}00%` }}>
          {pages.map((page, index) => (
            <div key={index} className={S.page}>

              {page.map((site, _index) => (
                <>
                  {site.url === '#create' ? (
                    <div className={S.card} onClick={modal.toggleVisibility}>
                      <div className={S.icon}>
                        <IconPlus />
                      </div>
                      <a href="#create" onClick={modal.toggleVisibility}>
                        <h3>{site.title}</h3>
                      </a>
                    </div>
                  ) :
                    (<div onClick={() => openUrl(site.url)} key={site.url} className={S.card} onContextMenu={ev => showContextMenu(ev, site.url)}>
                      <div className={S.icon}>
                        {!site.icon && <span className={S.char_icon}>{site.title[0]}</span>}
                        {site.icon && site.icon.length > 1 ? <img src={site.icon} alt={site.title} /> : <span className={S.char_icon}>{site.icon}</span>}
                      </div>
                      <a target='_blank' rel="noopener noreferrer" href={site.url} title={site.title}>
                        <h3>{site.title}</h3>
                      </a>
                    </div>)}
                </>
              ))}
            </div>
          ))}

        </div>
      </div>
      {ContextMenu}
    </div>
  )
}