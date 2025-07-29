import { useEffect, useMemo, useRef, useState } from "react"
import { ContextMenu as ContextMenuComponent } from "../components/Molecules/Homepage/ContextMenu";

export const useContextMenu = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isView, setIsView] = useState(false);
  const [url, setUrl] = useState('')
  const contextRef = useRef<HTMLDivElement>(null);

  const showContextMenu = (ev: React.MouseEvent<HTMLDivElement, MouseEvent>, url: string) => {
    ev.preventDefault()

    if (url.length > 0) {
      setUrl(url)
    }

    setPosition({
      x: ev.clientX + 8,
      y: ev.clientY + 8,
    })

    setIsView(view => !view)
  }

  useEffect(() => {
    if (contextRef.current && isView === true) {
      contextRef.current.focus()
    }
  }, [contextRef.current, isView])

  const onBlur = () => {
    setTimeout(() => {
      setIsView(view => !view)
    }, 150);
  }

  const ContextMenu = useMemo(
    () => <ContextMenuComponent
      onClose={onBlur}
      ref={contextRef}
      isShow={isView}
      position={position}
      url={url}
    />,
    [position, url, isView]
  )

  return {
    showContextMenu,
    ContextMenu
  }
}