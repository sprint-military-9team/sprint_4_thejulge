'use client';

import { useContext } from 'react';
import { DarkModeContext } from '@/context/DarkModeContext';
import styles from './TotalCount.module.scss';

type TotalCountProps = {
  count: number;
};

export default function Totalcount({ count }: TotalCountProps) {
  const { isDarkMode } = useContext(DarkModeContext);
  return (
    <div className={`${styles.textWrapper} ${isDarkMode && styles.whiteTitle}`}>
      <p>지원자 수</p>
      <div className={styles.textContent}>
        <span className={`${styles.textCount} ${isDarkMode && styles.countInvert}`}>{count}</span> 명
      </div>
    </div>
  );
}
