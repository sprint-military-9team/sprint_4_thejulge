'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import raisePercent from '@/utils/getRaisePercent';
import getWorkTime from '@/utils/getWorkTime';
import getShopDetailData from '@/apis/shopdetail';
import { CLOCK, GPS, CARDARROW } from '@/utils/constants';
import Button from '@/components/common/Button/';
import RejectionModal from '@/components/common/Modal/RejectionModal/RejectionModal';
import styles from './shopdetail.module.scss';
import { MainData } from './type';

interface CompletedMessageProps {
  completed: string;
}

function CompletedMessage({ completed }: CompletedMessageProps) {
  return (
    <div className={styles.completeWrapper}>
      <span className={styles.complete}>{completed}</span>
    </div>
  );
}

function ShopDetail() {
  const [noticeData, setNoticeData] = useState<MainData | null>(null);
  const [isApplied, setIsApplied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const params = useSearchParams();
  const shopId = params.get('shopId');
  const noticeId = params.get('noticeId');
  const raise = noticeData ? raisePercent(noticeData.item.shop.item.originalHourlyPay, noticeData.item.hourlyPay) : 0;
  const workTime = noticeData ? getWorkTime(noticeData.item.startsAt, noticeData.item.workhour) : '00:00';
  const today = new Date();
  const completed = noticeData
    ? noticeData.item.closed
      ? '마감 완료'
      : today > new Date(noticeData.item.startsAt)
        ? '지난 공고'
        : ''
    : '';

  const shopImage = noticeData ? noticeData?.item.shop.item.imageUrl : '';
  const handleClickButton = () => {
    setIsApplied((prev) => !prev);
  };
  const handleOpenModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(true);
  };

  const handleButtonCancelClick = () => {
    setIsModalOpen(false);
    setIsApplied(false); // api 신청상태 변경 cookie 에서 가져오기
  };
  const handleButtonNoClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsModalOpen(false);
    setIsApplied(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getShopDetailData(shopId, noticeId);
        setNoticeData(data);
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.shopDetail}>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>식당</span>
        <p className={styles.shopTitle}>{noticeData?.item.shop.item.name}</p>
      </div>
      <div className={styles.notice}>
        <div className={styles.shopImageWrapper}>
          <Image fill src={shopImage} alt="shopImage" />
          {completed && <CompletedMessage completed={completed} />}
        </div>
        <div className={styles.noticeContent}>
          <div className={styles.noticeInfo}>
            <div className={styles.noticeInfoTitle}>
              <span className={styles.title}>시급</span>
              <div className={styles.noticeInfoSalary}>
                <span className={styles.shopTitle}>{noticeData?.item.hourlyPay}원</span>
                <div className={styles.raise}>
                  <span>기존 시급보다 {raise}%</span>
                  <Image src={CARDARROW} alt="arrow" width={20} height={20} />
                </div>
              </div>
            </div>
            <div className={styles.noticeInfoTimeLoc}>
              <Image src={CLOCK} alt="clock" width={20} height={20} />
              <span>{workTime}</span>
            </div>
            <div className={styles.noticeInfoTimeLoc}>
              <Image src={GPS} alt="gps" width={20} height={20} />
              <span>{noticeData?.item.shop.item.address1}</span>
            </div>
            <span className={styles.noticeInfoDescription}>{noticeData?.item.shop.item.description}</span>
            {completed ? (
              <Button color="disabled" size="large">
                신청 불가
              </Button>
            ) : (
              <div onClick={handleClickButton}>
                {isApplied ? (
                  <div onClick={handleOpenModal}>
                    <Button color="white" size="large">
                      취소 하기
                    </Button>
                    {isModalOpen && (
                      <RejectionModal
                        isModal={isModalOpen}
                        cancelClick={handleButtonCancelClick}
                        noClick={handleButtonNoClick}
                      />
                    )}
                  </div>
                ) : (
                  <Button color="orange" size="large">
                    신청 하기
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.shopDescription}>
        <p className={styles.titleDescription}>공고 설명</p>
        <p className={styles.description}>{noticeData?.item.description}</p>
      </div>
    </div>
  );
}

export default ShopDetail;
