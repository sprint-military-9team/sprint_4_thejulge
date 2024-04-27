'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
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
  const type = Cookies.get('type');
  const shopIdData = Cookies.get('shopId');
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
    const saveData = currentData.filter((item: CardProps) => item.noticeId !== noticeId);
    if (saveData.length === 6) {
      saveData.pop();
      saveData.unshift(cardData);
    } else {
      saveData.unshift(cardData);
    }

    localStorage.setItem('cardDataList', JSON.stringify(saveData));
    if (type === 'employer' && shopIdData === shopId) {
      router.push(`/ownerNoticeDetail?noticeId=${noticeId}`);
    } else {
      router.push(`/shop?shopId=${shopId}&noticeId=${noticeId}`);
    }
  };
  return (
    <div className={styles.cardWrapper} onClick={handleRouteNotice}>
      <div className={styles.imageWrapper}>
        <Image src={image} fill alt="store image" />
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
