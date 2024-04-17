'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import clockicon from '@/assets/clockicon.svg';
import clockgrayicon from '@/assets/clockgrayicon.svg';
import locationicon from '@/assets/locationicon.svg';
import locationgrayicon from '@/assets/locationgrayicon.svg';
import uparrow from '@/assets/uparrow.svg';
import upmobilearrow from '@/assets/upmobilearrow.svg';
import upcompletearrow from '@/assets/upcompletearrow.svg';
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
  const arrowSrc = completed ? (isMobile ? upcompletearrow : uparrow) : isMobile ? upmobilearrow : uparrow;

  // let raiseClass;
  // let arrowSrc;
  // if (completed) {
  //   if (isMobile) {
  //     raiseClass = styles.completedMobile;
  //     arrowSrc = upcompletearrow;
  //   } else {
  //     raiseClass = styles.completedDesk;
  //     arrowSrc = uparrow;
  //   }
  // } else if (!completed) {
  //   if (isMobile) {
  //     arrowSrc = upmobilearrow;
  //   } else {
  //     arrowSrc = uparrow;
  //   }
  // }
  const clockSrc = completed ? clockgrayicon : clockicon;
  const locationSrc = completed ? locationgrayicon : locationicon;
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
            <Image className={styles.icon} src={clockSrc} alt="clockicon" />
            <span style={style} className={styles.time}>
              {time}
            </span>
          </div>
          <div className={styles.info}>
            <Image className={styles.icon} src={locationSrc} alt="locationicon" />
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
              <Image className={styles.raiseicon} src={arrowSrc} alt="upmobilearrow" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Card;