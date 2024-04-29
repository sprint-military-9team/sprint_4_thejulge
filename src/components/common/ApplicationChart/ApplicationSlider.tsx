'use client';

import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import styles from './ApplicationSlider.module.scss';

type ApplicationSliderProps = {
  children: React.ReactNode;
};

export default function ApplicationSlider({ children }: ApplicationSliderProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const checkMobile = () => {
      setIsMobile(mediaQuery.matches);
    };
    checkMobile();
    mediaQuery.addEventListener('change', checkMobile);
    return () => mediaQuery.removeEventListener('change', checkMobile);
  });
  return (
    <div className={styles.wrapper}>
      {isMobile ? (
        <div className={styles.sliderWrapper}>
          <Slider infinite={false} dots speed={500} arrows={false}>
            {children}
          </Slider>
        </div>
      ) : (
        <div className={styles.contentWrapper}>{children}</div>
      )}
    </div>
  );
}
