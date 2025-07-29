import { FC, useEffect } from 'react';
import S from './style.module.css';
import { IconAlertHexagon, IconCheck, IconFaceIdError, IconX } from '@tabler/icons-react';

interface AlertProps {
  variation: 'warning' | 'error' | 'success';
  title?: string;
  description?: string
  timeout?: number;
  handleDismiss?: () => void;
}

export const Alert: FC<AlertProps> = ({
  variation,
  description,
  handleDismiss = () => { },
  timeout = 3000,
  title
}) => {

  useEffect(() => {
    if (timeout > 0 && handleDismiss) {
      const timer = setTimeout(() => {
        handleDismiss();
      }, timeout);
      return () => clearTimeout(timer);
    }
  }, []);


  return (
    <div className={S.container} data-variation={variation}>
      <div className={S.icon}>
        {variation === 'error' && <IconFaceIdError />}
        {variation === 'success' && <IconCheck />}
        {variation === 'warning' && <IconAlertHexagon />}
      </div>
      <div className={S.content}>
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
      </div>
      <div className={S.action}>
        <button className={S.button} onClick={handleDismiss}>
          <IconX />
        </button>
      </div>
    </div>
  )
}

export const AlertWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={S.alert_wrapper}>
      {children}
    </div>
  )
}