'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { CLOSE, BADGECLOSE } from '@/utils/constants';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import styles from './filter.module.scss';

interface BadgeProps {
  children: React.ReactNode;
  onClick: (location: string) => void;
  removeLocation: string;
}

function LocationFilter({ onClick }: { onClick: (location: string) => void }) {
  return (
    <div className={styles.filter}>
      <div className={styles.groupListWrapper}>
        {SEOULGROUPLIST.map((item) => (
          <div className={styles.groupList} key={item} onClick={() => onClick(item)}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

function Badge({ children, onClick, removeLocation }: BadgeProps) {
  return (
    <div className={styles.badge}>
      {children}
      <Image src={BADGECLOSE} width={24} height={24} onClick={() => onClick(removeLocation)} alt="close" />
    </div>
  );
}

function Filter() {
  const [selectedLocationList, setSelectedLocationList] = useState<string[]>([]);
  const handleAddLocation = (location: string) => {
    setSelectedLocationList((prev) => {
      if (!prev.includes(location)) {
        return [...prev, location];
      } else {
        return prev;
      }
    });
  };

  const handleRemoveLocation = (location: string) => {
    setSelectedLocationList(selectedLocationList.filter((selectedLocation) => selectedLocation !== location));
  };
  return (
    <div className={styles.filterWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>상세 필터</div>
        <Image className={styles.icon} width={24} height={24} src={CLOSE} alt="close" />
      </div>
      <div className={styles.filterContent}>
        <p className={styles.filterTitle}>위치</p>
        <LocationFilter onClick={handleAddLocation} />
        <div className={styles.badgeWrapper}>
          {selectedLocationList.map((location) => (
            <Badge onClick={handleRemoveLocation} key={location} removeLocation={location}>
              {location}
            </Badge>
          ))}
        </div>
      </div>
      <div className={styles.inputWrapper}>
        <p>시작일</p>
        <input type="text" className={`${styles.input} ${styles.inputStart}`} placeholder="입력" />
      </div>
      <div className={`${styles.inputWrapper} ${styles.price}`}>
        <p>금액</p>
        <div className={styles.priceInputWrapper}>
          <div className={styles.inputPrice}>
            <input type="text" className={styles.input} placeholder="입력" />
            <span className={styles.additionalPlaceholder}>원</span>
          </div>
          <span>이상부터</span>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button size="large" color="white" style={{ padding: '1.4rem' }}>
          초기화
        </Button>
        <Button size="large" color="orange" style={{ padding: '1.4rem' }}>
          적용하기
        </Button>
      </div>
    </div>
  );
}

export default Filter;
