import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import S from './style.module.css';
import { createPortal } from 'react-dom';
import { ShortcutRepository } from '../../../../infra/database/repository/shortcut-repository';
import { Database } from '../../../../infra/database/database';

interface ContextMenuProps extends React.InputHTMLAttributes<HTMLDivElement> {
  position: { x: number, y: number };
  isShow: boolean,
  url: string;
  onClose: () => void
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(({
  position, isShow, url, onClose, ...props
}, ref
) => {

  const innerRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => innerRef.current!);

  if (!isShow) return null;


  const finishProcessing = () => onClose?.();

  const openShortcut = async () => {
    window.open(url, '_blank', 'noopener,noreferrer');
    finishProcessing()
  }

  const deleteShortcut = async () => {
    const repo = new ShortcutRepository(Database);

    if (url.trim()) {
      await repo.delete(url);
    }
    finishProcessing()
  }

  const allowHidden = (ev: React.FocusEvent<HTMLDivElement, Element>) => {
    const target = ev.target
    const nextFocus = ev.relatedTarget;
    if (!nextFocus) {
      onClose && onClose()
      return;
    }

    if (nextFocus === target || nextFocus.contains(target) || target.contains(nextFocus)) {
      return;
    }

    onClose && onClose()
  }

  return createPortal(
    <div
      {...props}
      onBlur={allowHidden}
      tabIndex={0}
      ref={innerRef}
      className={S.context_menu}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px)`
      }}>
      <ul className={S.menu}>
        <li className={S.item}>
          <button onClick={openShortcut} className={S.btn}>Abrir em nova aba</button>
        </li>
        <li className={S.item}>
          <button onClick={deleteShortcut} className={S.btn}>Remover atalho</button>
        </li>
      </ul>
    </div>
    , document.body)
})