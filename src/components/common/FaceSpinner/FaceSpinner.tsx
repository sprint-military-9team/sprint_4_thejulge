'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './FaceSpinner.module.scss';

const SPINNERLIST = [
  `/spinner/spinner-1.JPG`,
  '/spinner/spinner-2.JPG',
  '/spinner/spinner-3.JPG',
  '/spinner/spinner-4.PNG',
  '/spinner/spinner-5.PNG',
  '/spinner/spinner-6.jpeg',
];

export default function FaceSpinner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex: number) => (prevIndex + 1) % SPINNERLIST.length);
    }, 3200);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.loading}>
      <div className={styles['lds-circle']}>
        <Image src={SPINNERLIST[currentImageIndex]} alt="spinner" width={150} height={150} />
      </div>
      <p className={styles.title}>Loading중입니다@_@~</p>
      <p className={styles.title}>기다려 주실꺼죵??</p>
    </div>
  );
}
