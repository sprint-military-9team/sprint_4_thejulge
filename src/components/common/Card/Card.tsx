'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { CLOCK, CLOCKGRAY, GPS, GPSGRAY, CARDARROW, CARDCOMPLETEARROW, CARDMOBILEARROW } from '@/utils/constants';
import getWorkTime from '@/utils/getWorkTime';
import styles from './card.module.scss';

interface CardProps {
  image: string;
  title: string;
  startTime: string;
  workHour: number;
  location: string;
  salary: string;
  raise?: number;
  isRaised?: boolean;
  completed?: string;
  shopId: string;
  noticeId: string;
}

function CompletedMessage({ completed }: Pick<CardProps, 'completed'>) {
  return (
    <div className={styles.completeWrapper}>
      <span className={styles.complete}>{completed}</span>
    </div>
  );
}

function Card({
  image,
  title,
  startTime,
  workHour,
  location,
  salary,
  raise,
  isRaised,
  completed,
  shopId,
  noticeId,
}: CardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const style = completed ? { color: '#CBC9CF' } : {};
  const raiseClass = completed ? (isMobile ? styles.completedMobile : styles.completedDesk) : undefined;
  const arrowSrc = completed ? (isMobile ? CARDCOMPLETEARROW : CARDARROW) : isMobile ? CARDMOBILEARROW : CARDARROW;
  const clockSrc = completed ? CLOCKGRAY : CLOCK;
  const locationSrc = completed ? GPSGRAY : GPS;
  const router = useRouter();
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
  const handleRouteNotice = () => {
    const cardData = {
      image,
      title,
      startTime,
      workHour,
      location,
      salary,
      raise,
      isRaised,
      completed,
      shopId,
      noticeId,
    };
    const currentData = JSON.parse(localStorage.getItem('cardDataList') || '[]');
    if (currentData.length >= 6) {
      currentData.shift();
    }
    currentData.push(cardData);
    localStorage.setItem('cardDataList', JSON.stringify(currentData));
    router.push(`/shop?shopId=${shopId}&noticeId=${noticeId}`);
  };
  return (
    <div className={styles.cardWrapper} onClick={handleRouteNotice}>
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
              {getWorkTime(startTime, workHour)}
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
            {salary}원
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
