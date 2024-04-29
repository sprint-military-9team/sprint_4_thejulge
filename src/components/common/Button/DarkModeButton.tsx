'use client';

import { DarkModeContext } from '@/context/DarkModeContext';
import { DARK_ICON, LIGHT_ICON } from '@/utils/constants';
import Image from 'next/image';
import { useContext } from 'react';
import styles from './DarkModeButton.module.scss';

export default function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  return (
    <div className={styles.toggleBox}>
      <Image
        src={isDarkMode ? DARK_ICON : LIGHT_ICON}
        style={
          isDarkMode && {
            filter: 'invert(100%) sepia(0%) saturate(7484%) hue-rotate(242deg) brightness(300%) contrast(100%)',
          }
        }
        alt="toggle-darkmode"
        onClick={toggleDarkMode}
        width={30}
        height={30}
      />
    </div>
  );
}
