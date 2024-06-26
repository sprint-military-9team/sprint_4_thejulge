'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from '@/components/common/Button';
import { CLOSE, BADGECLOSE } from '@/utils/constants';
import { SEOULGROUPLIST } from '@/constants/SEOUL';
import styles from './filter.module.scss';

interface FilterInfo {
  location: string[];
  startAt: string | null;
  pay: number | null;
}
interface FilterProps {
  onClick: (filter: FilterInfo | null) => void;
  removeFilter: () => void;
  initialFilter: FilterInfo | null;
}

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

function Filter({ onClick, removeFilter, initialFilter }: FilterProps) {
  const [selectedLocationList, setSelectedLocationList] = useState<string[]>(initialFilter?.location || []);
  const [startAt, setStartAt] = useState<string | null>(initialFilter?.startAt);
  const [pay, setPay] = useState<number | null>(initialFilter?.pay);
  const [filterData, setFilterData] = useState<FilterInfo | null>(initialFilter || null);
  const [isSetTimeValid, setIsSetTimeValid] = useState<boolean>(true);
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

  const handleInputStartChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputTime = new Date(event.target.value);
    const currentTime = new Date();
    if (inputTime < currentTime) {
      setIsSetTimeValid(false);
    } else {
      setIsSetTimeValid(true);
    }
    const inputDateTime = event.target.value;
    const dateObject = new Date(inputDateTime);
    const formattedDateTime = dateObject.toISOString();
    setStartAt(formattedDateTime);
  };

  const handlePayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPay(Number(event.target.value));
  };

  const handleResetData = () => {
    setSelectedLocationList([]);
    setStartAt(null);
    setPay(null);
    setFilterData(null);
  };

  function formatDateTimeForInput(dateTime) {
    if (!dateTime) {
      return '';
    }

    const dateObject = new Date(dateTime);
    return dateObject
      .toLocaleString('sv-SE', {
        timeZone: 'UTC',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
      .replace(' ', 'T');
  }

  useEffect(() => {
    setFilterData({ location: selectedLocationList, startAt, pay });
  }, [selectedLocationList, startAt, pay]);

  return (
    <div className={styles.filterWrapper}>
      <div className={styles.titleWrapper}>
        <div className={styles.title}>상세 필터</div>
        <Image onClick={removeFilter} className={styles.icon} width={24} height={24} src={CLOSE} alt="close" />
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
        <input
          type="datetime-local"
          className={`${styles.input} ${styles.inputStart}`}
          placeholder="입력"
          onChange={handleInputStartChange}
          value={formatDateTimeForInput(startAt)}
        />
        {!isSetTimeValid && <span className={styles.alert}>현재 시간 이후로 입력해주세요</span>}
      </div>
      <div className={`${styles.inputWrapper} ${styles.price}`}>
        <p>금액</p>
        <div className={styles.priceInputWrapper}>
          <div className={styles.inputPrice}>
            <input
              type="text"
              className={styles.input}
              placeholder="입력"
              onChange={handlePayChange}
              value={pay || ''}
            />
            <span className={styles.additionalPlaceholder}>원</span>
          </div>
          <span>이상부터</span>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div>
          <Button onClick={handleResetData} size="large" color="white" style={{ padding: '1.4rem' }}>
            초기화
          </Button>
        </div>
        <div>
          {isSetTimeValid ? (
            <Button onClick={() => onClick(filterData)} size="large" color="orange" style={{ padding: '1.4rem' }}>
              적용하기
            </Button>
          ) : (
            <Button size="large" color="disabled" style={{ padding: '1.4rem' }}>
              적용하기
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Filter;
