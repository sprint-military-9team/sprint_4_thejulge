'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { CLOCK, CLOCKGRAY, GPS, GPSGRAY, CARDARROW, CARDCOMPLETEARROW, CARDMOBILEARROW } from '@/utils/constants';
import styles from './card.module.scss';

interface CardProps {
  image: string;
  title: string;
  time: string;
  location: string;
  salary: string;
  raise?: string;
  isRaised?: boolean;
  completed?: string;
}

function CompletedMessage({ completed }: Pick<CardProps, 'completed'>) {
  return (
    <div className={styles.completeWrapper}>
      <span className={styles.complete}>{completed}</span>
    </div>
  );
}

function Card({ image, title, time, location, salary, raise, isRaised, completed }: CardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const style = completed ? { color: '#CBC9CF' } : {};
  const raiseClass = completed ? (isMobile ? styles.completedMobile : styles.completedDesk) : undefined;
  const arrowSrc = completed ? (isMobile ? CARDCOMPLETEARROW : CARDARROW) : isMobile ? CARDMOBILEARROW : CARDARROW;
  const clockSrc = completed ? CLOCKGRAY : CLOCK;
  const locationSrc = completed ? GPSGRAY : GPS;
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageWrapper}>
        <Image src={image} layout="fill" objectFit="cover" alt="store image" />
        {completed && <CompletedMessage completed={completed} />}
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.infoWrapper}>
          <span style={style} className={styles.title}>
            {title}
          </span>
          <div className={styles.info}>
            <Image width={24} height={24} className={styles.icon} src={clockSrc} alt="clockicon" />
            <span style={style} className={styles.time}>
              {time}
            </span>
          </div>
          <div className={styles.info}>
            <Image width={24} height={24} className={styles.icon} src={locationSrc} alt="locationicon" />
            <span style={style} className={styles.location}>
              {location}
            </span>
          </div>
        </div>
        <div className={styles.salaryWrapper}>
          <span style={style} className={styles.salary}>
            {salary}
          </span>
          {isRaised && (
            <div className={`${styles.raise} ${raiseClass}`}>
              <span style={style}>기존 시급보다 {raise}%</span>
              <Image width={24} height={24} className={styles.raiseicon} src={arrowSrc} alt="upmobilearrow" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Card;
