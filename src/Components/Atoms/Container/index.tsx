import React from 'react';
import S from './style.module.css';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={S.container}>
      {children}
    </div>
  )
}